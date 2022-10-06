var APIKey = "2d1eeb2d03c02cc552ff916201158e58"
var city = "London"



// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&units=imeperial&appid=2d1eeb2d03c02cc552ff916201158e58
  
var localWeather = function(city) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
  .then(function(response){
    response.json().then(function(data) { 
    console.log(data)

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
    $("#today").append(localCardBody);
  });  
});
}


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
  // console.log(forecastObj);
      forecastArr.push(forecastObj);
  };
  // console.log(forecastArr);
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

forecast(city);
localWeather(city);

  
 