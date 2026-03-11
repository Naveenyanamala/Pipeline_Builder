"""
FastAPI backend for pipeline parse (nodes/edges count + DAG check) and MongoDB save.
Run: uvicorn main:app --reload --port 8080
"""

from __future__ import annotations

import os
import uuid
from collections import defaultdict, deque
from datetime import datetime, timezone
from typing import Any, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.database import Database


# ---------- Request / response models ----------


class Position(BaseModel):
    x: float = 0
    y: float = 0


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    label: Optional[str] = None
    position: Optional[Position] = None
    data: dict = {}


class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    name: Optional[str] = None
    pipelineId: Optional[str] = None
    version: Optional[int] = None


class PipelineParseResult(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


# ---------- MongoDB ----------

_client: Optional[MongoClient] = None


def get_db() -> Database:
    global _client
    if _client is None:
        uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        db_name = os.getenv("MONGO_DB", "vectorshift")
        _client = MongoClient(uri)
        return _client[db_name]
    return _client[os.getenv("MONGO_DB", "vectorshift")]


# ---------- DAG helpers (Kahn's algorithm + adjacency) ----------


def _build_adjacency(node_ids: List[str], edges: List[Edge]) -> List[dict]:
    all_nodes = set(node_ids)
    for e in edges:
        all_nodes.add(e.source)
        all_nodes.add(e.target)
    adj = defaultdict(list)
    for e in edges:
        adj[e.source].append(e.target)
    return [{"from": n, "to": adj.get(n, [])} for n in sorted(all_nodes)]


def _analyze_dag(node_ids: List[str], edges: List[Edge]) -> tuple[bool, List[str]]:
    all_nodes = set(node_ids)
    for e in edges:
        all_nodes.add(e.source)
        all_nodes.add(e.target)

    indegree = {n: 0 for n in all_nodes}
    adj = defaultdict(list)
    for e in edges:
        adj[e.source].append(e.target)
        indegree[e.target] += 1

    queue = deque([n for n, d in indegree.items() if d == 0])
    order: List[str] = []

    while queue:
        n = queue.popleft()
        order.append(n)
        for nxt in adj.get(n, []):
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    is_dag = len(order) == len(all_nodes)
    return is_dag, order


# ---------- App ----------

app = FastAPI(title="Pipeline API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/pipelines/parse", response_model=PipelineParseResult)
def parse_pipeline(payload: PipelinePayload) -> PipelineParseResult:
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    node_ids = [n.id for n in payload.nodes]

    is_dag, topological_order = _analyze_dag(node_ids, payload.edges)
    adjacency = _build_adjacency(node_ids, payload.edges)

    now = datetime.now(timezone.utc)
    pipeline_doc: dict[str, Any] = {
        "pipelineId": payload.pipelineId or str(uuid.uuid4()),
        "name": payload.name or "Untitled pipeline",
        "version": payload.version if payload.version is not None else 1,
        "nodes": [n.model_dump() for n in payload.nodes],
        "edges": [e.model_dump() for e in payload.edges],
        "adjacency": adjacency,
        "topologicalOrder": topological_order,
        "isDag": is_dag,
        "numNodes": num_nodes,
        "numEdges": num_edges,
        "createdAt": now,
        "updatedAt": now,
    }

    try:
        db = get_db()
        db.pipelines.insert_one(pipeline_doc)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {e!s}") from e

    return PipelineParseResult(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )
