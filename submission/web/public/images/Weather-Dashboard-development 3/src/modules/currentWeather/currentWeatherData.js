import fetchCityData from '../cityData';
import { weatherURL, appID } from '../apiURL';

const fetchWeatherData = async () => {
  const { lat, lon, country, name } = await fetchCityData();
  const response = await fetch(`${weatherURL}lat=${lat}&lon=${lon}${appID}`)
    .then((res) => res.json())
    .then((data) => {
      const { description } = data.weather[0];
      const windSpeed = data.wind.speed;
      const windDeg = data.wind.deg;
      const { humidity } = data.main;
      const temperature = data.main.temp;
      const { icon } = data.weather[0];
      const { pressure } = data.main;
      const clouds = data.clouds.all;
      const maxTemp = data.main.temp_max;
      const minTemp = data.main.temp_min;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const timezone = data.timezone;

      return {
        description,
        pressure,
        windSpeed,
        windDeg,
        humidity,
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
      };
    });
  return response;
};

export default fetchWeatherData;
