import fetchWeatherData from './currentWeatherData';
import convertTemperature from '../tempConversion';
import currentDay from '../forecast/date';
import { convertUnixTime } from '../forecast/date';

const createCurrentWeather = async (temp) => {
  const {
    description,
    temperature,
    icon,
    name,
    country,
    lat,
    lon,
    clouds,
    maxTemp,
    minTemp,
    sunrise,
    sunset,
    timezone,
  } = await fetchWeatherData();

  let weatherIcon;
  let cloudIcon;

  if (document.body.className === '') {
    weatherIcon = `light/${icon}.png`;
    cloudIcon = 'light/04d.png';
  } else {
    weatherIcon = `dark/${icon}.png`;
    cloudIcon = 'dark/04d.png';
  }

  const cloudiness = document.getElementById('cloudiness');
  cloudiness.textContent = `Cloudiness: ${clouds}%`;

  const maximumTemp = document.getElementById('max-temp');
  maximumTemp.textContent = `Max: ${convertTemperature(maxTemp, temp)}`;

  const minimumTemp = document.getElementById('min-temp');
  minimumTemp.textContent = `Min: ${convertTemperature(minTemp, temp)}`;

  const sunriseTime = document.getElementById('sunrise');
  sunriseTime.textContent = `Sunrise: ${convertUnixTime(sunrise, timezone)}`;

  const sunsetTime = document.getElementById('sunset');
  sunsetTime.textContent = `Sunset: ${convertUnixTime(sunset, timezone)}`;

  const location = document.getElementById('location');
  location.textContent = `${name}, ${country}`;

  const latitude = document.getElementById('lat');
  latitude.textContent = `Latitude: ${lat}`;

  const longitude = document.getElementById('lon');
  longitude.textContent = `Longitude: ${lon}`;

  const day = document.getElementById('current-day');
  day.textContent = currentDay;

  const currentTemp = document.getElementById('current-temp');
  currentTemp.textContent = convertTemperature(temperature, temp);

  const currentDescription = document.getElementById('description');
  const capitalLetter = description.charAt(0).toUpperCase();
  const restOfString = description.slice(1);
  currentDescription.textContent = `${capitalLetter}${restOfString}`;

  const currentIcon = document.getElementById('current-weather-icon');
  currentIcon.src = weatherIcon;

  const cloudinessIcon = document.getElementById('cloud-icon');
  cloudinessIcon.src = cloudIcon;
};

export default createCurrentWeather;
