var APIKey = "2d1eeb2d03c02cc552ff916201158e58"
var city = "London"



// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&units=imeperial&appid=2d1eeb2d03c02cc552ff916201158e58
  





var forecast = function(city) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`)
    .then(function(response) {
      response.json().then(function(data) {           
      var forecastArr = [];
  // storing weather data from api
  for (var i = 0; i < 5; i++) {
      date = new Date().toLocaleDateString('en-US');
      var forecastObj = {
          date: date,
          weather: data.list[i].weather[0].icon,
          temp: Math.round(data.list[i].main.temp),
          wind: data.list[i].wind.speed,
          humidity: data.list[i].main.humidity
      };
      console.log(forecastObj)
      forecastArr.push(forecastObj);
  };
  console.log(forecastArr);
 

  
   });
});
}

  forecast(city)

  
 