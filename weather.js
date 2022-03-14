let now = new Date();
let time = document.querySelector("#time");
time.innerHTML = now.getHours() + ":" + now.getMinutes();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = document.querySelector("#todaysDate");
date.innerHTML =
  day[now.getDay()] +
  " " +
  month[now.getMonth()] +
  " " +
  now.getDate() +
  ", " +
  now.getFullYear();

//
//

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fba31a6c985b0331975102e979ddcb33";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

// searched location
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity");
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = city.value;
  let cityInput = city.value;
  let apiKey = "fba31a6c985b0331975102e979ddcb33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;

  function showTemperature(response) {
    event.preventDefault();

    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".degreesNow");
    temperatureElement.innerHTML = `${temperature}`;
    let description = document.querySelector("#temperature-desc");
    description.innerHTML = response.data.weather[0].description;
    let windSpeed = Math.round(response.data.wind.speed * 3.6);
    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    let weatherIcon = document.querySelector("#todaysWeatherImage");
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    celsiusTemp = response.data.main.temp;

    getForecast(response.data.coord);
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let cityForm = document.querySelector("#input-city");
cityForm.addEventListener("click", searchCity);

// geolocation function
function getCurrentLocation(position) {
  function handlePosition(position) {
    let apiKey = "fba31a6c985b0331975102e979ddcb33";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;

    let currentCity = document.querySelector("#currentCity");
    currentCity.innerHTML = "current location";

    function showTemperature(response) {
      console.log(response.data);
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector(".degreesNow");
      temperatureElement.innerHTML = `${temperature}`;
      let description = document.querySelector("#temperature-desc");
      description.innerHTML = response.data.weather[0].description;
      let windSpeed = Math.round(response.data.wind.speed * 3.6);
      let windSpeedElement = document.querySelector("#wind-speed");
      windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
      let humidity = Math.round(response.data.main.humidity);
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `Humidity: ${humidity}%`;
      let name = response.data.name;
      let nameElement = document.querySelector("#currentCity");
      nameElement.innerHTML = `${name}`;
      let weatherIcon = document.querySelector("#todaysWeatherImage");
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      celsiusTemp = Math.round(response.data.main.temp);
      getForecast(response.data.coord);
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".week");
  console.log(forecast);
  let forecastHTML = "";
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="day1">
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="70px">
      <div class="days">${forecastDay.dt}</div>
      <span class="degreesMax">${forecastDay.temp.max}</span>
      <span> / </span>
      <span class="degreesMin">${forecastDay.temp.min}</span>
      </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let degreesElement = document.querySelector(".degreesNow");
  degreesElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degreesElement = document.querySelector(".degreesNow");
  degreesElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);
