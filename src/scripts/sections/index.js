import { id } from '../utils';
import { aboutSection } from './about';
import { contactSection } from './contact';
import { getStartedContent } from './getStarted';

const sideSection = id('side-section');
const sideContent = id('side-content');

updateSideContent(window.location.hash);

window.onhashchange = event => {
  var hash = event.newURL.substring(event.newURL.indexOf('#'));
  updateSideContent(hash);
};

function updateSideContent(hash) {
  switch (hash) {
  case '#get-started':
    showSideContent(getStartedContent);
    break;

  case '#contact':
    showSideContent(contactSection);
    break;

  case '#about':
    showSideContent(aboutSection);
    break;

  default:
    hideSideContent();
  }
}

function showSideContent(content) {
  let timeout = 0;
  sideSection.classList.add('transition');
  if (sideSection.classList.contains('show-content')) {
    sideSection.classList.remove('show-content');
    timeout = 500;
  }
  setTimeout(() => {
    sideSection.classList.add('show-content');
    sideContent.innerHTML = content;
  }, timeout);
}

function hideSideContent() {
  sideSection.classList.remove('show-content');
  sideContent.innerHTML = '';
  window.location.hash = '';
}

id('side-section-close').click(() => {
  hideSideContent();
});
