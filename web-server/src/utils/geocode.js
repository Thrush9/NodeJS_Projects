const request = require('postman-request');

const geocode = (address, callback) => {
  const mburl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGhydXNobmE5IiwiYSI6ImNrcWpiczA3MjAwdjMycW5zZjk0MWxtajcifQ.kdTov1v5UwY_Msk_RTPFjg&limit=1`;

  request({ url: mburl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to MapBox Service', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find Location', undefined);
    } else {
      const data = response.body.features[0];
      const latitude = data.center[1];
      const longitude = data.center[0];
      const location = data.place_name;
      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
