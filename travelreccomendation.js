// New function to handle real-time input for suggestions
const handleInput = () => {
  let searchQuery = query.value.toLowerCase();
  let notfound = true;
  let matchCount = 0; // To track number of matches found

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

// Clear search results when clearing input
clearbtn.addEventListener("click", clearsearch);
