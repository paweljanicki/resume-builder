import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import './styles/style.scss';
import { createPdf } from './http';

const css = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true,
  lineWrapping: true,
  mode: "css"
});

const html = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true,
  lineWrapping: true,
  mode: "text/html"
});

const preview = document.getElementById("preview").contentWindow.document;
preview.open();
preview.writeln(`
<div id="page"></div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
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

const previewIframe = document.getElementById('preview');

function setPreviewScale(scale) {
  const previewWrapper = document.getElementById('preview-wrapper');

  previewIframe.style.transform = `scale(${scale})`;
  previewWrapper.style.height = `${previewWrapper.clientHeight * scale}px`;
}

function setInitialPreviewScale() {
  const previewIframe = document.getElementById('preview');

  const maxWidth = document.body.clientWidth / 2;

  if (previewIframe.clientWidth > maxWidth) {
    const scale = (maxWidth / previewIframe.clientWidth) * 0.9;
    setPreviewScale(scale);
  }
}
