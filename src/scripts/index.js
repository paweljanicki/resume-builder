// General
import '../styles/style.scss';
import './editors';
import './preview/index';
import './pdf';
import './sections';

// Preview and PDF
import { setInitialPreviewScale, updatePreview } from './preview/preview';
import { stylesCodeMirror, htmlCodeMirror } from './editors/editors-codemirror';
import { preview } from './preview/preview-update';
import { id } from './utils';
import { defaultHtml, defaultCss } from './editors/editors-defaults';
import { mobileNoteContent } from './sections/mobileNote';

export let page;
export let style;

window.onload = () => {
  page = preview.getElementById('page');
  style = preview.getElementById('style');

  setTimeout(() => {
    const htmlValue = localStorage.getItem('html') ? localStorage.getItem('html') : defaultHtml;
    const cssValue = localStorage.getItem('css') ? localStorage.getItem('css') : defaultCss;

    htmlCodeMirror.doc.setValue(htmlValue);
    stylesCodeMirror.doc.setValue(cssValue);

    updatePreview();
  }, 0);
  setInitialPreviewScale();
  const loader = id('loader');
  loader.classList.remove('loader-active');
  setTimeout(() => {
    loader.classList.add('loader-inactive');
  }, 300);

  if(document.body.clientWidth < 1024) {
    id('mobile-note').innerHTML = mobileNoteContent;
  }
};

// if (localStorage.getItem('cookies-note') === 'accepted') {
//   id('cookies-note').classList.add('hide-cookies');
// }

// id('decline-cookies').click(() => {
//   if (confirm('You will loose all your progress, are you sure?')) {
//     window.localStorage.clear();
//     window.location.href = 'https://www.google.com/';
//   }
// });

// id('accept-cookies').click(() => {
//   id('cookies-note').classList.add('hide-cookies');
//   localStorage.setItem('cookies-note', 'accepted');
// });

if (localStorage.getItem('cookies-note') === 'accepted') {
  hideEntryContent();
}

id('get-started').click(() => {
  hideEntryContent();
});

function hideEntryContent() {
  localStorage.setItem('cookies-note', 'accepted');
  id('entry-content').classList.add('hide');
}
