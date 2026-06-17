export function formatList(list, limit = 10) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, limit);
}

export function safeValue(value, fallback = "N/A") {
  return value || fallback;
}
