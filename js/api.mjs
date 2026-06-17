async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}
//responsible for providing the link to country info from the API 
export function getCities(country) {
  return post("https://countriesnow.space/api/v0.1/countries/cities", { country });
}
export function getStates(country) {
  return post("https://countriesnow.space/api/v0.1/countries/states", { country });
}
export function getFlag(country) {
  return post("https://countriesnow.space/api/v0.1/countries/flag/images", { country });
}
export function getCurrency(country) {
  return post("https://countriesnow.space/api/v0.1/countries/currency", { country });
}
export function getCapital(country) {
  return post("https://countriesnow.space/api/v0.1/countries/capital", { country });
}
export function getCodes(country) {
  return post("https://countriesnow.space/api/v0.1/countries/iso", { country });
}

export async function getCountryInfo(country) {
  const cities = await getCities(country);
  const states = await getStates(country);
  const flag = await getFlag(country);
  const currency = await getCurrency(country);
  const capital = await getCapital(country);
  const codes = await getCodes(country);

  return { country, cities, states, flag, currency, capital, codes };

}
// Responsible for and currency rates from the currency API

const EXCHANGE_URL = "https://api.exchangerate.host";
const API_KEY = "cur_live_t07wAJmRCoAAbm0eBGn5pBpMjLRV1z0nssoNwzX1";

export async function getCurrencyRates(base = "USD") {
  // Build the URL for the currency API with the chosen base currency
  const url = "https://api.currencyapi.com/v3/latest?apikey=" + API_KEY + "&base_currency=" + base;

  // Fetch the data from the API
  const res = await fetch(url);
  const data = await res.json();

  // Return the raw API response data directly
  return data;
}
