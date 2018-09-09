import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import './styles/style.scss';
import { createPdf } from './http';
import { defaultStyles } from './template';
import './preview';
import { setInitialPreviewScale } from './preview';

const css = CodeMirror.fromTextArea(document.getElementById('css'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'css'
});

const html = CodeMirror.fromTextArea(document.getElementById('html'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'text/html'
});

const preview = document.getElementById('preview').contentWindow.document;
preview.open();
preview.writeln(`
  <div id="page"></div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
  <style>${defaultStyles}</style>
  <style id="style"></style>
`);
preview.close();

const page = preview.getElementById('page');
const style = preview.getElementById('style');

document.getElementById('update-button').addEventListener('click', () => {
  const htmlValue = html.doc.getValue();
  const cssValue = css.doc.getValue();

  page.innerHTML = htmlValue;
  style.innerHTML = cssValue;

  localStorage.setItem('html', htmlValue);
  localStorage.setItem('css', cssValue);
})

document.getElementById('download-button').addEventListener('click', () => {
  createPdf(css.doc.getValue(), html.doc.getValue());
});

window.onload = () => {
  html.doc.setValue(localStorage.getItem('html'));
  css.doc.setValue(localStorage.getItem('css'));
  setInitialPreviewScale();
  const loader = document.getElementById('loader');
  loader.classList.remove('loader-active')
  setTimeout(() => {
    loader.classList.add('loader-inactive')
  }, 300);
}
