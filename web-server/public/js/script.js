console.log('Script Js is loaded!');

// fetch('http://puzzle.mead.io/puzzle')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';

const fetchData = (search) => {
  fetch(`http://localhost:3000/weather?address=${search}`).then((res) => {
    res.json().then((data) => {
      if (data.error) messageOne.textContent = data.error;
      else {
        messageOne.textContent = 'Location : ' + data.location;
        messageTwo.textContent = 'Forecast : ' + data.forecast;
      }
    });
  });
};

weatherForm.addEventListener('submit', (e) => {
  fetchData(search.value);
  e.preventDefault();
});
