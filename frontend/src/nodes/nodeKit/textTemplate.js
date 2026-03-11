export const TEMPLATE_VAR_REGEX = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

export function extractTemplateVariables(text) {
  const vars = new Set();
  if (!text) return [];
  let m;
  while ((m = TEMPLATE_VAR_REGEX.exec(text)) !== null) {
    vars.add(m[1]);
  }
  return Array.from(vars);
}

