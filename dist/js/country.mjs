import { getCountryInfo } from "./api.mjs";
import { renderCountry } from "./ui.mjs";

const input = document.querySelector("#countryInput");
const button = document.querySelector("#searchBtn");
const output = document.querySelector("#countryDetails");

button.addEventListener("click", async () => {
  const country = input.value.trim();
  if (!country) {
    output.textContent = "Type a country name.";
    return;
  }

  output.textContent = "Loading...";

  try {
    const data = await getCountryInfo(country);
    output.innerHTML = renderCountry(data);
  } catch (err) {
    console.error(err);
    output.textContent = "Country not found or API error.";
  }
});
