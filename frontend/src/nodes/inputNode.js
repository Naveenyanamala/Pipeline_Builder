import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { TextField, SelectField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const InputNode = createNodeComponent({
  title: "Input",
  subtitle: ({ data }) => data?.inputName || "Unnamed input",
  icon: "↘",
  accent: "green",
  getHandles: ({ id }) => [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
    },
  ],
  Body: function Body({ id, data }) {
    const [name, setName] = useNodeField(
      id,
      data,
      "inputName",
      id.replace("customInput-", "input_")
    );
    const [inputType, setInputType] = useNodeField(
      id,
      data,
      "inputType",
      "Text"
    );

    return (
      <div className="vs-nodeGrid">
        <TextField label="Name" value={name} onChange={setName} />
        <SelectField
          label="Type"
          value={inputType}
          onChange={setInputType}
          options={[
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ]}
        />
      </div>
    );
  },
});
