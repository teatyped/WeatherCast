var currentContainer = document.getElementById("current-weather");
var cityTitle = document.getElementById("city-name");
var forecastDays = document.getElementById("forecast-data");
var userFromEl = document.getElementById("user-form");
var forecastContainer = document.getElementById("forecast-container");

const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
const fullYear = " " + "(" + month + "/" + day + "/" + year + ")";

var history = [];

document.getElementById("button").addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();


  let city = document.getElementById("userInput").value.trim();
  console.log("user input " + city);

  if (city) {
    fetchApi(city);
    // history.push('city');
    // localStorage.setItem("city", JSON.stringify(history));
} else if (!city) {
    alert("Please enter a city.");
}

}


function fetchApi(city){

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;
    console.log("user URL " + url);
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const { lat, lon, name } = data[0];

        console.log(data[0]);

        cityTitle.innerHTML = `<h3 class="current-city card-title">${
          name + fullYear
        }</h3>`;

        let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;
        fetch(url2)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // pass data to current and forecast and display info on document
            displayCurrent(data);
            displayForecast(data);
            
          });
      });

}


function displayCurrent(data) {

  const {icon} = data.current.weather[0];
  const { temp, wind_speed, humidity, uvi } = data.current;

  var colorBlock = ""
  if (uvi > 7) {
      colorBlock = "bg-danger";
  } else if (uvi > 4 && uvi < 7) {
      colorBlock = "bg-warning";
  } else if (uvi < 4) {
      colorBlock = "bg-success";
  }
  currentContainer.innerHTML = 
  
    `<div class="current-data card-body text-center">
        <img src="http://openweathermap.org/img/w/${icon}.png">
            <div class="card-text">Temp: ${temp}°F</div>
            <div class="card-text">Wind: ${wind_speed}mph</div>
            <div class="card-text">Humidity: ${humidity}%</div>
            <div class="card-text ${colorBlock}">UV Index: ${uvi}</div>
        </div>`;
}

function displayForecast(data){

    for (var i = 1; i <= 5; i++) {
        var weatherData = {
          date: data.daily[i].dt,
          temp: data.daily[i].temp.day,
          wind_speed: data.daily[i].wind_speed,
          humidity: data.daily[i].humidity,
          icon: data.current.weather[0].icon
        };

        var currentDate = moment
          .unix(weatherData.date)
          .format("MM/DD/YYYY");

      
          document.getElementById("forecast-" + i).innerHTML = 
      
                          `<div class="card" id="day-card">
                              <div class = "card-body text-center">
                                  <h5 class = "card-title">${currentDate}</h4>
                                  <div><img src="http://openweathermap.org/img/w/${weatherData.icon}.png"></div>
                                  <div class = "card-text">Temp: ${weatherData.temp}°F</div>
                                  <div class = "card-text">Wind: ${weatherData.wind_speed}mph</div>
                                  <div class = "card-text">Humidity: ${weatherData.humidity}%</div>
                              </div>    
                          </div>`;
      }
}

fetchApi("orlando");