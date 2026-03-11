import { useLayoutEffect } from "react";

export function useAutosizeTextArea(textareaRef, value) {
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Height: classic autosize
    el.style.height = "0px";
    const nextHeight = Math.min(260, Math.max(60, el.scrollHeight));
    el.style.height = `${nextHeight}px`;
  }, [textareaRef, value]);
}

export function estimateTextWidthPx(value, { min = 340, max = 640 } = {}) {
  const lines = (value || "").split("\n");
  const longest = lines.reduce((acc, line) => Math.max(acc, line.length), 0);
  // Char width ~10px + body padding + field padding so content stays inside
  const px = longest * 10 + 100;
  return Math.min(max, Math.max(min, Math.round(px)));
}

