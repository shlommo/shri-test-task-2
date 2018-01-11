import hideOnClickOutside from './hideOnClickOutside';
import {addListenerMulti} from './helpers';

export default (calendarTriggerId, calendarId, classToAdd, classToBody) => {
  const calendarTrigger = document.getElementById(calendarTriggerId);
  const calendar = document.getElementById(calendarId);
  const body = document.querySelector('body');

  if (calendarTrigger === null) {
    return false;
  }

  const calendarOverlay = calendar.querySelector('.calendar__overlay')

  calendarTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (calendar.classList.contains(classToAdd)) {
      removeAction();
    } else {
      calendar.classList.add(classToAdd);
      body.classList.add(classToBody);
    }

    hideOnClickOutside('#'+calendarId, removeAction);

    addListenerMulti(calendarOverlay, 'click touchstart', removeAction);
  });

  const removeAction = () => {
    calendar.classList.remove(classToAdd);
    body.classList.remove(classToBody);
  };

  return true;
};
