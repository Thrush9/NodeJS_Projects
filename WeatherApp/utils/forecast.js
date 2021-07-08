const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const wsurl = `http://api.weatherstack.com/current?access_key=0bbb2e0ef12a44d76dc49fef7f5b78fa&query=${lat},${long}`;

  request({ url: wsurl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to Weather Stack Service', undefined);
    } else if (response.body.error) {
      callback('Unable to find Location', undefined);
    } else {
      const data = response.body.current;
      let info = `${data.weather_descriptions[0]} ::: It is currently ${data.temperature} degrees out there! It feels like ${data.feelslike} degrees out`;
      callback(undefined, info);
    }
  });
};

module.exports = forecast;
