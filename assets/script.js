var APIKey = "2d1eeb2d03c02cc552ff916201158e58"

// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&units=imeperial&appid=2d1eeb2d03c02cc552ff916201158e58
  





var forecast = function() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIKey}`).then(data => {
      console.log(data.json());
      })
    
  };

  forecast()

  
 