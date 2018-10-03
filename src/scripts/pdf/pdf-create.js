import axios from 'axios';
import { stylesCodeMirror, htmlCodeMirror } from '../editors/editors-codemirror';
import { id } from '../utils';

export const createPdf = (css, html) => {
  axios({
    url: '/pdf',
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    data: {css, html},
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cv.pdf');
    document.body.appendChild(link);
    link.click();
  });
};

id('download-button').click(() => {
  createPdf(stylesCodeMirror.doc.getValue(), htmlCodeMirror.doc.getValue());
});
