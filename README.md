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

```

var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY"));

```

This code block creates var "today" from the moment() snapshot. It then locates id "currentDay" in the HTML and assigns var "today" in the format "July 1st, 2022" as text.

```

$(".saveBtn").on("click", function() {
    var calEvent = $(this).siblings("textarea").val();
    var calEventTime = $(this).siblings(".hour").text();
    // saves to localStorage
    localStorage.setItem(calEventTime, calEvent);
})

```

This code block looks for any click of a button with the class of "saveBtn". It then creates variable "calEvent" by traversing to the button's sibling with the element "textarea" and pulling the value (the entered text). It also creates variable "calEventTime" by traversing to the button's sibling with the class of "hour" and pulling the text in that div. Finally, it saves these two variables as a key and property in localStorage.

```

var realHour = moment().format("H");

$(".hour").each(function (){
    var currentHour = parseInt($(this).attr("id").split("hour-")[1]);

if (currentHour < realHour) {
    $(this).siblings(".description").addClass("past"); 
}

else if (currentHour == realHour) {
    $(this).siblings(".description").addClass("present");
}

else if (currentHour > realHour) {
    $(this).siblings(".description").addClass("future");
}
})

```

This code block first pulls the current hour from the moment() snapshot and creates a variable called "realHour". The function then loops over each instance of class "hour" in the HTML, traverses to its corresponding id, parses the id value (example: "hour-9"), and splits "hour-" from the id value. It creates an array of the numerical value in the id; returns index[1] (the numerical value). It then saves the returned index[1] to variable "currentHour".

If var "currentHour" is less than var "realHour", each instance of "currentHour" will turn red to indicate it is in the past.

If var "currentHour" is equal to var "realHour", the row will turn green to indicate it is the present hour.

If var "currentHour" is greater than var "realHour", each instance of "currentHour" will turn blue to indicate it is in the future.

Military time is used for the hour id's because of the way moment.js pulls hour data for PM hours.

```

$("#hour-9").siblings("textarea").text(localStorage.getItem("9 AM"));
$("#hour-10").siblings("textarea").text(localStorage.getItem("10 AM"));
$("#hour-11").siblings("textarea").text(localStorage.getItem("11 AM"));
$("#hour-12").siblings("textarea").text(localStorage.getItem("12 PM"));
$("#hour-13").siblings("textarea").text(localStorage.getItem("1 PM"));
$("#hour-14").siblings("textarea").text(localStorage.getItem("2 PM"));
$("#hour-15").siblings("textarea").text(localStorage.getItem("3 PM"));
$("#hour-16").siblings("textarea").text(localStorage.getItem("4 PM"));
$("#hour-17").siblings("textarea").text(localStorage.getItem("5 PM"));

```

This code block allows the entered data to persist in each field on page reload.  Each line locates a specific id (example: "#hour-9), traverses to the sibling with element "textarea", and loads the property (var "CalEvent") from the corresponding key (var "calEventTime") in localStorage.

Military time is used for the hour id's because of the way moment.js pulls hour data for PM hours.

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

## Credits

All coding credited to Phillip Besse.  Javascript pseudocoded with tutor Joe Young.

Websites Referenced:
* [jQuery - .text()](https://api.jquery.com/text/)
* [W3 Schools - jQuery event.target](https://www.w3schools.com/jquery/event_target.asp) (early versions of .js)
* [jQuery - event.target](https://api.jquery.com/event.target/) (early versions of .js)
* [jQuery - .each](https://api.jquery.com/each/)
* [moment.js - Display](https://momentjs.com/docs/#/displaying/)
* [jQuery - DOM Traversal](https://api.jquery.com/category/traversing/)
* [jQuery - .addClass](https://api.jquery.com/addclass/)
* [MDN Web Docs - split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
* [GeeksForGeeks - moment.hour() method](https://www.geeksforgeeks.org/moment-js-moment-hour-method/)
* [TechOnTheNet - split()](https://www.techonthenet.com/js/string_split.php)
* [MDN Web Docs - localStorage.getItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)



## License

Phillip Besse's Work Day Scheduler is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

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
