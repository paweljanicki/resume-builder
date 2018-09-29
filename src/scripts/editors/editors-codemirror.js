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
import { id } from '../utils';

export const stylesCodeMirror = CodeMirror.fromTextArea(id('css'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'css',
  autoCloseTags: true,
  theme: 'material',
  keyMap: 'sublime',
  autoCloseBrackets: true,
  extraKeys: {'Ctrl-Space': 'autocomplete'},
  viewportMargin: 30
});

export const htmlCodeMirror = CodeMirror.fromTextArea(id('html'), {
  lineNumbers: true,
  lineWrapping: true,
  mode: 'htmlmixed',
  autoCloseTags: true,
  theme: 'material',
  keyMap: 'sublime',
  extraKeys: {'Ctrl-Space': 'autocomplete'},
  tabSize: 2,					// default already is 4
  indentWithTabs: true,		// default is false
  viewportMargin: 30
});
