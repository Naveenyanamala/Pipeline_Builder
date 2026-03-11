import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { SelectField, TextField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const HttpRequestNode = createNodeComponent({
  title: "HTTP Request",
  subtitle: "connector",
  icon: "⇄",
  accent: "teal",
  baseStyle: { width: 320 },
  getHandles: ({ id }) => [
    { id: `${id}-url`, type: "target", position: Position.Left, style: { top: "34%" }, label: "url", labelStyle: { top: "34%" } },
    { id: `${id}-body`, type: "target", position: Position.Left, style: { top: "66%" }, label: "body", labelStyle: { top: "66%" } },
    { id: `${id}-response`, type: "source", position: Position.Right, label: "response", labelStyle: { top: "50%" } },
  ],
  Body: function Body({ id, data }) {
    const [method, setMethod] = useNodeField(id, data, "method", "GET");
    const [path, setPath] = useNodeField(id, data, "path", "/v1/example");
    return (
      <div className="vs-nodeGrid">
        <SelectField
          label="Method"
          value={method}
          onChange={setMethod}
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ]}
        />
        <TextField
          label="Path"
          value={path}
          onChange={setPath}
          placeholder="/v1/..."
        />
        <div className="vs-nodeHint">Demonstrates multi-input handles + fields.</div>
      </div>
    );
  },
});

