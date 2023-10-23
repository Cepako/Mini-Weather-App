const apiKey = '23b4ac6eaeef656b0fff825e4db6784b';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const display = document.querySelector('.display');
const inputField = document.querySelector('.interface__input input');
const searchButton = document.querySelector('.interface__search');

async function weatherCheck(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
  if (response.status == 404) {
    alert("Wrong city name, can't find!!");
  } else if (response.status == 400) {
    alert('Fill in the field!!');
  } else if (response.status == 200) {
    const data = await response.json();
    display.classList.add('active');
    document.querySelector('.temperature').innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector(
      '.humidity p span'
    ).innerHTML = `${data.main.humidity}%`;
    document.querySelector(
      '.windSpeed p span'
    ).innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(
      '.display__foto'
    ).src = `./images/${data.weather[0].main.toLowerCase()}.png`;
  } else {
    alert('Lose internet connection!!');
  }
  inputField.value = '';
}
searchButton.addEventListener('click', () => {
  weatherCheck(inputField.value);
});
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') weatherCheck(inputField.value);
});
