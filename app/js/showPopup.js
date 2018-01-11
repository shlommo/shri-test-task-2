export default (popupId, popupTriggerId) => {
  const popupTrigger = document.getElementById(popupTriggerId);
  const popup = document.getElementById(popupId);
  const body = document.querySelector('body');
  const closeTrigger = body.querySelector('[data-close]');

  if (popupTrigger === null) {
    return false;
  }

  popupTrigger.addEventListener('click', (event) => {
    event.preventDefault();

    body.classList.add('modal-is-opened');
    popup.classList.add('opened');
  });

  closeTrigger.addEventListener('click', (event) => {
    event.preventDefault();

    closePopup(popupId);
  });

  return true;
};

function closePopup(popupId) {
  const body = document.querySelector('body');
  const popup = document.getElementById(popupId);

  body.classList.remove('modal-is-opened');
  popup.classList.remove('opened');
}
