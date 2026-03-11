import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { TextField, SelectField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const OutputNode = createNodeComponent({
  title: "Output",
  subtitle: ({ data }) => data?.outputName || "Unnamed output",
  icon: "↗",
  accent: "purple",
  getHandles: ({ id }) => [
    { id: `${id}-value`, type: "target", position: Position.Left },
  ],
  Body: function Body({ id, data }) {
    const [name, setName] = useNodeField(
      id,
      data,
      "outputName",
      id.replace("customOutput-", "output_")
    );
    const [outputType, setOutputType] = useNodeField(
      id,
      data,
      "outputType",
      "Text"
    );

    return (
      <div className="vs-nodeGrid">
        <TextField label="Name" value={name} onChange={setName} />
        <SelectField
          label="Type"
          value={outputType}
          onChange={setOutputType}
          options={[
            { value: "Text", label: "Text" },
            { value: "Image", label: "Image" },
          ]}
        />
      </div>
    );
  },
});
