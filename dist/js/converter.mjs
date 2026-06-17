import { getRates, parseRates } from "./api.mjs";

export async function convertCurrency(from, to, amount) {
  const data = await getRates(from);
  const rates = parseRates(data);
  const rate = rates[to];

  if (!rate) {
    throw new Error("Exchange rate not available");
  }

  return amount * rate;
}
