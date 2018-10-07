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
  }).then(response => {
    removePopup();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
  }).catch(() => {
    createPopup({
      content: 'Sorry an error occured. Please try again',
      error: true,
      close: true
    });
  });
};

id('download-button').click(() => {
  createPopup({
    content: '<div class="lds-hourglass"></div><p>Your resume is being generated. Hold on..</p>'
  });
  createPdf(stylesCodeMirror.doc.getValue(), htmlCodeMirror.doc.getValue());
});

function createPopup(config) {
  if (id('popup')) {
    removePopup();
  }
  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.innerHTML = config.content;

  if (config.error) {
    popup.classList.add('error');
  }
  if (config.close) {
    const close = document.createElement('span');
    close.classList.add('popup-close');
    close.innerHTML = '<i class="fas fa-times"></i>';
    close.addEventListener('click', () => {
      removePopup();
    });
    popup.appendChild(close);
  }

  document.body.appendChild(popup);
}

function removePopup() {
  document.body.removeChild(id('popup'));
}
