// General
import './styles/style.scss';
import Split from 'split.js';

// CodeMirror
import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/theme/material.css';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/mode/xml/xml';

// Preview and PDF
import { createPdf } from './http';
import { defaultStyles } from './template';
import './preview';
import { setInitialPreviewScale } from './preview';

const css = CodeMirror.fromTextArea(document.getElementById('css'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'css',
  autoCloseTags: true,
  theme: 'material',
  keyMap: 'sublime',
  autoCloseBrackets: true,
  extraKeys: {"Ctrl-Space": "autocomplete"},
  viewportMargin: 30
});

const html = CodeMirror.fromTextArea(document.getElementById('html'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'htmlmixed',
  autoCloseTags: true,
  theme: 'material',
  keyMap: 'sublime',
  extraKeys: {"Ctrl-Space": "autocomplete"},
	tabSize: 2,					// default already is 4
  indentWithTabs: true,		// default is false
  viewportMargin: 30
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
  updatePreview();
});

document.getElementById('download-button').addEventListener('click', () => {
  createPdf(css.doc.getValue(), html.doc.getValue());
});

window.onload = () => {
  setTimeout(() => {
    html.doc.setValue(localStorage.getItem('html'));
    css.doc.setValue(localStorage.getItem('css'));
  }, 0);
  setInitialPreviewScale();
  const loader = document.getElementById('loader');
  loader.classList.remove('loader-active')
  setTimeout(() => {
    loader.classList.add('loader-inactive')
  }, 300);
};

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    updatePreview();
  }
}, false);

function updatePreview() {
  const htmlValue = html.doc.getValue();
  const cssValue = css.doc.getValue();

  page.innerHTML = htmlValue;
  style.innerHTML = cssValue;

  localStorage.setItem('html', htmlValue);
  localStorage.setItem('css', cssValue);
}

const splitInstance = Split(['#html-editor', '#styles-editor'], {
  direction: 'vertical',
  gutterSize: 30,
  minSize: 0,
  gutter: () => {
    const gutter = document.getElementById('styles-editor-header');
    return gutter;
  }
});

document.getElementById('styles-editor-header').addEventListener('dblclick', event => {
  collapseEditor(0);
});

document.getElementById('html-editor-header').addEventListener('click', event => {
  collapseEditor(1);
});

function collapseEditor(index) {
  document.getElementById('styles-editor').classList.add('transiton');
  document.getElementById('html-editor').classList.add('transiton');
  splitInstance.collapse(index);
  setTimeout(() => {
    document.getElementById('styles-editor').classList.remove('transiton');
    document.getElementById('html-editor').classList.remove('transiton');
  }, 300);
}
