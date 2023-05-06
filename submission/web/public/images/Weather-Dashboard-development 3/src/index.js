import './styles/style.css';
import loadContents from './modules/loadContents';

const displayContents = () => {
  document.body.style.display = 'flex';
};

window.onload = () => {
  setTimeout(displayContents, 500);
  loadContents();
};
