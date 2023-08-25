"strict mode";

const displayContainer = document.querySelector("#displayContents");
const displaySearchTerm = document.querySelector("#dispSearchTerm");
const form = document.querySelector("#form");
const searchTerm = document.querySelector("#searchTerm");
const selectFormat = document.querySelector("#format");
const btnReturn = document.querySelector("#return");

let searchTermInit, selectFormatInit;

// define function for display
function display(data) {
  // displaySearchTerm.textContent = searchTermInit;
  displayContainer.innerHTML = "";
  data.forEach(function (el) {
    //create display html element
    const card = document.createElement("div");
    const title = document.createElement("p");
    const image = document.createElement("img");
    const description = document.createElement("p");
    const anchor = document.createElement("a");
    const btn = document.createElement("button");

    //give elements values
    title.textContent = el.title;
    image.src = el.image_url[0];
    description.textContent = el.description[0];
    anchor.href = el.url;
    btn.textContent = "Read More";

    //append the elements
    displayContainer.append(card);
    card.append(title);
    card.append(image);
    card.append(description);
    card.append(anchor);
    anchor.append(btn);

    // card.append("image");
    card.style.border = "10px solid rgba(11, 11, 59, 0.8)";
    card.classList.add("divCard");
    title.classList.add("divContent");
    image.classList.add("divContent", "image");
    description.classList.add("divContent");
    btn.classList.add("divContent");
  });
}
// define function for fetch data

function fetchData(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      display(data.results);
    });
}
// define function for initiation of page
function init() {
  //how to get query parameters???
  const strUrl = document.location.href;
  const parameters = strUrl.split("?")[1];
  [selectFormatInit, searchTermInit] = parameters.split("&");

  const urlLOC = `https://www.loc.gov/${selectFormatInit}/?q=${searchTermInit}&fo=json`;

  // fetch data from LOC API
  fetchData(urlLOC);

  displaySearchTerm.textContent = searchTermInit.split("%20").join(" ");
}

// define function for formSubmit
function formSubmit(e) {
  e.preventDefault();

  const urlLOC = `https://www.loc.gov/${selectFormat.value}/?q=${searchTerm.value}&fo=json`;

  // displaySearchTerm.textContent = searchTerm.value;
  // console.log(searchTerm.value);
  // console.log(displaySearchTerm.textContent);

  // update the url based on the new search
  document.location.assign(
    // `&${selectFormat.value}?q=${searchTerm.value}./display.html`
    `./display.html?${selectFormat.value}&${searchTerm.value}`
  );

  fetchData(urlLOC);
}

// define return function
function goBackToHome() {
  document.location.assign("./index.html");
}
// define event listener for form submit
form.addEventListener("submit", formSubmit);

// add event listener for return button.

btnReturn.addEventListener("click", goBackToHome);

init();
