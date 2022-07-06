# Weather Dashboard

## Description

This page is a weather dashboard. The user searches for a city and is presented with current conditions, as well as a future five-day forecast. This page was an exercise in jQuery, moment.js, and API fetch requests.

[Weather Dashboard](https://pdbesse.github.io/Weather-Dashboard/)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Technology](#technology)
* [Credits](#credits)

## Installation

The website has been installed and deployed on [Github](https://github.com/).

## Usage

The user is presented an empty search box. The user enters a city name and clicks "search." The user is then presented with current weather conditions (an icon representing the weather, the temperature, wind speed, humidity, and a color-coded UV index). The user is also presented with a future five-day forecast (the date, an icon representing the weather, the temperature, and humidity). Searched cities are saved in a box below the search input, and by clicking on a past city, the weather conditions for that city will refresh.

![Usage GIF](./assets/usage.gif)

### Code Snippets

``` ruby

var searchedCity = $("#search-city").val();
var searchedCities = JSON.parse(localStorage.getItem("city")) || [];

for (let i = 0; i < searchedCities.length; i++) {

    var newLI = $("<li>")
    newLI.text(searchedCities[i]).val();

    newLI.on("click", function (event){ 
        $("#search-city").val(event.target.textContent);
        search()
        })

    $("#search-city-list").append(newLI);
}

```

This code block creates a variable from the city search input text. It creates an array that is either empty or contains elements from the local storage array. For each item in the local storage array, it creates a new li in the search history on the page on a reload of the page. If an li is clicked, it runs the search function.

``` ruby

function search() {
    var searchedCity = $("#search-city").val();

    var alreadyExist = false
    for (let i = 0; i < searchedCities.length; i++) {

        if (searchedCities[i] == searchedCity) {
           alreadyExist = true;
        }
    }

        if (!alreadyExist) {
     searchedCities.push(searchedCity);
        var newLI = $("<li>")
        newLI.text(searchedCity)
        $("#search-city-list").append(newLI);
    }

    localStorage.setItem("city", JSON.stringify(searchedCities))

    $("#searched-city").html("Current weather for " + searchedCity + " on " + (today.format("MMMM Do, YYYY")));

    getLatLon(searchedCity)
}

```

This code block takes the inputted city text and runs a for loop to determine if the city has already been searched for. If it has, nothing is done. If it hasn't, a new li is added. It then displays the message "Current weather for (searched city) on (today's date).

``` ruby

function getLatLon(searchedCity) {

    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var latLonURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${key}`;

    fetch(latLonURL).then(function (response) {
        return response.json();})
        .then(function (data) {

            for (var i = 0; i < data.length; i++) {

                var searchCityLat = data[i].lat;
                var searchCityLon = data[i].lon

                getCurrentWeather(searchCityLat, searchCityLon)
            }
        })
}

```

This code block runs a function to get the latitude and longitude coordinates of the searched-for city using an API request. It then creates variables for latitude and longitude and runs the getCurrentWeather function.

``` ruby


function getCurrentWeather(searchCityLat, searchCityLon) {
    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&units=imperial&alerts&appid=${key}`;

    fetch(weatherURL).then(function (response) {
        return response.json();})
        .then(function (data) {

            var currentIcon = data.current.weather[0].icon
            var currentIconURL = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
            
            $("#weather-container").removeClass("d-none");
            $("#current-icon").attr("src", currentIconURL);
            $("#temp").text(Math.floor(data.current.temp));
            $("#humidity").text(data.current.humidity);
            $("#wind-speed").text(Math.floor(data.current.wind_speed));
            $("#uv-index").text(data.current.uvi);

                if (data.current.uvi >= 0 && data.current.uvi <= 2.9) {
                    $("#uv-index").removeClass()
                    $("#uv-index").addClass("uvLow")                   
                } else if (data.current.uvi >= 3 && data.current.uvi <= 5.9) {
                    $("#uv-index").removeClass()
                    $("#uv-index").addClass("uvMod")                    
                } else if (data.current.uvi >= 6 && data.current.uvi <= 7.9) {
                    $("#uv-index").removeClass()
                    $("#uv-index").addClass("uvHigh")
                } else if (data.current.uvi >= 8 && data.current.uvi <= 10) {
                    $("#uv-index").removeClass()
                    $("#uv-index").addClass("uvVHigh")
                } else {
                    $("#uv-index").removeClass()
                    $("#uv-index").addClass("uvEx")
                }
                
    })
        getFutureWeather(searchCityLat, searchCityLon)
}

```

This code block takes the returned latitude and longitude coordinates and returns weather data for those coordinates (the searched-for city). It then parses out the desired weather data (weather icon, temperature, humidty, wind speed, and UV index) and renders them to the HTML. It then displays different colored backgrounds on the UV Index HTML element based on severity levels. Finally, it runs the getFutureWeather function.

``` ruby

function getFutureWeather(searchCityLat, searchCityLon) {
    $("#future-weather").empty();

    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&units=imperial&alerts&appid=${key}`;

    fetch(weatherURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            for (i = 1; i < 6; i++) {
            
            var futureDate = moment.unix(data.daily[i].dt).format("MM/DD/YY")

            var futureIcon = data.daily[i].weather[0].icon
            var futureIconURL = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`;
            
            var futureTemp = Math.floor(data.daily[i].temp.day);
            var futureHumidity = data.daily[i].humidity;
            
            var futCard = document.createElement("div")
                futCard.setAttribute("class", "card-body border border-dark bg-info future-card")
            $(futCard).append("<h5 class='card-title'>" + futureDate + "</h5>");
            $(futCard).append(`<img  class='card-img' src=${futureIconURL}></img>`);
            $(futCard).append("<p class='card-text'>" + futureTemp + "\u00b0 F" + "</p");
            $(futCard).append("<p class='card-text'>" + futureHumidity + " %" + "</p");
            $("#future-weather").append(futCard);
            }
        })
} 

``` 

Similarly to the getCurrentWeather function, this code block makes an API request for weather data for the latitude and longitude coordinates. A for loop requests the data for indexes 1 through 6 (the 5 days following index[0], or "today"). It then pulls the date, weather icon, temperature, and humidity forecast for each of the 5 days.  Finally, it renders a card for each day, appends the relevant weather data, and renders the cards to the HTML.

## Technology

Technology Used:
* [GitHub](https://github.com/)
* [GitBash](https://gitforwindows.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Javascipt](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [moment.js](https://momentjs.com/)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [W3 CSS](https://www.w3.org/Style/CSS/Overview.en.html)
* [One Call API 1.0](https://openweathermap.org/api/one-call-api)
* [Geocoding API](https://openweathermap.org/api/geocoding-api)

## Credits

All coding credited to Phillip Besse.  Javascript pseudocoded with tutor Joem Casusi and TA Manuel Nunes.

Websites Referenced:
* [MDN Web Docs - Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
* [Toptal - HTML and Unicode codes for degree symbol](https://www.toptal.com/designers/htmlarrows/math/degree-sign/)
* [Moment.js - UNIX](https://momentjscom.readthedocs.io/en/latest/moment/01-parsing/08-unix-timestamp/)
* [Stack - Converting UNIX](https://stackoverflow.com/questions/20943089/how-to-convert-unix-timestamp-to-calendar-date-moment-js)
* [BobbyHadz - Check if value is between two numbers](https://bobbyhadz.com/blog/javascript-check-if-number-between-two-numbers)
* [EPA.gov - UV Index Severity Chart](https://www.epa.gov/enviro/uv-index-description)
* [GDI Chicago - Unicode Degree Symbol](http://gdichicago.com/courses/gdi-featured-js-intro/homework.html#:~:text=Unicode%20Characters%3A%20To%20print%20the,character%20for%20the%20degress%20symbol.)
* [Bootstrap - Cards](https://getbootstrap.com/docs/4.4/components/card/)
* [Bootstrap - Hiding Elements](https://getbootstrap.com/docs/4.0/utilities/display/))
* [One Call API 1.0](https://openweathermap.org/api/one-call-api)
* [Geocoding API](https://openweathermap.org/api/geocoding-api)



## License

Phillip Besse's Weather Dashboard is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

MIT License

Copyright (c) 2022 Phillip Besse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
