import { getCurrencyRates } from "./api.mjs";
import { convertCurrency } from "./converter.mjs";

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const result = document.getElementById("result");
const button = document.getElementById("convertBtn");

function fillCurrencyOptions(currencies) {
  var options = "";
  for (var i = 0; i < currencies.length; i++) {
    options += '<option value="' + currencies[i] + '">' + currencies[i] + '</option>';
  }

  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;
  fromSelect.value = "USD";
  toSelect.value = "BRL";
}

async function loadCurrencies() {
  try {
    const data = await getCurrencyRates("USD");
    let options = "";

    // Use the response data directly to build option elements
    if (data && data.data) {
      for (var code in data.data) {
        options += '<option value="' + code + '">' + code + '</option>';
      }
    }

    if (!options) {
      result.textContent = "Could not load currency list.";
      return;
    }

    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
    fromSelect.value = "USD";
    toSelect.value = "BRL";
  } catch (err) {
    console.error("Currency load failed", err);
    result.textContent = "Could not load currency list.";
  }
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
