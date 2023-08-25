"strict mode";

// define varialbes for html element
const searchTerm = document.querySelector("#searchTerm");
const selectFormat = document.querySelector("#format");
const form = document.querySelector("#form");
const displayContainer = document.querySelector("#displayContainer");

// define function for submit form
function submitForm(e) {
  e.preventDefault();
  document.location.assign(
    // `&${selectFormat.value}?q=${searchTerm.value}./display.html`
    `./display.html?${selectFormat.value}&${searchTerm.value}`
  );
}
// add event listener for form
form.addEventListener("submit", submitForm);
