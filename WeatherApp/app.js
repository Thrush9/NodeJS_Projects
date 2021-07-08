//weatherstack API key = 0bbb2e0ef12a44d76dc49fef7f5b78fa
//mapbox Acsess Token = pk.eyJ1IjoidGhydXNobmE5IiwiYSI6ImNrcWpiczA3MjAwdjMycW5zZjk0MWxtajcifQ.kdTov1v5UwY_Msk_RTPFjg

//const wsurl = 'http://api.weatherstack.com/current?access_key=0bbb2e0ef12a44d76dc49fef7f5b78fa&query=Hyderabad';
//const mburl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Hyderabad.json?access_token=pk.eyJ1IjoidGhydXNobmE5IiwiYSI6ImNrcWpiczA3MjAwdjMycW5zZjk0MWxtajcifQ.kdTov1v5UwY_Msk_RTPFjg&limit=1`;

// request({ url: mburl, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to MapBox Service');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find Location');
//   } else {
//     const data = response.body.features[0];
//     const latitude = data.center[1];
//     const longitude = data.center[0];
//     console.log(latitude, longitude);
//   }
// });

// request({ url: wsurl, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to Weather Stack Service');
//   } else if (response.body.error) {
//     console.log('Unable to find Loacation');
//   } else {
//     const data = response.body.current;
//     console.log(
//       `${data.weather_descriptions[0]} ::: It is currently ${data.temperature} degrees out there! It feels like ${data.feelslike} degrees out`
//     );
//   }
// });

////////////////////////////////////////////////

const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
  console.log('Please provide a Location');
} else {
  geocode(address, (error, data) => {
    if (error) {
      console.log('Error', error);
      return;
    }
    //console.log('Geo Data : ', data);
    const { latitude, longitude, location } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log('Error', error);
        return;
      }
      console.log(location);
      console.log('Forecast Data : ', forecastData);
    });
  });
}
