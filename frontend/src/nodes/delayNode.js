import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { TextField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const DelayNode = createNodeComponent({
  title: "Delay",
  subtitle: "utility",
  icon: "⏱",
  accent: "yellow",
  baseStyle: { width: 260 },
  getHandles: ({ id }) => [
    { id: `${id}-in`, type: "target", position: Position.Left, label: "in", labelStyle: { top: "50%" } },
    { id: `${id}-out`, type: "source", position: Position.Right, label: "out", labelStyle: { top: "50%" } },
  ],
  Body: function Body({ id, data }) {
    const [ms, setMs] = useNodeField(id, data, "ms", "250");
    return (
      <div className="vs-nodeGrid">
        <TextField
          label="Milliseconds"
          value={ms}
          onChange={setMs}
          placeholder="250"
        />
        <div className="vs-nodeHint">Used to demonstrate configurable fields.</div>
      </div>
    );
  },
});

