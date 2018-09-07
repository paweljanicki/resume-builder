import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

const css = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true,
  mode: "css"
});

const html = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true,
  mode: "htmlmixed"
});

var code = document.getElementById("code").contentWindow.document;

document.getElementById('update-button').addEventListener('click', () => {
  code.open();
  code.writeln(
    html.doc.getValue() +
    "<style>" +
    css.doc.getValue() +
    "</style>"
  );
  code.close();
})