import createSvgSprite from './createSvgSprite';
import flatpickrInit from './flatpickrInit';
import openCalendar from './openCalendar';
import showPopup from './showPopup';
import renderTimeSlotInfoView from './renderTimeSlotInfoView';
import activateFieldAutocomplete from './activateFieldAutocomplete';
import renderCalendarWidget from './renderCalendarWidget';

createSvgSprite();

flatpickrInit();

openCalendar('calendarTrigger', 'calendar', 'opened');

showPopup('deleteEventPopup', 'deleteEventPopupTrigger');

renderTimeSlotInfoView();

activateFieldAutocomplete();

renderCalendarWidget('calendarWidget');
