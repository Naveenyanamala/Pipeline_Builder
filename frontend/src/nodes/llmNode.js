import React from "react";
import { Position } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";

export const LLMNode = createNodeComponent({
  title: "LLM",
  subtitle: "Chat model",
  icon: "✦",
  accent: "blue",
  baseStyle: { width: 300 },
  getHandles: ({ id }) => [
    {
      id: `${id}-system`,
      type: "target",
      position: Position.Left,
      style: { top: "34%" },
      label: "system",
      labelStyle: { top: "34%" },
    },
    {
      id: `${id}-prompt`,
      type: "target",
      position: Position.Left,
      style: { top: "66%" },
      label: "prompt",
      labelStyle: { top: "66%" },
    },
    {
      id: `${id}-response`,
      type: "source",
      position: Position.Right,
      label: "response",
      labelStyle: { top: "50%" },
    },
  ],
  Body: function Body() {
    return (
      <div className="vs-nodeText">
        Connect a system message + prompt, then output the model response.
      </div>
    );
  },
});
