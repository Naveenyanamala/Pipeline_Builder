import React from "react";
import { useSubmitPipeline } from "./hooks/useSubmitPipeline";

export const SubmitButton = () => {
  const { submit, isSubmitting } = useSubmitPipeline();

  return (
    <button
      className="vs-buttonPrimary"
      type="button"
      onClick={submit}
      disabled={isSubmitting}
      style={isSubmitting ? { opacity: 0.7, cursor: "wait" } : undefined}
    >
      {isSubmitting ? "Submitting…" : "Submit pipeline"}
    </button>
  );
};

