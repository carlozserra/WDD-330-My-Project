import { getLatestRates } from "./api.mjs";

export async function convertCurrency(from, to, amount) {
  const data = await getLatestRates(from);
  const rate = data && data.rates ? data.rates[to] : null;

  if (!rate) {
    throw new Error("Exchange rate not available");
  }

  return amount * rate;
}
