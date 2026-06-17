export function getSearchValue(inputEl) {
  return inputEl.value.trim();
}

export function isValidSearch(value) {
  return value.length > 0;
}
