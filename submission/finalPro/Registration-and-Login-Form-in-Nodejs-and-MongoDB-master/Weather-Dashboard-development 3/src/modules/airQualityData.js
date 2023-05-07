import fetchCityData from './cityData';
import { airPollutionURL, appID } from './apiURL';

const fetchAirPollutionData = async () => {
  const { lat, lon } = await fetchCityData();
  const response = await fetch(
    `${airPollutionURL}lat=${lat}&lon=${lon}${appID}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const airQuality = data.list[0].main.aqi;
      const carbonMonoxide = data.list[0].components.co;
      const nitrogenMonoxide = data.list[0].components.no;
      const nitrogenDioxide = data.list[0].components.no2;
      return {
        airQuality,
        carbonMonoxide,
        nitrogenMonoxide,
        nitrogenDioxide,
      };
    });
  return response;
};

export default fetchAirPollutionData;
