//This is for before page is loading it should wait upto 2 seconds.

let load_screen = document.getElementById("load_screen");

function loadingText() {
  setTimeout(function () {
    load_screen.parentElement.removeChild(load_screen);
  }, 2000);
}

window.addEventListener("load", loadingText);

const buttonElement = document.getElementById("button");

const input2Element = document.getElementById("input_tag");

const city_name = document.getElementById("city");
const tempvalue = document.getElementById("temp_value");
const temparature_description = document.getElementById("climate");
const weather_icon = document.getElementById("temp_icon");
const wind = document.getElementById("wind_speed");
const sunrise_element = document.getElementById("sunrise");
const sunset_element = document.getElementById("sunset");
const errorMessage = document.getElementById("error_message");
const button2_element = document.getElementById("button2");

let api;
function weatherInfo() {
  //let inputValue=input2Element.value
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //console.log(inputValue)
      city_name.innerHTML = `${data.name}`;

      tempvalue.innerHTML = `Temparature: ${data.main.temp}°C`;
      temparature_description.innerHTML = `Clouds: ${data.weather[0].description}`;
      wind.innerHTML = `Wind speed: ${data.wind.speed}m/s`;
      weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      //const timeOffset=data.timezone*1000;
      const sunriseInSeconds = data.sys.sunrise * 1000;
      const sunsetInSeconds = data.sys.sunset * 1000;
      const sunriseDate = new Date(sunriseInSeconds);
      const sunsetDate = new Date(sunsetInSeconds);
      sunrise_element.innerHTML = `SunRise: ${sunriseDate.toLocaleTimeString()}`;
      sunset_element.innerHTML = `SunSet: ${sunsetDate.toLocaleTimeString()}`;
      //for map
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(latitude), lng: Number(longitude) },
        zoom: 8,
      });
    });
}

//to check the weather by city name
function getweatherInformation() {
  let inputValue = input2Element.value;

  localStorage.setItem("userInput", inputValue);

  api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=0d7b5ce9962df12c04712a8e270bfbb6&units=metric`;

  if (inputValue == "") {
    errorMessage.innerHTML = "Please enter the city name first.";
  } else {
    weatherInfo();
  }
}
function storageData() {
  const cityName = localStorage.getItem("userInput");
  api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0d7b5ce9962df12c04712a8e270bfbb6&units=metric`;
  weatherInfo();
}

//to check the weather with current position
function getCurrentWeather() {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0d7b5ce9962df12c04712a8e270bfbb6&units=metric`;

      weatherInfo();
    });
  }
}

button2_element.addEventListener("click", getCurrentWeather);
window.addEventListener("load", storageData);
buttonElement.addEventListener("click", getweatherInformation);
