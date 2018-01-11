import {addListenerMulti, removeListenerMulti} from './helpers';

export default (selector, callback) => {
  const outsideClickListener = (event) => {
    const elem = document.querySelector(selector);
    const elemChildIsTarget = checkEventTarget(event, selector);
    const clickCallback = callback || function () {};

    if (event.target !== elem && !elemChildIsTarget) {
      clickCallback();
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    removeListenerMulti(document, 'click touchstart', outsideClickListener);
  };

  addListenerMulti(document, 'click touchstart', outsideClickListener);
};

function checkEventTarget(event, selector) {
  const elem = document.querySelector(selector);
  let isTarget = false;

  for (let i = 0; i < elem.childNodes.length; i++) {
    const children = elem.childNodes[i];

    if (event.target === children) {
      isTarget = true;
      return isTarget;
    } else {
      checkNode(children);
    }
  }

  function checkNode(node) {
    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const recuChildren = node.childNodes[i];
        if (event.target === node) {
          isTarget = true;
          return true;
        }
        checkNode(recuChildren);
      }
    } else if (event.target === node) {
      isTarget = true;
      return true;
    } else {
      return false;
    }
    return true;
  }
  return isTarget;
}
