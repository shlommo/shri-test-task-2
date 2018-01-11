const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const getNodeFromMarkup = (markupTemplate) => {
  const div = document.createElement('div');
  div.innerHTML = markupTemplate;
  return div.firstChild;
};

const getDay = (date) => { // получить номер дня недели, от 0(пн) до 6(вс)
  let day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
};

const addListenerMulti = (el, s, fn) => {
  s.split(' ').forEach((e) => {
    el.addEventListener(e, fn, false);
  });
};
const removeListenerMulti = (el, s, fn) => {
  s.split(' ').forEach((e) => {
    el.removeEventListener(e, fn, false);
  });
};

export {getCoords, getNodeFromMarkup, getDay, addListenerMulti, removeListenerMulti};
