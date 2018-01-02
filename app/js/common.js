import createSvgSprite from './createSvgSprite';
import Flatpickr from 'flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js";

createSvgSprite();

const today = new Date();
const afterThirtyMinutes = new Date(today.getTime() + 30 * 60 * 1000);
const eventDate = new Flatpickr('#date', {
  locale: Russian,
  altInput: true,
  altFormat: 'j F, Y',
  defaultDate: today,
  wrap: true
});
const eventTimeStart = new Flatpickr('#fieldInputTimeStart', {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
  defaultDate: today
});
const eventTimeEnd = new Flatpickr('#eventTimeEnd', {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
  defaultDate: afterThirtyMinutes
});

function openSomething(triggerId, blockParentId, blockId, classToAdd) {
  const someTrigger = document.getElementById(triggerId);
  const someBlockParent = document.getElementById(blockParentId);
  const someBlock = document.getElementById(blockId);

  someTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    someBlockParent.classList.toggle(classToAdd);
    hideOnClickOutside(blockParentId, classToAdd);
  });
}

function hideOnClickOutside(containerId, classToRemove) {
  const outsideClickListener = (event) => {
    const elem = document.getElementById(containerId);
    const elemChildIsTarget = checkingEventTarget(event, containerId);

    if(event.target !== elem && !elemChildIsTarget) {
      elem.classList.remove(classToRemove);
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  };

  document.addEventListener('click', outsideClickListener);
}

function checkingEventTarget(event, containerId) {
  const elem = document.getElementById(containerId);
  let isTarget = false;

  for(let i = 0; i < elem.childNodes.length; i++) {
    const children = elem.childNodes[i];

    if(event.target === children) {
      isTarget = true;
      return isTarget;
    } else {
      recu(children);
    }

    function recu(node) {
      if(node.hasChildNodes()) {
        for(let i = 0; i < node.childNodes.length; i++) {
          const recuChildren = node.childNodes[i];
          if(event.target === node) {
            isTarget = true;
            return true;
          }
          recu(recuChildren);
        }
      } else if (event.target === node) {
        isTarget = true;
        return true;
      } else {
        return false;
      }
    }
  }
  return isTarget;
}

openSomething('calendarTrigger', 'calendar', 'calendarBody', 'opened');
