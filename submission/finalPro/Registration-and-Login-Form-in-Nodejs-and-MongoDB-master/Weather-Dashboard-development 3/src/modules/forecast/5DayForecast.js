import fetchForecast from './forecastData';
import convertTemperature from '../changeTemperature';

const createForecast = async (temp) => {
  const { descriptionArray, iconArray, temperatureArray, dateArray } =
    await fetchForecast();
  const cells = [...document.querySelectorAll('.slide')];

  for (let i = 0; i < cells.length; i += 1) {
    let weatherIcon;

    if (document.body.className === '') {
      weatherIcon = `light/${iconArray[i]}.png`;
    } else {
      weatherIcon = `dark/${iconArray[i]}.png`;
    }

    const dayIcon = document.createElement('img');
    dayIcon.setAttribute('class', 'day-icon');
    dayIcon.src = weatherIcon;

    const temperature = document.createElement('span');
    temperature.setAttribute('class', 'cell-temp');
    temperature.textContent = convertTemperature(temperatureArray[i], temp);

    const weatherDescription = document.createElement('span');
    weatherDescription.setAttribute('class', 'cell-description');
    const capitalLetter = descriptionArray[i].charAt(0).toUpperCase();
    const restOfString = descriptionArray[i].slice(1);
    weatherDescription.textContent = `${capitalLetter}${restOfString}`;

    const day = document.createElement('span');
    day.setAttribute('class', 'italic');
    const hour = document.createElement('span');
    hour.setAttribute('class', 'italic');
    const hoursAndDateArray = dateArray.map((data) => data.dt_txt.split(' '));
    day.textContent = `${hoursAndDateArray[i][0]}`;
    hour.textContent = `${hoursAndDateArray[i][1]}`;

    cells[i].appendChild(dayIcon);
    cells[i].appendChild(temperature);
    cells[i].appendChild(weatherDescription);
    cells[i].appendChild(day);
    cells[i].appendChild(hour);
  }
};

export default createForecast;
