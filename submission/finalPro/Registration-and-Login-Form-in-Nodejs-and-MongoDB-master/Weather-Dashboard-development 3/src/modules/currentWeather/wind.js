import fetchWeatherData from './currentWeatherData';

const estimateWindSpeed = (speed) => {
  let description;
  switch (true) {
    case 0:
      description = 'Calm';
      break;
    case speed >= 1 && speed <= 3:
      description = 'Light Air';
      break;
    case speed >= 4 && speed <= 7:
      description = 'Light Breeze';
      break;
    case speed >= 8 && speed <= 12:
      description = 'Gentle Breeze';
      break;
    case speed >= 13 && speed <= 18:
      description = 'Moderate Breeze';
      break;
    case speed >= 19 && speed <= 24:
      description = 'Fresh Breeze';
      break;
    case speed >= 25 && speed <= 31:
      description = 'Strong Breeze';
      break;
    case speed >= 32 && speed <= 38:
      description = 'Near Gale';
      break;
    case speed >= 39 && speed <= 46:
      description = 'Gale';
      break;
    case speed >= 47 && speed <= 54:
      description = 'Strong Gale';
      break;
    case speed >= 55 && speed <= 63:
      description = 'Whole Gale';
      break;
    case speed >= 64 && speed <= 75:
      description = 'Storm Force';
      break;
    case speed > 75:
      description = 'Hurricane Force';
      break;
    default:
      description = 'Calm';
      break;
  }
  return description;
};

const createWindInfo = async () => {
  const { windSpeed, windDeg } = await fetchWeatherData();
  const windDescription = document.getElementById('wind-description');
  windDescription.textContent = estimateWindSpeed(windSpeed);

  const windDegree = document.getElementById('deg');
  windDegree.textContent = `Degree: ${windDeg}`;

  const dailyWindSpeed = document.getElementById('speed');
  dailyWindSpeed.textContent = `Speed: ${windSpeed}mph`;
};

export default createWindInfo;
