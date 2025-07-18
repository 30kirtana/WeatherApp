document.getElementById("weatherBtn").addEventListener("click", function (e) {
  e.preventDefault(); // Not really needed if type="button" is used, but safe
  const cityNamedInSearchBar = document.getElementById("cityInput").value;

  if (cityNamedInSearchBar.trim() !== "") {
    const encodedCity = encodeURIComponent(cityNamedInSearchBar);
    window.location.href = `cities.html?city=${encodedCity}`;
  } else {
    alert("Please enter a city name");
  }
});

document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if(e.key==='Enter'){
  e.preventDefault(); // Not really needed if type="button" is used, but safe
  const cityNamedInSearchBar = document.getElementById("cityInput").value;

  if (cityNamedInSearchBar.trim() !== "") {
    const encodedCity = encodeURIComponent(cityNamedInSearchBar);
    window.location.href = `cities.html?city=${encodedCity}`;
  } else {
    alert("Please enter a city name");
  }
  }
  console.log(e);
});
