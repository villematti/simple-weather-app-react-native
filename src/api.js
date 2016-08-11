import _ from 'lodash';
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?&type=accurate&units=metric&lang=fi&APPID=eb97980c15803b4c8b8643b6af2009f6'

var kelvinToC = function(kelvin) {
  return Math.round(kelvin) + ' °C'
}

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  console.log(url);

  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json)
      return {
        city: json.name,
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    })
}
