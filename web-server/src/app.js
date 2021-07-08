const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');

const partialsPath = path.join(__dirname, '../views/partials');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Thrush'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Thrush',
    version: '1.0.0'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Thrush',
    message: 'This is a Help Page'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    });
  }
  const address = req.query.address;
  geocode(address, (err, data) => {
    if (err) {
      console.log('Error', err);
      return res.send({ error: err });
    }
    const { latitude, longitude, location } = data;
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        console.log('Error', error);
        return res.send({ error: err });
      }

      console.log(location);
      console.log('Forecast Data : ', forecastData);

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
  // res.send({
  //   forecast: 'It is raining',
  //   location: 'Hyderabad',
  //   address: req.query.address
  // });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Not found',
    name: 'Thrush',
    errorMsg: 'Help Article Not Found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Not found',
    name: 'Thrush',
    errorMsg: 'Page Not Found'
  });
});

//Normal Response
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome To Express App</h1>');
// });

//JSON Response
// app.get('/help', (req, res) => {
//   //res.send('Help Page');
//   res.send({ name: 'Hero', field: 'Cinema' });
// });

//Using static Html pages
// app.get('/about', (req, res) => {
//   res.send('About Page');
// });

app.listen(3000, () => console.log('server is up on port 3000'));
