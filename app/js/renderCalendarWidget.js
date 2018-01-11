import {getNodeFromMarkup, getDay} from './helpers';

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthNamesShortcuts = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const getMonth = (year, month) => {
  const d = new Date(year, month);
  const monthShortName = monthNamesShortcuts[month];
  const qurrentDate = new Date();
  const today = qurrentDate.getDate();
  const qurrentMonth = qurrentDate.getMonth();

  let daysView = '';

  for (let i = 0; i < getDay(d); i++) {
    daysView += '<div class="month__day empty"></div>';
  }

  while (d.getMonth() === month) {
    let todayClass = '';
    if (d.getDate() === today && qurrentMonth === month) {
      todayClass = 'today';
    }

    daysView += `<div class="month__day ${todayClass}" data-shortcut="${monthShortName}">${d.getDate()}</div>`;

    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) !== 0) {
    for (let i = getDay(d); i < 7; i++) {
      daysView += '<div class="month__day empty"></div>';
    }
  }

  const monthView = `<div class="calendar-widget__month month">
                        <div class="month__name">${monthNames[month]}</div>
                        <div class="month__week">
                            <div class="month__day">Пн</div>
                            <div class="month__day">Вт</div>
                            <div class="month__day">Ср</div>
                            <div class="month__day">Чт</div>
                            <div class="month__day">Пт</div>
                            <div class="month__day">Сб</div>
                            <div class="month__day">Вс</div>
                        </div>

                        <div class="month__days">
                            ${daysView}
                        </div>
                    </div>`;

  return monthView;
};

const moveCalendarWidget = (id) => {
  const yearQuarter = calendarWidget.getAttribute('data-quarter');

  calendarWidget.style.transform = `translateX(-${100 * (+yearQuarter - 1)}%)`;
};

const activateCalendarSlide = () => {
  const calendarTriggerArr = calendar.querySelectorAll('[data-calendar-trigger]');
  let yearQuarter = calendarWidget.getAttribute('data-quarter');

  for (let calendarTrigger of calendarTriggerArr) {
    calendarTrigger.addEventListener('click', () => {
      const calendarTriggerDirection = calendarTrigger.getAttribute('data-direction');
      const windowWidth = window.innerWidth;
      let quarterMaxValue;

      if (!calendar.classList.contains('opened')) {
        return false;
      }

      quarterMaxValue = (windowWidth < 1280) ? 12 : 4;

      if (calendarTriggerDirection === 'left' && yearQuarter > 1) {
        --yearQuarter;
        calendarWidget.setAttribute('data-quarter', yearQuarter);
        moveCalendarWidget();
      } else if (calendarTriggerDirection === 'right' && yearQuarter < quarterMaxValue) {
        yearQuarter++;
        calendarWidget.setAttribute('data-quarter', yearQuarter);
        moveCalendarWidget();
      }
      return true;
    });
  }
};

const dayHandler = () => {
  const dayArr = calendarWidget.querySelectorAll('.month__days .month__day:not(.empty)');
  const calendarHeaderTitle = calendar.querySelector('.calendar__header-date-title');

  for (let day of dayArr) {
    const month = day.getAttribute('data-shortcut');

    day.addEventListener('click', () => {
      calendarWidget.querySelector('.month__day.today').classList.remove('today');
      day.classList.add('today');
      calendarHeaderTitle.innerHTML = day.innerHTML + ' ' + month;
    });
  }
};

export default (calendarWidgetId) => {
  const calendarWidget = document.getElementById(calendarWidgetId);
  const currentDate = new Date();
  const currentDaY = new Date().getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const calendar = document.getElementById('calendar');

  if (calendar === null) {
    return false;
  }
  const calendarHeaderTitle = calendar.querySelector('.calendar__header-date-title');

  calendarHeaderTitle.innerHTML = `${currentDaY} ${monthNamesShortcuts[currentMonth - 1]} · Сегодня`;

  for (let i = 0; i <= 11; i++) {
    const monthView = getMonth(currentYear, i);
    const monthViewNode = getNodeFromMarkup(monthView);

    calendarWidget.appendChild(monthViewNode);
  }

  activateCalendarSlide('calendar', calendarWidgetId);

  moveCalendarWidget(calendarWidgetId);

  dayHandler();
};
