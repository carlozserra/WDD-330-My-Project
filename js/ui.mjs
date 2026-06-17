export function renderCountry(data) {
  var cities = [];
  if (data.cities && data.cities.data) {
    cities = data.cities.data;
  }

  var states = [];
  if (data.states && data.states.data && data.states.data.states) {
    states = data.states.data.states;
  }

  var flag = "";
  if (data.flag && data.flag.data && data.flag.data.flag) {
    flag = data.flag.data.flag;
  }

  var currency = "N/A";
  if (data.currency && data.currency.data && data.currency.data.currency) {
    currency = data.currency.data.currency;
  }

  var capital = "N/A";
  if (data.capital && data.capital.data && data.capital.data.capital) {
    capital = data.capital.data.capital;
  }

  var codes = "N/A";
  if (data.codes && data.codes.data && data.codes.data.iso2) {
    codes = data.codes.data.iso2;
  }

  var statesHtml = "";
  if (states.length > 0) {
    for (var i = 0; i < states.length; i++) {
      var stateName = states[i] && states[i].name ? states[i].name : "N/A";
      statesHtml += "<li>" + stateName + "</li>";
    }
  } else {
    statesHtml = "<li>N/A</li>";
  }

  var citiesHtml = "";
  var cityCount = cities.length;
  if (cityCount > 10) {
    cityCount = 10;
  }
  if (cityCount > 0) {
    for (var j = 0; j < cityCount; j++) {
      citiesHtml += "<li>" + cities[j] + "</li>";
    }
  } else {
    citiesHtml = "<li>N/A</li>";
  }

  return "<div class=\"country-card-detail\">" +
    "<div class=\"country-header\">" +
    "<img src=\"" + flag + "\" alt=\"Flag of " + data.country + "\" width=\"120\" />" +
    "<h2>" + data.country + "</h2>" +
    "</div>" +
    "<div class=\"country-info\">" +
    "<p><strong>Capital:</strong> " + capital + "</p>" +
    "<p><strong>Currency:</strong> " + currency + "</p>" +
    "<p><strong>Code:</strong> " + codes + "</p>" +
    "</div>" +
    "<div class=\"country-lists\">" +
    "<div><h3>States / Provinces</h3><ul>" + statesHtml + "</ul></div>" +
    "<div><h3>Cities (top 10)</h3><ul>" + citiesHtml + "</ul></div>" +
    "</div>" +
    "</div>";
}
