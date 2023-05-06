import cities from 'cities.json';

const search = document.getElementById('search');
const results = document.getElementById('results');

const showOptions = (arr) => {
  if (arr.length > 0) {
    const html = arr
      .map(
        (match) => `
    <div class="selection">
      ${match.name}, ${match.country}
    </div>
    `,
      )
      .join('');
    results.style.display = 'flex';
    results.innerHTML = html;
  }
};

const setSearchValue = (selection) => {
  selection.addEventListener('click', () => {
    search.value = selection.textContent;
    search.focus();
    results.style.display = 'none';
  });
};

const selectOptions = () => {
  const selections = [...document.querySelectorAll('.selection')];
  selections.forEach((selection) => setSearchValue(selection));
};

const autoComplete = () => {
  const matches = cities.filter((data) => {
    const regex = new RegExp(`^${search.value}`, 'gi');
    return data.name.match(regex);
  });
  const limitedMatches = matches.slice(0, 10);
  showOptions(limitedMatches);
  if (search.value === '') {
    results.style.display = 'none';
  }
  if (results.style.display === 'flex') {
    document.body.addEventListener('click', () => {
      results.style.display = 'none';
    });
  }
  selectOptions();
};

export { autoComplete, search };
