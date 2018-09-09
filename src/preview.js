import { basePreviewScale } from './consts';

const previewIframe = document.getElementById('preview');
const scaleSelector = document.getElementById('scale-selector');
let resizeTimeout;

function setPreviewScale(scale) {
  const previewWrapper = document.getElementById('preview-wrapper');
  scale = scale * basePreviewScale;

  previewIframe.style.transform = `scale(${scale})`;
  previewWrapper.style.height = `${(previewIframe.clientHeight * scale) + 40}px`;
}

function setFitToWidthPreviewScale() {
  const maxWidth = document.body.clientWidth / 2;
  const scale = (maxWidth / (previewIframe.clientWidth * basePreviewScale)) * 0.97;
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

export function setInitialPreviewScale() {
  const maxWidth = document.body.clientWidth / 2;
  disableToBigScaleValues(maxWidth);

  if ((previewIframe.clientWidth * basePreviewScale) > maxWidth) {
    setFitToWidthPreviewScale();
  } else {
    setPreviewScale(1);
    scaleSelector.value = '100';
  }
}