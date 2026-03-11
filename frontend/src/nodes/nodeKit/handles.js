import React from "react";
import { Handle } from "reactflow";

function handleClass(side) {
  return side === "left" ? "vs-handle vs-handleLeft" : "vs-handle vs-handleRight";
}

export function Handles({ handles = [] }) {
  return (
    <>
      {handles.map((h) => (
        <Handle
          key={h.id}
          id={h.id}
          type={h.type}
          position={h.position}
          className={handleClass(h.side)}
          style={h.style}
          isConnectable={true}
        />
      ))}
    </>
  );
}

export function HandleLabels({ handles = [] }) {
  return (
    <>
      {handles
        .filter((h) => h.label)
        .map((h) => (
          <div
            key={`${h.id}-label`}
            className={h.side === "left" ? "vs-handleLabel vs-handleLabelLeft" : "vs-handleLabel vs-handleLabelRight"}
            style={h.labelStyle}
          >
            {h.label}
          </div>
        ))}
    </>
  );
}

