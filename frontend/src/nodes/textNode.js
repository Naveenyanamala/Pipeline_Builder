import React, { useEffect, useMemo, useRef } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { createNodeComponent } from "./nodeKit/createNode";
import { TextAreaField } from "./nodeKit/fields";
import { useNodeField } from "./nodeKit/useNodeField";
import { extractTemplateVariables } from "./nodeKit/textTemplate";
import {
  estimateTextWidthPx,
  useAutosizeTextArea,
} from "./nodeKit/useAutosizeTextArea";
import { useStore } from "../store";

function insertAtCursor(textareaEl, insertion) {
  if (!textareaEl) return { nextText: insertion, nextCursor: insertion.length };
  const start = textareaEl.selectionStart ?? textareaEl.value.length;
  const end = textareaEl.selectionEnd ?? textareaEl.value.length;
  const before = textareaEl.value.slice(0, start);
  const after = textareaEl.value.slice(end);
  const nextText = `${before}${insertion}${after}`;
  const nextCursor = start + insertion.length;
  return { nextText, nextCursor };
}

export const TextNode = createNodeComponent({
  title: "Text",
  subtitle: "Templated text",
  icon: "T",
  accent: "orange",
  getHandles: ({ id, data }) => {
    const text = data?.text || "";
    const vars = extractTemplateVariables(text);

    const left = vars.map((v, idx) => ({
      id: `${id}-var-${v}`,
      type: "target",
      position: Position.Left,
      style: { top: `${22 + idx * 18}%` },
      label: v,
      labelStyle: { top: `${22 + idx * 18}%` },
    }));

    return [
      ...left,
      {
        id: `${id}-output`,
        type: "source",
        position: Position.Right,
        // keep this as a clean output dot without text label so it doesn't overlap the textarea
        style: { top: "55%" },
      },
    ];
  },
  Body: function Body({ id, data }) {
    const [text, setText] = useNodeField(id, data, "text", "{{input}}");
    const taRef = useRef(null);
    useAutosizeTextArea(taRef, text);
    const updateNodeInternals = useUpdateNodeInternals();

    const width = useMemo(() => estimateTextWidthPx(text), [text]);
    const allNodes = useStore((s) => s.nodes);

    const availableVars = useMemo(() => {
      const vars = new Set();
      for (const n of allNodes) {
        if (n.type === "customInput") {
          const v = n.data?.inputName;
          if (typeof v === "string" && v.trim()) vars.add(v.trim());
        }
      }
      return Array.from(vars);
    }, [allNodes]);

    const usedVars = useMemo(() => new Set(extractTemplateVariables(text)), [text]);

    // React Flow needs an explicit refresh when handles are added/removed dynamically.
    useEffect(() => {
      updateNodeInternals(id);
    }, [id, updateNodeInternals, text]);

    const onAddVar = (v) => {
      const insertion = (text?.length ? " " : "") + `{{${v}}}`;
      const el = taRef.current;
      const { nextText, nextCursor } = insertAtCursor(el, insertion);
      setText(nextText);
      requestAnimationFrame(() => {
        if (!el) return;
        el.focus();
        el.setSelectionRange(nextCursor, nextCursor);
      });
    };

    return (
      <div className="vs-nodeGrid">
        <div className="vs-nodeHint">
          Use <code>{"{{ variable }}"}</code> to create inputs.
        </div>
        <TextAreaField
          label="Text"
          value={text}
          onChange={setText}
          placeholder="{{input}}"
          inputRef={taRef}
        />
        {availableVars.length ? (
          <div className="vs-varSuggest">
            <div className="vs-varSuggestLabel">Suggestions</div>
            <div className="vs-varSuggestChips">
              {availableVars.map((v) => {
                const isUsed = usedVars.has(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={`vs-chip ${isUsed ? "vs-chipDisabled" : ""}`}
                    onClick={() => (isUsed ? null : onAddVar(v))}
                    title={isUsed ? "Already used in this Text node" : `Insert {{${v}}}`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="vs-nodeFooterNote" style={{ width }}>
          Inputs detected:{" "}
          <strong>{extractTemplateVariables(text).length || "none"}</strong>
        </div>
      </div>
    );
  },
  baseStyle: ({ data }) => {
    const w = estimateTextWidthPx(data?.text || "{{input}}");
    return { width: w, minWidth: w };
  },
});
