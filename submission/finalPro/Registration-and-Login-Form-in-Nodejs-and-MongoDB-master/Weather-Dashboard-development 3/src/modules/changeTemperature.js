import fetchWeatherData from './currentWeather/currentWeatherData';
import { createChart } from './forecast/chart';
import fetchForecast from './forecast/forecastData';
import convertTemperature from './tempConversion';

let temp = 'celsius';

const convertBtn = document.getElementById('temp-conversion');
convertBtn.textContent = '°F';

const removeElements = () => {
  document.getElementById('myChart').remove();
  const cellTemps = [...document.querySelectorAll('.cell-temp')];
  cellTemps.forEach((cell) => cell.remove());
};

const changeCurrentTemp = async () => {
  const { temperature, maxTemp, minTemp } = await fetchWeatherData();
  const currentTemp = document.getElementById('current-temp');
  currentTemp.textContent = convertTemperature(temperature, temp);

  const maximumTemp = document.getElementById('max-temp');
  maximumTemp.textContent = `Max: ${convertTemperature(maxTemp, temp)}`;

  const minimumTemp = document.getElementById('min-temp');
  minimumTemp.textContent = `Min: ${convertTemperature(minTemp, temp)}`;
};

const changeChartTemp = async () => {
  const xValues = [];
  const { dateArray } = await fetchForecast();
  const next24Hours = dateArray.slice(0, 9);
  const hoursArray = next24Hours.map((data) => data.dt_txt.split(' '));
  const hours = hoursArray.map((arr) => arr[1]);
  hours.map((hour) => xValues.push(hour));
  const newChart = document.createElement('canvas');
  newChart.setAttribute('id', 'myChart');
  document.getElementById('chart').appendChild(newChart);
  createChart(temp, next24Hours, xValues);
};

const changeCarouselTemp = async () => {
  const { temperatureArray } = await fetchForecast();
  const cellMaxTemp = [...document.querySelectorAll('.cell-description')];
  const cells = [...document.querySelectorAll('.slide')];
  for (let i = 0; i < temperatureArray.length; i += 1) {
    const cellTemperature = document.createElement('span');
    cellTemperature.setAttribute('class', 'cell-temp');
    cellTemperature.textContent = convertTemperature(temperatureArray[i], temp);
    cells[i].insertBefore(cellTemperature, cellMaxTemp[i]);
  }
};

convertBtn.addEventListener('click', (e) => {
  if (temp === 'celsius') {
    temp = 'fahrenheit';
    e.target.textContent = '°C';
  } else {
    temp = 'celsius';
    e.target.textContent = '°F';
  }
  removeElements();
  changeCurrentTemp();
  changeChartTemp();
  changeCarouselTemp();
});

export default convertTemperature;
