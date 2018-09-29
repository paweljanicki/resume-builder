import { basePreviewScale } from '../consts';
import { id } from '../utils';
import { htmlCodeMirror, stylesCodeMirror } from '../editors/editors-codemirror';
import { page, style} from '..';

const previewIframe = id('preview');
const scaleSelector = id('scale-selector');
let resizeTimeout;

function setPreviewScale(scale) {
  const previewWrapper = id('preview-wrapper');
  scale = scale * basePreviewScale;

  previewIframe.style.transform = `scale(${scale})`;
  previewWrapper.style.height = `${(previewIframe.clientHeight * scale) + 20}px`;
}

function setFitToWidthPreviewScale() {
  const maxWidth = (document.body.clientWidth / 2) - 25;
  const scale = (maxWidth / (previewIframe.clientWidth * basePreviewScale)) * 0.97;
  setPreviewScale(scale);
  scaleSelector.value = '1';
}

scaleSelector.onchange = event => {
  const value = parseInt(event.target.value);
  if (value === 1) {
    setFitToWidthPreviewScale();
  } else {
    setPreviewScale(value / 100);
  }
};

function isScaleEnabled(percentageScale, maxWidth) {
  percentageScale = parseInt(percentageScale);
  if ((percentageScale / 100) * (previewIframe.clientWidth * basePreviewScale) > maxWidth) {
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
  const maxWidth = (document.body.clientWidth / 2) - 25;
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
};

export function setInitialPreviewScale() {
  const maxWidth = (document.body.clientWidth / 2) - 25;
  disableToBigScaleValues(maxWidth);

  if ((previewIframe.clientWidth * basePreviewScale) > maxWidth) {
    setFitToWidthPreviewScale();
  } else {
    setPreviewScale(1);
    scaleSelector.value = '100';
  }
}

id('update-button').click(() => {
  updatePreview();
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    updatePreview();
  }
}, false);

function updatePreview() {
  const htmlValue = htmlCodeMirror.doc.getValue();
  const cssValue = stylesCodeMirror.doc.getValue();

  page.innerHTML = htmlValue;
  style.innerHTML = cssValue;

  localStorage.setItem('html', htmlValue);
  localStorage.setItem('css', cssValue);
}
