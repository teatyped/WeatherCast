var currentContainer = document.getElementById("current-weather");
var cityTitle = document.getElementById("city-name");
var forecastDays = document.getElementById("forecast-data");
var userFromEl = document.getElementById("user-form");


const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
const fullYear = " " + "(" + month + "/" + day + "/" + year + ")";


document.getElementById('button').addEventListener('click', handleClick);

function handleClick(event) {
    event.preventDefault();

    console.log("in click fun");

    let city = document.getElementById('userInput').value.trim();
    console.log("user input " + city);

    if (city) {
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
        console.log("user URL " + url);

        fetch(url)
            .then(data => data.json())
            .then(data => {
                const { lat, lon, name } = data[0];

                console.log(data[0]);
                
                cityTitle.innerHTML =
                    `<h3 class="current-city card-title">${name + fullYear}</h3>`


                let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`
                fetch(url2)
                    .then(data => data.json())
                    .then(data => {
                        const { temp, wind_speed, humidity, uvi } = data.current;
                        currentContainer.innerHTML =
                            `<div class="current-data card-body">
                                <div class="card-text">Temp: ${temp}°F</div>
                                <div class="card-text">Wind: ${wind_speed}mph</div>
                                <div class="card-text">Humidity: ${humidity}%</div>
                                <div class="card-text">UV Index: ${uvi}</div>
                            </div>`;


                        // for (var i = 1; i <= 5; i++) {
                        //     const temp = data.daily[i].temp.day;
                        //     const { dt, wind_speed, humidity, uvi } = data.daily[i];
                        //     console.log(data.daily[i]);

                        //     const milliseconds = dt * 1000;
                        //     const dateObject = new Date(milliseconds);
                        //     const humanDate = dateObject.toLocaleString("en-US", { timeZoneName: "short" });
                        //     const splits1 = humanDate.split(", ")[0];

                        //     forecastDays.innerHTML =
                        //         `<div>
                        //             <div>Temp: ${temp}°F</div>
                        //             <div>Wind: ${wind_speed}mph</div>
                        //             <div>Humidity: ${humidity}%</div>
                        //             <div>UV Index: ${uvi}</div>
                        //         </div>`;
                        // }
                    }
                    )
            })
    } else if (!city) {
        alert("Please enter a city.");
    }
};


function displayCurrent (){

}

function displayForcast(){

}


