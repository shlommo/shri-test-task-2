import hideOnClickOutside from './hideOnClickOutside';

export default (triggerId, blockParentId, classToAdd) => {
  const calendarTrigger = document.getElementById(triggerId);
  const calendarParent = document.getElementById(blockParentId);

  if (calendarTrigger === null) {
    return false;
  }

  calendarTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    calendarParent.classList.toggle(classToAdd);
    hideOnClickOutside(`#${blockParentId}`, () => {
      calendarParent.classList.remove(classToAdd);
    });
  });

  return true;
};
