const BASE_URL = "https://countriesnow.space/api/v0.1";
const EXCHANGE_URL = "https://api.exchangerate.host";

async function post(endpoint, body) {
  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error("Country API error");
  }

  return data;
}

export function getCities(country) {
  return post("/countries/cities", { country });
}

export function getStates(country) {
  return post("/countries/states", { country });
}

export function getFlag(country) {
  return post("/countries/flag/images", { country });
}

export function getCurrency(country) {
  return post("/countries/currency", { country });
}

export function getCapital(country) {
  return post("/countries/capital", { country });
}

export function getCodes(country) {
  return post("/countries/iso", { country });
}

export async function getLatestRates(baseCurrency) {
  const response = await fetch(
    EXCHANGE_URL + "/latest?base=" + encodeURIComponent(baseCurrency),
  );
  if (!response.ok) {
    throw new Error("Exchange rate error");
  }

  return response.json();
}

export async function getCountryInfo(country) {
  const cities = await getCities(country);
  const states = await getStates(country);
  const flag = await getFlag(country);
  const currency = await getCurrency(country);
  const capital = await getCapital(country);
  const codes = await getCodes(country);

  return {
    country,
    cities,
    states,
    flag,
    currency,
    capital,
    codes,
  };
}
