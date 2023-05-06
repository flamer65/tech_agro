const appID = `&appid=${process.env.API_KEY}`;
const cityURL = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const airPollutionURL =
  'https://api.openweathermap.org/data/2.5/air_pollution?';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?';

export { appID, cityURL, weatherURL, airPollutionURL, forecastURL };
