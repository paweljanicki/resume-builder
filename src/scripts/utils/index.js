export function id(id) {
  const element = document.getElementById(id);

  element.click = function(callback) {
    element.addEventListener('click', event => {
      callback(event);
    });
  };

  element.on = function(eventType, callback) {
    element.addEventListener(eventType, event => {
      callback(event);
    });
  };

  return element;
}
