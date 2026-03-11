import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { TextField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const JsonParseNode = createNodeComponent({
  title: "JSON Parse",
  subtitle: "transform",
  icon: "{ }",
  accent: "indigo",
  baseStyle: { width: 300 },
  getHandles: ({ id }) => [
    { id: `${id}-json`, type: "target", position: Position.Left, label: "json", labelStyle: { top: "50%" } },
    { id: `${id}-value`, type: "source", position: Position.Right, style: { top: "40%" }, label: "value", labelStyle: { top: "40%" } },
    { id: `${id}-error`, type: "source", position: Position.Right, style: { top: "70%" }, label: "error", labelStyle: { top: "70%" } },
  ],
  Body: function Body({ id, data }) {
    const [pointer, setPointer] = useNodeField(id, data, "pointer", "$");
    return (
      <div className="vs-nodeGrid">
        <TextField
          label="JSON pointer"
          value={pointer}
          onChange={setPointer}
          placeholder="$"
        />
        <div className="vs-nodeHint">Example of a node with multiple outputs.</div>
      </div>
    );
  },
});

