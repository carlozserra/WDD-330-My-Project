import { formatList, safeValue } from "./util.mjs";

export function renderCountry(data) {
  const cities = formatList(data.cities?.data || []);
  const states = data.states?.data?.states || [];
  const flag = data.flag?.data?.flag;
  const currency = safeValue(data.currency?.data?.currency);
  const capital = safeValue(data.capital?.data?.capital);
  const codes = safeValue(data.codes?.data?.iso2);

  return `
    <div class="country-card-detail">
      <div class="country-header">
        <img src="${flag}" alt="Flag of ${data.country}" width="120" />
        <h2>${data.country}</h2>
      </div>

      <div class="country-info">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Currency:</strong> ${currency}</p>
        <p><strong>Code:</strong> ${codes}</p>
      </div>

      <div class="country-lists">
        <div>
          <h3>States / Provinces</h3>
          <ul>
            ${states.length ? states.map((s) => `<li>${s.name}</li>`).join("") : "<li>N/A</li>"}
          </ul>
        </div>
        <div>
          <h3>Cities (top 10)</h3>
          <ul>
            ${cities.length ? cities.map((c) => `<li>${c}</li>`).join("") : "<li>N/A</li>"}
          </ul>
        </div>
      </div>
    </div>
  `;
}
