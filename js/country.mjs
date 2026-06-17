import { getCountryInfo } from "./api.mjs";
import { renderCountry } from "./ui.mjs";
import { saveCountry, getSavedCountry } from "./storage.mjs";

var input = document.getElementById("countryInput");
var button = document.getElementById("searchBtn");
var output = document.getElementById("countryDetails");

async function requestCountry(country) {
  return getCountryInfo(country);
}

async function showCountry(country) {
  output.textContent = "Loading...";
  const data = await requestCountry(country);
  output.innerHTML = renderCountry(data);
  saveCountry({ term: country, result: data });
}

button.addEventListener("click", async function () {
  var country = input.value.trim();
  if (!country) {
    output.textContent = "Type a country name.";
    return;
  }

  try {
    await showCountry(country);
  } catch (err) {
    console.error(err);
    output.textContent = "Country not found or API error.";
  }
});

var saved = getSavedCountry();
if (saved && saved.term) {
  input.value = saved.term;
  showCountry(saved.term);
}
