async function loadPartial(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.querySelector(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#header", "./partials/header.html");
  loadPartial("#footer", "./partials/footer.html");
});
