import axios from 'axios';
import { createTemplate } from './template';

export const createPdf = (css, html) => {
  axios({
    url: '/pdf',
    method: 'PUT',
    headers: { 'content-type': 'text/html' },
    data: createTemplate(css, html),
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cv.pdf');
    document.body.appendChild(link);
    link.click();
  });
}