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

var key = "5d5fe60d12dae6eed2bd4a396bd88119"
var searchedCities = []

var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY"));

// Geocoding API
// http:// api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Parameters
// q	required	City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)
// limit	optional	Number of the locations in the API response (up to 5 results can be returned in the API response)

$("#search-button").on("click", function() {
    var searchedCity = $("#search-city").val();
    searchedCities.push(searchedCity);
    // need to somehow store multiple properties in array for single LS key
    localStorage.setItem("city", JSON.stringify(searchedCities))
    console.log(searchedCity);
    console.log(searchedCities);
    // need to append searchedCity to ul to #search-city-list
    $("#search-city-list").append("<li>" + searchedCity + "</li>");
    
    getLatLon()
})


function getLatLon() {
    /* var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&appid=" + key; */
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Boston&appid=5d5fe60d12dae6eed2bd4a396bd88119";

    fetch(requestURL).then(function (response) {
        console.log(response);
        return response.json();
    }
)}