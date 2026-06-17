const COUNTRY_KEY = "country_last_search";

export function saveCountry(data) {
  localStorage.setItem(COUNTRY_KEY, JSON.stringify(data));
}

export function getSavedCountry() {
  const data = localStorage.getItem(COUNTRY_KEY);
  return data ? JSON.parse(data) : null;
}
