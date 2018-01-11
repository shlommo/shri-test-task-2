import createSvgSprite from './createSvgSprite';
import flatpickrInit from './flatpickrInit';
import openCalendar from './openCalendar';
import showPopup from './showPopup';
import renderTimeSlotInfoView from './renderTimeSlotInfoView';
import activateFieldAutocomplete from './activateFieldAutocomplete';
import activateRoomName from './activateRoomName';

createSvgSprite();

flatpickrInit();

openCalendar('calendarTrigger', 'calendar', 'opened', 'calendar-opened');

showPopup('deleteEventPopup', 'deleteEventPopupTrigger');

renderTimeSlotInfoView();

activateFieldAutocomplete();

activateRoomName();
