import {getCoords, getNodeFromMarkup} from './helpers';
import hideOnClickOutside from './hideOnClickOutside';

const timeSlotArr = document.querySelectorAll('[data-time-slot]');

const timeSlotInfoTemplate = `<div class="time-slot-info" id="timeSlotInfoModal">
    <i class="time-slot-info__marker"></i>
    <div class="time-slot-info__cnt">
        <a href="event-edit.html" class="time-slot-info__trigger">
            <i>
                <svg width="12" height="12">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-edit"></use>
                </svg>
            </i>
        </a>

        <div class="time-slot-info__title">
            Рассуждения о высоком
        </div>

        <div class="time-slot-info__descr">
            14 декабря, 15:00—17:00·Жёлтый дом
        </div>
        <div class="time-slot-info__users">
            <div class="user">
                <div class="user__icon">
                    <img src="img/users/3.jpg" alt="">
                </div>
                Дарт Вейдер
            </div>&nbsp;и 12 участников
        </div>
    </div>
</div>`;

export default () => {
  for ( let [key, timeSlot] of Object.entries(timeSlotArr) ) {
    timeSlot.addEventListener('click', (event) => {
      event.preventDefault();

      const timeSlotComputedStyle = getComputedStyle(timeSlot);
      const timeSlotHeight = +timeSlotComputedStyle.height.slice(0, -2);
      const timeSlotWidth = +timeSlotComputedStyle.width.slice(0, -2);
      const timeSlotCoords = getCoords(timeSlot);
      const timeSlotTop = timeSlotCoords.top;
      const timeSlotLeft = timeSlotCoords.left;
      const body = document.querySelector('body');
      const timeSlotInfoNode = getNodeFromMarkup(timeSlotInfoTemplate);
      const windowWidth = window.innerWidth;

      timeSlot.classList.add('focused');
      body.appendChild(timeSlotInfoNode);

      setTimeout(() => {
        if (windowWidth < 1280) {
          const timeSlotInfoMarker = document.querySelector('.time-slot-info__marker');
          const timeSlotInfoMarkerWidth = +getComputedStyle(timeSlotInfoMarker).width.slice(0, -2);
          timeSlotInfoNode.style.cssText = `top: ${timeSlotTop + timeSlotHeight}px;`;
          timeSlotInfoMarker.style.left = `${timeSlotLeft + timeSlotWidth / 2 - timeSlotInfoMarkerWidth / 2}px`;
        } else {
          const timeSlotNodeWidth = getComputedStyle(timeSlotInfoNode).width.slice(0, -2);
          const leftMoveValue = timeSlotLeft + timeSlotWidth / 2 - timeSlotNodeWidth / 2;
          timeSlotInfoNode.style.cssText = `top: ${timeSlotTop + timeSlotHeight}px; left: ${leftMoveValue}px`;
        }
        timeSlotInfoNode.classList.add('showed');
      }, 100);

      setTimeout(() => {
        hideOnClickOutside('#timeSlotInfoModal', () => {
          body.removeChild(timeSlotInfoNode);
          timeSlot.classList.remove('focused');
        });
      }, 10);
    });
  }
};
