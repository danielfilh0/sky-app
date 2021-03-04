const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.querySelector('.btn-search');
const temp = document.getElementById('temperature');
const date = document.querySelector('.current-date');
const weatherDescr = document.getElementById('description');
const locale = document.getElementById('locale');
const language = 'pt-br';
const maxToday = document.querySelector('.box-forecast div span.max');
const minToday = document.querySelector('.box-forecast div span.min');

searchLocation('Fortaleza');

function main() {
  displayDate(date);
  btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputSearch.value != false || inputSearch.value != '') {
      searchLocation(inputSearch.value);
    }
  });
}

function searchLocation(location) {
  const apiKey = '0d571b1017b8214d63acaf9778ec017b';
  const weatherFetch = fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&lang=pt_br&units=metric&appid=${apiKey}`,
  );
  const forecastFetch = fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=pt_br&units=metric&appid=${apiKey}`,
  );

  weatherFetch
    .then((r) => r.json())
    .then((body) => {
      console.log(body);
      showDOM(temp, `${Math.round(body.main.temp)}ºC`);
      showDOM(weatherDescr, body.weather[0].description);
      showDOM(locale, body.name);
      showDOM(maxToday, `${Math.round(body.main.temp_max)}ºC`);
      showDOM(minToday, `${Math.round(body.main.temp_min)}ºC`);
    });

  forecastFetch
    .then((r) => r.json())
    .then((body) => {
      console.log(body);
    });
}

function showDOM(elementDOM, value) {
  elementDOM.innerText = value;
}

function formatDate() {
  return currentDate().toLocaleDateString(language, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function displayDate(date) {
  date.innerText = formatDate();
}

function currentDate() {
  return new Date();
}

main();
