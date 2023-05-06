import moment from 'moment/moment';
import fetchWeatherData from '../currentWeather/currentWeatherData';

const currentDay = moment().format('dddd');

const createDate = () => {
  const currentDate = moment().format('MMMM Do YYYY');
  const date = document.getElementById('current-date');
  date.textContent = currentDate;
};

export const convertUnixTime = (num, timezone) => {
  const unixTime = moment.unix(num);
  const currCityTime = moment(timezone * 1000);
  const newTime = moment(unixTime + currCityTime)
    .utc()
    .format('LT');

  return newTime;
};

const createTime = async () => {
  const { timezone } = await fetchWeatherData();
  const date = new Date(new Date().getTime() + timezone * 1000);
  const formattedTime = moment(date.toISOString()).utc().format('LT');
  const time = document.getElementById('current-time');
  time.textContent = formattedTime;
};

setInterval(createTime, 1000);

createDate();

export default currentDay;
