import {getNodeFromMarkup, getDay} from './helpers';

class RenderCalendar {
  constructor() {
    this.calendarWidget = document.getElementById('calendarWidget');
    this.calendar = document.getElementById('calendar');
    this._monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    this._monthNamesShortcuts = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  }

  getMonth(year, month) {
    const d = new Date(year, month);
    const monthShortName = this._monthNamesShortcuts[month];
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
                          <div class="month__name">${this._monthNames[month]}</div>
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
  }

  moveCalendarWidget() {
    const yearQuarter = this.calendarWidget.getAttribute('data-quarter');

    this.calendarWidget.style.transform = `translateX(-${100 * (+yearQuarter - 1)}%)`;
  }

  activateCalendarSlide() {
    const calendarTriggerArr = this.calendar.querySelectorAll('[data-calendar-trigger]');
    const self = this;
    let yearQuarter = this.calendarWidget.getAttribute('data-quarter');

    for (let calendarTrigger of calendarTriggerArr) {
      calendarTrigger.addEventListener('click', () => {
        const calendarTriggerDirection = calendarTrigger.getAttribute('data-direction');
        const windowWidth = window.innerWidth;
        let quarterMaxValue;

        if (!this.calendar.classList.contains('opened')) {
          return false;
        }

        quarterMaxValue = (windowWidth < 1280) ? 12 : 4;

        if (calendarTriggerDirection === 'left' && yearQuarter > 1) {
          --yearQuarter;
          this.calendarWidget.setAttribute('data-quarter', yearQuarter);
          self.moveCalendarWidget();
        } else if (calendarTriggerDirection === 'right' && yearQuarter < quarterMaxValue) {
          yearQuarter++;
          this.calendarWidget.setAttribute('data-quarter', yearQuarter);
          self.moveCalendarWidget();
        }
        return true;
      });
    }
  }

  dayHandler() {
    const dayArr = this.calendarWidget.querySelectorAll('.month__days .month__day:not(.empty)');
    const calendarHeaderTitle = this.calendar.querySelector('.calendar__header-date-title');

    for (let day of dayArr) {
      const month = day.getAttribute('data-shortcut');

      day.addEventListener('click', () => {
        this.calendarWidget.querySelector('.month__day.today').classList.remove('today');
        day.classList.add('today');
        calendarHeaderTitle.innerHTML = day.innerHTML + ' ' + month;
      });
    }
  }

  render() {
    const currentDate = new Date();
    const currentDaY = new Date().getDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (this.calendar === null) {
      return false;
    }

    const calendarHeaderTitle = this.calendar.querySelector('.calendar__header-date-title');
    calendarHeaderTitle.innerHTML = `${currentDaY} ${this._monthNamesShortcuts[currentMonth - 1]} · Сегодня`;

    for (let i = 0; i <= 11; i++) {
      const monthView = this.getMonth(currentYear, i);
      const monthViewNode = getNodeFromMarkup(monthView);

      this.calendarWidget.appendChild(monthViewNode);
    }

    this.activateCalendarSlide();

    this.moveCalendarWidget();

    this.dayHandler();

    return true;
  }
}

export default new RenderCalendar();
