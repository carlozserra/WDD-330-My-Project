import { getLatestRates } from "./api.mjs";
import { convertCurrency } from "./converter.mjs";

const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#fromCurrency");
const toSelect = document.querySelector("#toCurrency");
const result = document.querySelector("#result");
const button = document.querySelector("#convertBtn");

async function loadCurrencies() {
  const data = await getLatestRates("USD");
  const currencies = Object.keys(data.rates || {});

  const options = currencies.map(currency => `<option value="${currency}">${currency}</option>`).join("");

  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;
  fromSelect.value = "USD";
  toSelect.value = "BRL";
}

loadCurrencies();

button.addEventListener("click", async () => {
  const amount = Number(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  try {
    const converted = await convertCurrency(from, to, amount);
    result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    console.error(error);
    result.textContent = "Error converting currency.";
  }
});
