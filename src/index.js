import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import { createPdf } from './http';

const css = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true,
  mode: "css"
});

const html = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true,
  mode: "htmlmixed"
});

const code = document.getElementById("code").contentWindow.document;
code.open();
code.writeln(`
<div id="page"></div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
<style id="style"></style>
`);
code.close();

const page = code.getElementById('page');
const style = code.getElementById('style');

document.getElementById('update-button').addEventListener('click', () => {
  page.innerHTML = html.doc.getValue();
  style.innerHTML = css.doc.getValue();
})

document.getElementById('download-button').addEventListener('click', () => {
  createPdf(css.doc.getValue(), html.doc.getValue());
});

