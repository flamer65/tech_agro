import createWindInfo from './wind';
import createPressureInfo from './pressure';
import createAirQuality from './airQuality';
import createHumidity from './humidity';

const createDailyInfo = async () => {
  createWindInfo();
  createPressureInfo();
  createAirQuality();
  createHumidity();
};

export default createDailyInfo;
