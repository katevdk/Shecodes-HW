// the code works though it is slow and takes time to process.
//is there a way to improve this?

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

//

/* Last week

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  sanfrancisco: {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
console.log(weather);
let city = prompt("Enter city");
city = city.trim();
city = city.toLowerCase();

if (city === "paris") {
  alert(
    `It is currently ${Math.round(
      weather.paris.temp
    )}º in Paris with a humidity of ${weather.paris.humidity}%`
  );
} else if (city === "tokyo") {
  alert(
    `It is currently ${Math.round(
      weather.tokyo.temp
    )}º in Tokyo with a humidity of ${weather.tokyo.humidity}%`
  );
} else if (city === "lisbon") {
  alert(
    `It is currently ${Math.round(
      weather.lisbon.temp
    )}º in Lisbon with a with humidity of ${weather.lisbon.humidity}%`
  );
} else if (city === "sanfrancisco") {
  alert(
    `It is currently ${Math.round(
      weather.sanfrancisco.temp
    )}º in San Francisco with a with humidity of ${
      weather.sanfrancisco.humidity
    }%`
  );
} else if (city === "moscow") {
  alert(
    `It is currently ${Math.round(
      weather.moscow.temp
    )}º in Moscow with a with humidity of ${weather.moscow.humidity}%`
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      city
  );
}
 */
