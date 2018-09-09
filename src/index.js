import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import './styles/style.scss';
import { createPdf } from './http';
import { defaultStyles } from './template';

let resizeTimeout;

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

const previewIframe = document.getElementById('preview');
const scaleSelector = document.getElementById('scale-selector');
const scaleValues = ['50', '60', '70', '80', '90', '100', '1'];

function setPreviewScale(scale) {
  const previewWrapper = document.getElementById('preview-wrapper');

  previewIframe.style.transform = `scale(${scale})`;
  previewWrapper.style.height = `${(previewIframe.clientHeight * scale) + 40}px`;
}

function setInitialPreviewScale() {
  const maxWidth = document.body.clientWidth / 2;
  disableToBigScaleValues(maxWidth)

  if (previewIframe.clientWidth > maxWidth) {
    setFitToWidthPreviewScale();
  } else {
    scaleSelector.value = '100';
  }
}

function setFitToWidthPreviewScale() {
  const maxWidth = document.body.clientWidth / 2;
  const scale = (maxWidth / previewIframe.clientWidth) * 0.97;
  setPreviewScale(scale);
  scaleSelector.value = '1';
}

scaleSelector.onchange = event => {
  const value = parseInt(event.target.value);
  if (value === 1) {
    setFitToWidthPreviewScale()
  } else {
    setPreviewScale(value / 100);
  }
}

function isScaleEnabled(percentageScale, maxWidth) {
  percentageScale = parseInt(percentageScale);
  if ((percentageScale / 100) * previewIframe.clientWidth > maxWidth) {
    return false;
  } else {
    return true;
  }
}

function disableToBigScaleValues(maxWidth) {
  Array.from(scaleSelector.getElementsByTagName('option')).forEach(element => {
    if (isScaleEnabled(element.value, maxWidth)) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  });
}

function onResize() {
  const maxWidth = document.body.clientWidth / 2;
  disableToBigScaleValues(maxWidth);

  if (scaleSelector.value === '1' || !isScaleEnabled(scaleSelector.value, maxWidth)) {
    setFitToWidthPreviewScale();
  }
}

window.onresize = () => {
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      onResize();
      resizeTimeout = null;
    }, 16.6);
  }
}
