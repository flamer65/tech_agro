import fetchWeatherData from './currentWeatherData';

const getPressure = (inHg) => {
  let description;
  switch (true) {
    case inHg > 30.2:
      description = 'High';
      break;
    case inHg >= 29.8 && inHg <= 30.2:
      description = 'Normal';
      break;
    case inHg < 29.8:
      description = 'Low';
      break;
    default:
      description = 'Normal';
      break;
  }
  return description;
};

export const convertPressureToInchOfMercury = (pressure) => pressure * 0.02953;

const createPressureInfo = async () => {
  const { pressure } = await fetchWeatherData();
  const inchOfMercury = convertPressureToInchOfMercury(pressure);
  const pressureDescription = document.getElementById('pressure-description');
  pressureDescription.textContent = getPressure(inchOfMercury);

  const dailyPressure = document.getElementById('pressure');
  dailyPressure.textContent = `${pressure}hPa`;
};

export default createPressureInfo;
