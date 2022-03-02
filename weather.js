let now = new Date();
let time = document.querySelector(".time");
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
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".degreesNow");
    temperatureElement.innerHTML = `${temperature}ºC`;
    let description = document.querySelector("#temperature-desc");
    description.innerHTML = response.data.weather[0].description;
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
      temperatureElement.innerHTML = `${temperature}ºC`;
      let description = document.querySelector("#temperature-desc");
      description.innerHTML = response.data.weather[0].description;
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);