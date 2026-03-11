import React from "react";
import { Position } from "reactflow";
import { NodeShell } from "./NodeShell";

const DEFAULT_NODE_STYLE = { width: 280 };

function normalizeHandleSide(position) {
  return position === Position.Left ? "left" : "right";
}

export function createNodeComponent(config) {
  const {
    title,
    subtitle,
    icon,
    accent,
    baseStyle,
    getHandles,
    Body,
  } = config;

  return function NodeComponent(props) {
    const { id, data } = props;

    const staticHandles = (getHandles ? getHandles({ id, data }) : []) || [];
    const handles = staticHandles.map((h) => ({
      ...h,
      side: h.side ?? normalizeHandleSide(h.position),
    }));

    return (
      <NodeShell
        nodeId={id}
        selected={props.selected}
        title={typeof title === "function" ? title({ id, data }) : title}
        subtitle={
          typeof subtitle === "function" ? subtitle({ id, data }) : subtitle
        }
        icon={typeof icon === "function" ? icon({ id, data }) : icon}
        accent={accent}
        handles={handles}
        style={{
          ...DEFAULT_NODE_STYLE,
          ...(typeof baseStyle === "function" ? baseStyle({ id, data }) : baseStyle),
        }}
      >
        {Body ? <Body {...props} /> : null}
      </NodeShell>
    );
  };
}

