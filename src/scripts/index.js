// General
import '../styles/style.scss';
import './editors';
import './preview/index';
import './pdf';

// Preview and PDF
import { setInitialPreviewScale } from './preview/preview';
import { stylesCodeMirror, htmlCodeMirror } from './editors/editors-codemirror';
import { preview } from './preview/preview-update';

export let page;
export let style;

window.onload = () => {
  page = preview.getElementById('page');
  style = preview.getElementById('style');

  setTimeout(() => {
    htmlCodeMirror.doc.setValue(localStorage.getItem('html'));
    stylesCodeMirror.doc.setValue(localStorage.getItem('css'));
  }, 0);
  setInitialPreviewScale();
  const loader = document.getElementById('loader');
  loader.classList.remove('loader-active');
  setTimeout(() => {
    loader.classList.add('loader-inactive');
  }, 300);
};
