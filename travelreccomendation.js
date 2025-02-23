let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  console.log("Clearing");
};

clearbtn.addEventListener("click", clearsearch);

// Show result in the dropdown
const showResult = (name, img, info) => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block";
  } else {
    mydiv.style.display = "none";
  }

  result.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src=${img} alt="sofia">
    <p class="description">${info}</p>
  `;
};

// Close the dropdown when close button is clicked
const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
};

close.addEventListener("click", closeDropdown);

// Display error message when no results are found
const searchError = () => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block";
  } else {
    mydiv.style.display = "none";
  }

  result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

// Real-time input handling for suggestions
const handleInput = () => {
  let searchQuery = query.value.toLowerCase();
  let notfound = true;
  let matchCount = 0; // To track the number of matches found

  // Clear previous results
  result.innerHTML = '';

  // Loop through cities and show suggestions
  data.countries.map((country) => {
    country.cities.map((city) => {
      if (matchCount < 2 && city.name.toLowerCase().includes(searchQuery)) {
        showResult(city.name, city.imageUrl, city.description);
        matchCount++;
        notfound = false;
      }
    });
  });

  // If no match is found, show an error message
  if (notfound) {
    result.innerHTML = `<p class="notfound">No cities found matching your query.</p>`;
  }
};

// Listen for input event on the search bar (for live suggestions)
query.addEventListener("input", handleInput);

// Search functionality when the search button is clicked
const search = () => {
  let searchQuery = query.value.toLowerCase();
  let notfound = true;
  let matchCount = 0; // To track the number of matches found

  // Clear previous results
  result.innerHTML = '';

  // Loop through cities and show suggestions
  data.countries.map((country) => {
    country.cities.map((city) => {
      if (matchCount < 2 && city.name.toLowerCase().includes(searchQuery)) {
        showResult(city.name, city.imageUrl, city.description);
        matchCount++;
        notfound = false;
      }
    });
  });

  // If no match is found, show an error message
  if (notfound) {
    searchError();
  }
};

// Fetch the data from the JSON file
fetch("travelrecommendation.json")
  .then((res) => res.json())
  .then((data) => {
    // Add event listener to the search button
    searchbtn.addEventListener("click", search);
  });
