import React from "react";
import { Handles, HandleLabels } from "./handles";
import { useStore } from "../../store";

export function NodeShell({
  nodeId,
  title,
  subtitle,
  icon,
  accent = "blue",
  handles = [],
  selected = false,
  children,
  style,
  className = "",
}) {
  const removeNode = useStore((s) => s.removeNode);

  return (
    <div
      className={`vs-node vs-nodeAccent-${accent} ${selected ? "vs-nodeSelected" : ""} ${className}`}
      style={style}
    >
      <div className="vs-nodeHeader">
        <div className="vs-nodeHeaderLeft">
          {icon ? <span className="vs-nodeIcon">{icon}</span> : null}
          <div className="vs-nodeTitleWrap">
            <div className="vs-nodeTitle">{title}</div>
            {subtitle ? <div className="vs-nodeSubtitle">{subtitle}</div> : null}
          </div>
        </div>

        <div className="vs-nodeHeaderActions" onMouseDown={(e) => e.stopPropagation()}>
          <button
            className="vs-nodeIconButton vs-nodeIconButtonDanger"
            type="button"
            title="Delete node"
            onClick={() => removeNode(nodeId)}
          >
            ×
          </button>
        </div>
      </div>

      <div className="vs-nodeBody nodrag" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>

      {/* Handle layer on top so connections can reliably drop on handles */}
      <div className="vs-nodeHandleLayer" aria-hidden="true">
        <Handles handles={handles} />
        <HandleLabels handles={handles} />
      </div>
    </div>
  );
}

