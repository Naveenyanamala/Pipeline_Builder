import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";

export const MergeNode = createNodeComponent({
  title: "Merge",
  subtitle: "fan-in",
  icon: "⇉",
  accent: "slate",
  baseStyle: { width: 260 },
  getHandles: ({ id }) => [
    {
      id: `${id}-a`,
      type: "target",
      position: Position.Left,
      style: { top: "36%" },
      label: "a",
      labelStyle: { top: "36%" },
    },
    {
      id: `${id}-b`,
      type: "target",
      position: Position.Left,
      style: { top: "64%" },
      label: "b",
      labelStyle: { top: "64%" },
    },
    {
      id: `${id}-out`,
      type: "source",
      position: Position.Right,
      label: "out",
      labelStyle: { top: "50%" },
    },
  ],
  Body: function Body() {
    return (
      <div className="vs-nodeText">
        Combine two upstream values into a single output.
      </div>
    );
  },
});

