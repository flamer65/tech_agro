import { cityURL, appID } from './apiURL';
import { search, autoComplete } from './autocomplete';
import loadContents from './loadContents';

const searchIcon = document.getElementById('search-icon');
const errorMsg = document.getElementById('error');
const mainSection = document.querySelector('main');
let city = JSON.parse(localStorage.getItem('city')) || 'London';

const removeError = () => {
  if (mainSection.style.display === 'none') {
    mainSection.style.display = 'flex';
    errorMsg.style.display = 'none';
    console.clear();
  }
};

const setNewData = () => {
  city = search.value.trim();
  localStorage.setItem('city', JSON.stringify(city));
  const cells = [...document.querySelectorAll('.slide')];
  cells.forEach((cell) => (cell.innerHTML = ''));
};

search.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (search.value === '') {
      return;
    }
    removeError();
    setNewData();
    loadContents();
    search.value = '';
  } else {
    autoComplete();
  }
});

searchIcon.addEventListener('click', () => {
  if (search.value === '') {
    return;
  }
  removeError();
  setNewData();
  loadContents();
  search.value = '';
});

const fetchCityData = async () => {
  const response = await fetch(`${cityURL}${city}${appID}`)
    .then((res) => res.json())
    .then((data) => {
      const { lat, lon, country, name } = data[0];
      return {
        lat,
        lon,
        country,
        name,
      };
    })
    .catch(() => {
      errorMsg.style.display = 'block';
      mainSection.style.display = 'none';
      document.body.style.justifyContent = 'flex-start';
    });
  return response;
};

export default fetchCityData;
