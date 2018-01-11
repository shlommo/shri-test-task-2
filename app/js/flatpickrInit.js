import Flatpickr from 'flatpickr';
import {Russian} from 'flatpickr/dist/l10n/ru.js';

export default () => {
  const today = new Date();
  const afterThirtyMinutes = new Date(today.getTime() + 30 * 60 * 1000);
  /* eslint-disable */
  const eventDate = new Flatpickr('#date', {
    locale: Russian,
    altInput: true,
    altFormat: 'j F, Y',
    defaultDate: today,
    wrap: true,
    disableMobile: 'true'
  });
  const eventTimeStart = new Flatpickr('#fieldInputTimeStart', {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
    defaultDate: today,
  });
  const eventTimeEnd = new Flatpickr('#eventTimeEnd', {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
    defaultDate: afterThirtyMinutes,
  });
  /* eslint-enable */
};
