const apiKey = "199a33eb2ce939f9f1342abfec3d8878"; // Replace with your OpenWeather API key
// const apikey = "YOUR_API_KEY";

async function getWeather(city) {
//   const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const weatherRes = await fetch(weatherUrl);
    const forecastRes = await fetch(forecastUrl);

    if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found");

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    displayWeather(weatherData, forecastData.list)
    // displayForecast(forecastData.list);
  } catch (err) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${err.message}</p>`;
    document.getElementById("forecastResult").innerHTML = "";
  }
}

function displayWeather(weatherData, forecastData){
    console.log(weatherData.name);
     document.getElementById('weatherResult').innerHTML = `
            <h3 class="card-title">Weather in ${weatherData.name}, ${weatherData.sys.country}</h3>
            <p class="card-text">Temperature: ${weatherData.main.temp}°C</p>
            <p class="card-text">Humidity: ${weatherData.main.humidity}%</p>
            <p class="card-text">Wind Speed: ${weatherData.wind.speed} km/h</p>
            <p class="card-text"><strong>${weatherData.weather[0].main}</strong>-${weatherData.weather[0].description}</p>
            <div id="moreInfoDiv">
              <button class="btn btn-outline-success" type="button" id="moreInfo">View More Info</button>
              <button class="btn btn-outline-dark" type="button" id="viewForecast">View Forcast</button>
            </div>
          `;
    setTimeout(() => {
            const moreInfoBtn = document.getElementById("moreInfo");
            if (moreInfoBtn) {
            moreInfoBtn.addEventListener("click", function () {
            allInfoGetWeather(weatherData);
            this.textContent = this.textContent === "View More Info" ? "Hide Info" : "View More Info";
              });
            }
          }, 0);
    setTimeout(() => {
            const moreInfoBtn = document.getElementById("viewForecast");
            if (moreInfoBtn) {
            moreInfoBtn.addEventListener("click", function () {
              const weatherCard = document.getElementsByClassName('card')[0].classList;
              if (weatherCard){
                weatherCard.remove('card','card-body','card-text','card-title');}
              const weatherImg = document.getElementById("weatherImg");
              if(weatherImg) weatherImg.remove();
              const weatherResultcard = document.getElementById('weatherResult');
              if(weatherResultcard) weatherResultcard.remove();
            displayForecast(forecastData, weatherData.name);
              });
            }
          }, 0);

          return;
}

function allInfoGetWeather(weatherData) {
  const parentElement = document.getElementById('weatherResult');
  const existingDiv = document.getElementById('moreDetails');
if(weatherData){
  // ✅ Toggle OFF if already present
  if (existingDiv) {
    existingDiv.remove();
    return;
  }
    const unixTimestampSunrise = weatherData.sys.sunrise;
    const unixTimestampSunset = weatherData.sys.sunset;

    // Convert to milliseconds
    const dateSunrise = new Date(unixTimestampSunrise * 1000);
    const dateSunset = new Date(unixTimestampSunset * 1000);

    // Format options: IST, 12-hour format, only hours & minutes
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const istTimeSunrise = dateSunrise.toLocaleTimeString('en-IN', options);
    const istTimeSunset = dateSunset.toLocaleTimeString('en-IN', options);
    const newDiv = document.createElement('div');
          newDiv.id = 'moreDetails'; // ✅ Unique ID to toggle
          newDiv.innerHTML = `
            <p class="card-text">Temp feels like: ${weatherData.main.feels_like}°C</p>
            <p class="card-text">Min Temp: ${weatherData.main.temp_min}°C</p>
            <p class="card-text">Max Temp: ${weatherData.main.temp_max}°C</p>
            <p class="card-text">Ground Level: ${weatherData.main.grnd_level}</p>
            <p class="card-text">Sea Level: ${weatherData.main.sea_level}</p>
            <p class="card-text">Pressure: ${weatherData.main.pressure}</p>
            <p class="card-text">Wind Degrees: ${weatherData.wind.deg}°</p>
            <p class="card-text">Sunrise Time (IST): ${istTimeSunrise}</p>
            <p class="card-text">Sunset Time (IST): ${istTimeSunset}</p>
          `;
          parentElement.appendChild(newDiv);
          return;
} else{
    parentElement.innerText = 'City not found.';
}

}
// display forcast error
function displayForecast(forecastDataArray, city){
  if(forecastDataArray){
    console.log(forecastDataArray);
    document.getElementsByClassName('card').innerHTML="";
    const daily = forecastDataArray.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastContainer = document.getElementById("forecastResult");
    forecastContainer.innerHTML = "";
    forecastContainer.innerHTML = `<div class="forecastHeading"><h1>Forecast weather of ${city} for 5 days</h1></div>`;
    daily.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const temp = item.main.temp;
    const desc = item.weather[0].description;

    forecastContainer.innerHTML += `
      <div class="forecast-card">
        <img src="./WeatherSquareImg.jpg" id='weatherImg'/>
        <p class='card-title'><strong>${date}</strong></p>
        <p class='card-text'>${desc}</p>
        <p class='card-text'>${temp}°C</p>
      </div>
    `;
   });
  } else{
    document.getElementsByClassName('card').innerHTML="";
    const daily = forecastDataArray.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastContainer = document.getElementById("forecastResult");
    forecastContainer.innerHTML = "Forecast Not Found!";
  }
}

const params = new URLSearchParams(window.location.search);
const cityName = params.get('city');
console.log("City from URL:", cityName);

if (cityName) {
  getWeather(cityName);
} else {
  document.getElementById('weatherResult').innerText = 'City not found.';
}

// City click in cities.html and forecast display and city not found (new-delhi)

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
