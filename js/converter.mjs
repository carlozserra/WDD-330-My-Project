import { getCurrencyRates } from "./api.mjs";

export async function convertCurrency(from, to, amount) {
  // If the currencies are the same, do no conversion
  if (from === to) {
    return amount;
  }

  // Fetch the information about the currency API response directly
  const data = await getCurrencyRates(from);
  const currencyInfo = data && data.data && data.data[to];

  // Check if the API response has the rate value
  if (!currencyInfo || !currencyInfo.value) {
    throw new Error("Exchange rate not available");
  }

  const rate = currencyInfo.value;
  return amount * rate;
}
