// creates variable from city search input
var searchedCity = $("#search-city").val();
// array for storing search history in local storage
// is either empty or, if a search history exists, consists of the items
// parsed from local storage array
var searchedCities = JSON.parse(localStorage.getItem("city")) || [];
// for loop to iterate through search history array
for (let i = 0; i < searchedCities.length; i++) {
    // for each element in search history array, a new li element is created 
    // the text content of each li is pulled from the element in the search history array
    var newLI = $("<li>")
    newLI.text(searchedCities[i]).val();
    // if an li is clicked, the text content of the li (a city name) is used to as the city to be searched for
    // enables weather to be displayed again on li click
    newLI.on("click", function (event){ 
        $("#search-city").val(event.target.textContent);
        search()
        })
    // appends new li element into search history DOM element
    $("#search-city-list").append(newLI);
}

// creates moment snapshot and displays in the format "July 5th, 2022"
var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY"));

// on search button clock, run search function
$("#search-button").on("click", search)

// search function
function search() {
    var searchedCity = $("#search-city").val();

    // for loop to iterate through search history in local storage
    var alreadyExist = false
    for (let i = 0; i < searchedCities.length; i++) {
       /* console.log(searchedCities[i]);
       console.log(searchedCity); */

        // if a new city searched matches an element in local storage, alreadyExist is true and nothing is done
        if (searchedCities[i] == searchedCity) {
           alreadyExist = true;
        }
    }
        // if a city does not already exist in the search history in local storage, pushes the city name into local storage array
        // and creates new li element in search history DOM element
        if (!alreadyExist) {
     searchedCities.push(searchedCity);
        var newLI = $("<li>")
        newLI.text(searchedCity)
        $("#search-city-list").append(newLI);
    }

    localStorage.setItem("city", JSON.stringify(searchedCities))

    /* console.log(searchedCity);
    console.log(searchedCities); */

    $("#searched-city").html("Current weather for " + searchedCity + " on " + (today.format("MMMM Do, YYYY")));

    // run getLatLon function for searched city
    getLatLon(searchedCity)
    
}

// function to get lat/lon
function getLatLon(searchedCity) {
    // requests lattitude and longitude for a given city
    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var latLonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${key}`;

    // pulls data from URL and returns the response as a json object
    fetch(latLonURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            /* console.log(data); */

            // for loop to return lat and lon data from response object
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

// function to get weather using lat / lon data
function getCurrentWeather(searchCityLat, searchCityLon) {
    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    // requests weather conditions for a given set of lattitude and longitude coordinates
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&units=imperial&alerts&appid=${key}`;
    // returns response as a json object
    fetch(weatherURL).then(function (response) {
        return response.json();})
        .then(function (data) {

            /* console.log(data); */
            /* console.log(data.daily[1]); */
            /* console.log(data.current); */

            // gets current icon code from response data
            var currentIcon = data.current.weather[0].icon
            // URL to display picture of corresponding icon code
            var currentIconURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
            /* console.log(currentIconURL); */
            
            // unhides #weather-container element
            $("#weather-container").removeClass("d-none");
            // the following five lines set the image source to the icon picture link,
            // sets the HTML text of #temp element to the temperature data (rounded down) retrieved from the response data,
            // sets the HTML text of #hunidity element to the humidity data retrieved from the response data,
            // sets the HTML text of the #wind-speed element to the wind speed data (rounded down) retrieved from the response data,
            // and sets the HTML text of the #uv-index element to the UVI data retrieved from the response data
            $("#current-icon").attr("src", currentIconURL);
            $("#temp").text(Math.floor(data.current.temp));
            $("#humidity").text(data.current.humidity);
            $("#wind-speed").text(Math.floor(data.current.wind_speed));
            $("#uv-index").text(data.current.uvi);

                // this series of if / else if / else statements change the background color of the 
                // #uv-index HTML element to correspond to different severity levels
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

// function to get future weather conditions from the search city lat / lon
function getFutureWeather(searchCityLat, searchCityLon) {
    $("#future-weather").empty();

    var key = "5d5fe60d12dae6eed2bd4a396bd88119";
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&units=imperial&alerts&appid=${key}`;
    // pulls weather data from URL and returns the response as a json object
    fetch(weatherURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            // retrieves weather data for elements one through five in the array (the five days following the current day)
            for (i = 1; i < 6; i++) {
            
            // creates variable for future date from UNIX timestamp
            var futureDate = moment.unix(data.daily[i].dt).format("MM/DD/YY")
            /* console.log(futureDate); */

            // sets future weather icons from for loop and retrieves the icon image links
            var futureIcon = data.daily[i].weather[0].icon
            var futureIconURL = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`;
            /* console.log(futureIcon); */
            
            // retrieves future weather temperate (rounded down) and humidity for each iteration through the for loop
            var futureTemp = Math.floor(data.daily[i].temp.day);
            /* console.log(futureTemp); */
            var futureHumidity = data.daily[i].humidity;
            /* console.log(futureHumidity); */
            
            // creates card, then appends future weather info to card for a given date, then appends card to card element;
            // this is done once for each iteration
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