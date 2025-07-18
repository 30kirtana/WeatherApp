function allInfoGetWeather(cityIsName) {
  const parentElement = document.getElementById('weatherResult');
  const existingDiv = document.getElementById('moreDetails');

  // ✅ Toggle OFF if already present
  if (existingDiv) {
    existingDiv.remove();
    return;
  }

  // ✅ Else fetch and add details
  fetch('weatherData.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].city.toLowerCase() === cityIsName.toLowerCase()) {
          console.log("More Info:", data[i]);

          const newDiv = document.createElement('div');
          newDiv.id = 'moreDetails'; // ✅ Unique ID to toggle
          newDiv.innerHTML = `
            <p class="card-text">Temp feels like: ${data[i].feels_like}°C</p>
            <p class="card-text">Min Temp: ${data[i].min_temp}°C</p>
            <p class="card-text">Max Temp: ${data[i].max_temp}°C</p>
            <p class="card-text">Cloud Precipitation: ${data[i].cloud_pct}%</p>
            <p class="card-text">Wind Degrees: ${data[i].wind_degrees}°</p>
          `;
          parentElement.appendChild(newDiv);
          return;
        }
      }
      parentElement.innerText = 'City not found.';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getWeather(cityIsName) {
  fetch('weatherData.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].city.toLowerCase() === cityIsName.toLowerCase()) {
          console.log("Basic Info:", data[i]);

          document.getElementById('weatherResult').innerHTML = `
            <h3 class="card-title">Weather in ${data[i].city}</h3>
            <p class="card-text">Temperature: ${data[i].temp}°C</p>
            <p class="card-text">Humidity: ${data[i].humidity}%</p>
            <p class="card-text">Wind Speed: ${data[i].wind_speed} km/h</p>
            <p class="card-text">Weather Type: ${data[i].weather}</p>
            <div id="moreInfoDiv">
              <button class="btn btn-outline-success" type="button" id="moreInfo">View More Info</button>
            </div>
          `;

          // ✅ Attach listener after rendering
          setTimeout(() => {
            const moreInfoBtn = document.getElementById("moreInfo");
            if (moreInfoBtn) {
            moreInfoBtn.addEventListener("click", function () {
            allInfoGetWeather(cityIsName);
            this.textContent = this.textContent === "View More Info" ? "Hide Info" : "View More Info";
              });
            }
          }, 0);

          return;
        }
      }

      document.getElementById('weatherResult').innerText = 'City not found.';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// ✅ Get city name from URL
const params = new URLSearchParams(window.location.search);
const cityName = params.get('city');
console.log("City from URL:", cityName);

if (cityName) {
  getWeather(cityName);
}

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
