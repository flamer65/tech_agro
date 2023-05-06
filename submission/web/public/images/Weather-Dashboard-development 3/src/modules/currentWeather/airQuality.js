import fetchAirPollutionData from '../airQualityData';

const getAirQuality = (data) => {
  let qualityOfAir = '';
  switch (data) {
    case 1:
      qualityOfAir = 'Good';
      break;
    case 2:
      qualityOfAir = 'Fair';
      break;
    case 3:
      qualityOfAir = 'Moderate';
      break;
    case 4:
      qualityOfAir = 'Poor';
      break;
    case 5:
      qualityOfAir = 'Very Poor';
      break;
    default:
      qualityOfAir = 'Good';
      break;
  }
  return qualityOfAir;
};

const createAirQuality = async () => {
  const { airQuality, carbonMonoxide, nitrogenMonoxide, nitrogenDioxide } =
    await fetchAirPollutionData();
  const quality = document.getElementById('quality');
  quality.textContent = getAirQuality(airQuality);

  const carbonMonoxideAmount = document.getElementById('carbon-monoxide');
  carbonMonoxideAmount.innerHTML = `CO: ${carbonMonoxide} μg/m<sup>3</sup>`;

  const nitrogenMonoxideAmount = document.getElementById('nitrogen-monoxide');
  nitrogenMonoxideAmount.innerHTML = `NO: ${nitrogenMonoxide} μg/m<sup>3</sup>`;

  const nitrogenDioxideAmount = document.getElementById('nitrogen-dioxide');
  nitrogenDioxideAmount.innerHTML = `NO<sub>2</sub>: ${nitrogenDioxide} μg/m<sup>3</sup>`;
};

export default createAirQuality;
