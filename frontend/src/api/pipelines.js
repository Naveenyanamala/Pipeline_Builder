const DEFAULT_BACKEND_URL = "http://localhost:8080";

export async function parsePipeline({ nodes, edges, name, pipelineId, version }, { baseUrl } = {}) {
  const url = `${baseUrl || DEFAULT_BACKEND_URL}/pipelines/parse`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodes, edges, name, pipelineId, version }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}


