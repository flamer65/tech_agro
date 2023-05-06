import fetchWeatherData from './currentWeatherData';

const createHumidity = async () => {
  const { humidity } = await fetchWeatherData();

  const dailyHumidity = document.getElementById('humidity');
  dailyHumidity.textContent = `${humidity}%`;
};

export default createHumidity;
