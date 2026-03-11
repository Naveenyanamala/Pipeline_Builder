import { useCallback, useMemo } from "react";
import { useStore } from "../../store";

/**
 * Reads/writes node.data[fieldName] via the central store.
 * Keeps node implementations dumb and consistent.
 */
export function useNodeField(nodeId, data, fieldName, defaultValue) {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const value = useMemo(() => {
    const v = data?.[fieldName];
    return v === undefined || v === null ? defaultValue : v;
  }, [data, fieldName, defaultValue]);

  const setValue = useCallback(
    (next) => {
      updateNodeField(nodeId, fieldName, next);
    },
    [updateNodeField, nodeId, fieldName]
  );

  return [value, setValue];
}

