// OpenWeather API key 5d5fe60d12dae6eed2bd4a396bd88119

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var searchedCity = $("#search-city").val();
var searchedCities = []

var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY"));

$("#search-button").on("click", function() {
    var searchedCity = $("#search-city").val();
    searchedCities.push(searchedCity);

    // need to store multiple properties in array for single LS key

    localStorage.setItem("city", JSON.stringify(searchedCities))

    /* console.log(searchedCity);
    console.log(searchedCities); */

    // need to append searchedCity to ul to #search-city-list
    $("#search-city-list").append("<li>" + searchedCity + "</li>");
    $("#searched-city").html("Current weather for " + searchedCity + " on " + (today.format("MMMM Do, YYYY")));

    getLatLon(searchedCity)
    
})

// function to get lat/lon
function getLatLon(searchedCity) {
    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var latLonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${key}`;

    fetch(latLonURL).then(function (response) {
        return response.json();})
        .then(function (data) {

            /* console.log(data); */

            for (var i = 0; i < data.length; i++) {

                /* console.log("lat", data[i].lat);
                console.log("lon", data[i].lon); */

                var searchCityLat = data[i].lat;
                var searchCityLon = data[i].lon

                /* console.log(searchCityLat);
                console.log(searchCityLon); */

                getCurrentWeather(searchCityLat, searchCityLon)
            }
        })
    
}

// function to get weather
function getCurrentWeather(searchCityLat, searchCityLon) {
    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&units=imperial&alerts&appid=${key}`;
    fetch(weatherURL).then(function (response) {
        return response.json();})
        .then(function (data) {

            console.log(data);
            /* console.log(data.daily[1]); */
            console.log(data.current);

            /* var currentIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`; */
            $("#current-icon").attr("src=", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
            $("#temp").append("<div>" + data.current.temp + "</div>");
            $("#humidity").append("<div>" + data.current.humidity + "</div>");
            $("#wind-speed").append("<div>" + data.current.wind_speed + " mph" + "</div>");
            $("#uv-index").append("<div>" + data.current.uvi + "</div>");
    }
)}

