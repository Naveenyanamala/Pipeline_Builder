import { useCallback, useState } from "react";
import { useStore } from "../store";
import { parsePipeline } from "../api/pipelines";

function formatDag(isDag) {
  return isDag ? "Yes — it’s a DAG" : "No — cycle detected";
}

export function useSubmitPipeline() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const pipelineName = useStore((s) => s.pipelineName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result = await parsePipeline({ nodes, edges, name: pipelineName });
      const msg = [
        "Pipeline parsed successfully:",
        `• Nodes: ${result.num_nodes}`,
        `• Edges: ${result.num_edges}`,
        `• DAG: ${formatDag(result.is_dag)}`,
      ].join("\n");
      // Assessment requirement: alert on response
      alert(msg);
    } catch (e) {
      alert(`Failed to submit pipeline.\n\n${e?.message || String(e)}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges, pipelineName]);

  return { submit, isSubmitting };
}

