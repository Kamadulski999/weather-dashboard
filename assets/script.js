var APIKey = "2d1eeb2d03c02cc552ff916201158e58"
var cityArray = []
var cityStore = JSON.parse(localStorage.getItem("cities")) || []

console.log(cityStore)

// gets localeStorage and makes API call to first city in list
var loadPage = function() {
  getStore();
  console.log("This is form loadPage function  " + cityStore)
}

var setStore = function(city, cityStore) {
  console.log(cityStore)
  cityStore.push(city)  
  // console.log(cityStore)
  localStorage.setItem("cities", JSON.stringify(cityStore))
}

var getStore = function() {
  var cityStore = localStorage.getItem("cities")
  return cityStore
}


// this function searches an array to see if a string exists
const searchStringInArray = function (str, strArray) {
  for (var j=0; j<strArray.length; j++) {
      if (strArray[j].match(str)) return j;
  }
  return -1;  
}

// checks cityArray to see is search term already exists in our list (https://stackoverflow.com/questions/5424488/how-to-search-for-a-string-inside-an-array-of-strings)
const checkList = function (city, cityArray) { 
  const check = searchStringInArray(city,cityArray)

  if (check === -1) {
    cityArray.push(city)
    addCity(city)
    setStore(city, cityStore)
    console.log(city)
    } 
     
  }


// click handler for previous searched cities list
$(".history").on("click", "li", function() {
  var listCity = ($(this).text());  
  localWeather(listCity);
  forecast(listCity);
  getStore();
})

// click event handler for submit button
$("#search-button").on("click", function () {  
  var city = $("#search-value").val();   
  $("#search-value").val(""); 
  localWeather(city);
  forecast(city);
});

// event handler for enter button in input field 
$("#search-value").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#search-button").click();
  }
});


// add city to list of previously searched
var addCity = function(city) {
  var cityList = $("<li>").addClass("list-group-item").text(city);
  $(".history").append(cityList)    
}


// local weather report
var localWeather = function(city) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
  .then(function(response){
    response.json().then(function(data) {     
    date = new Date().toLocaleDateString('en-US');
    var localCard = $("<div>").addClass("card");
    var localCardBody = $("<div>").addClass("card bg-primary text-white");
    var localTitle = $("<h3>").addClass("card-title").text(data.name + " " + date);
    var localImg = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    var localWind = $("<p>").addClass("card-text").text("Wind Speed: " + Math.round(data.wind.speed) + " MPH");
    var localHumid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
    var localTemp = $("<p>").addClass("card-text").text("Temperature: " + Math.round(data.main.temp) + " F");

    localTitle.append(localImg)
    localCardBody.append(localTitle, localTemp, localHumid, localWind)
    localCard.append(localCardBody)   
    $("#today").empty().append(localCardBody);

    checkList(data.name,cityStore)
   
  });  
    
});
}

// five day forecast
var forecast = function(city) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`)
    .then(function(response) {
      response.json().then(function(data) {           
      var forecastArr = [];
  // storing weather data from api
  for (var i = 0; i < 5; i++) {
      var date = new Date()
      var day = new Date().getDay()      
      date.setUTCDate(day + i)
      formatDate = new Date(date).toLocaleDateString('en-us') 
      var forecastObj = {
          date: formatDate,
          weather: data.list[i].weather[0].icon,
          temp: Math.round(data.list[i].main.temp),
          wind: Math.round(data.list[i].wind.speed),
          humidity: data.list[i].main.humidity
      };
       forecastArr.push(forecastObj);
  };
  $("#forecast").empty();
  for (var j = 0; j < forecastArr.length; j++) {
    var cardColumn = $("<div>").addClass("col-md-2.5"); 
    var card = $("<div>").addClass("card bg-primary text-white");
    var cardBody = $("<div>").addClass("card-body p-2");    
    var cardTitle = $("<h3>").addClass("card-title").text(forecastArr[j].date)
    var cardImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastArr[j].weather + "@2x.png")
    var cardTemp = $("<p>").addClass("card-text").text("Temperature: " + forecastArr[j].temp + " °F");
    var cardHumid = $("<p>").addClass("card-text").text("Humidity: " + forecastArr[j].humidity + "%");            
   
    cardBody.append(cardTitle, cardImage, cardTemp, cardHumid);
    card.append(cardBody); 
    cardColumn.append(card);     
    $("#forecast").append(cardColumn)  
     }   
   });
  });
}



  
 