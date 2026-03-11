import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { SelectField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";

export const ConditionNode = createNodeComponent({
  title: "Condition",
  subtitle: "branch",
  icon: "◇",
  accent: "pink",
  baseStyle: { width: 280 },
  getHandles: ({ id }) => [
    { id: `${id}-in`, type: "target", position: Position.Left, label: "in", labelStyle: { top: "50%" } },
    { id: `${id}-true`, type: "source", position: Position.Right, style: { top: "38%" }, label: "true", labelStyle: { top: "38%" } },
    { id: `${id}-false`, type: "source", position: Position.Right, style: { top: "68%" }, label: "false", labelStyle: { top: "68%" } },
  ],
  Body: function Body({ id, data }) {
    const [mode, setMode] = useNodeField(id, data, "mode", "isTruthy");
    return (
      <div className="vs-nodeGrid">
        <SelectField
          label="Check"
          value={mode}
          onChange={setMode}
          options={[
            { value: "isTruthy", label: "Truthy / falsy" },
            { value: "isEmpty", label: "Empty / non-empty" },
            { value: "exists", label: "Exists / missing" },
          ]}
        />
        <div className="vs-nodeHint">
          Routes input to <strong>true</strong> or <strong>false</strong>.
        </div>
      </div>
    );
  },
});

