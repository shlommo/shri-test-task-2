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

export {getCoords, getNodeFromMarkup};
