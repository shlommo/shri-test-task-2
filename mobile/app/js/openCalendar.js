import hideOnClickOutside from './hideOnClickOutside';

export default (calendarTriggerId, calendarId, classToAdd, classToBody) => {
  const calendarTrigger = document.getElementById(calendarTriggerId);
  const calendarParent = document.getElementById(calendarId);
  const body = document.querySelector('body');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  if (calendarTrigger === null) {
    return false;
  }

  calendarTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (calendarParent.classList.contains(classToAdd)) {
      removeAction();
    } else {
      calendarParent.classList.add(classToAdd);
      body.appendChild(overlay);
      body.classList.add(classToBody);
    }

    hideOnClickOutside(calendarId, removeAction);
  });

  const removeAction = () => {
    calendarParent.classList.remove(classToAdd);
    body.removeChild(overlay);
    body.classList.remove(classToBody);
  };

  return true;
};
