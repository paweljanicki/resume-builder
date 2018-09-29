import Split from 'split.js';
import { id } from '../utils';

const splitInstance = Split(['#html-editor', '#styles-editor'], {
  direction: 'vertical',
  gutterSize: 30,
  minSize: 0,
  gutter: () => {
    const gutter = id('styles-editor-header');
    return gutter;
  }
});

id('styles-editor-header').on('dblclick', () => {
  collapseEditor(0);
});

id('html-editor-header').on('dblclick', () => {
  collapseEditor(1);
});

function collapseEditor(index) {
  id('styles-editor').classList.add('transiton');
  id('html-editor').classList.add('transiton');
  splitInstance.collapse(index);
  setTimeout(() => {
    id('styles-editor').classList.remove('transiton');
    id('html-editor').classList.remove('transiton');
  }, 300);
}
