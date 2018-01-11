export default (containerId, callback) => {
  const outsideClickListener = (event) => {
    const elem = document.getElementById(containerId);
    const elemChildIsTarget = checkEventTarget(event, containerId);
    const clickCallback = callback || function () {};

    if (event.target !== elem && !elemChildIsTarget) {
      clickCallback();
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('touchstart', outsideClickListener);
  };

  document.addEventListener('touchstart', outsideClickListener);
};

function checkEventTarget(event, containerId) {
  const elem = document.getElementById(containerId);
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
      for (let j = 0; j < node.childNodes.length; j++) {
        const recuChildren = node.childNodes[j];
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
