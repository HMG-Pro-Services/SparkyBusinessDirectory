import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import format from 'date-format';

@Injectable({
  providedIn: 'root',
})
export class OpenHoursService {
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor() { }

  getOpenHours(openHours) {
    const days = [];
    const groupedDays = _.groupBy(openHours.days, 'day');
    _.each(groupedDays, (groupedDay) => {
      const day = {
        times: [],
        name: '',
      };

      _.each(groupedDay, (d: any) => {
        day.name = this.dayNames[d.day];
        const openAt = new Date(d.openAt.epoch);
        const closeAt = new Date(d.closeAt.epoch);

        const from = format('hh:mm', openAt);
        const to = format('hh:mm', closeAt);
        day.times.push(from + ' - ' + to);
      });

      days.push(day);
    });
    return days;
  }

  isBusinessOpen(openHours) {
    const now = (new Date());
    const currentDay = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const fixedTime = hours * 60 + minutes;

    for (const openDay of openHours.days) {
      if (openDay.day !== currentDay) {
        continue;
      }

      const openTime = openDay.openAt.hour * 60 + openDay.openAt.minute;
      const closeTime = openDay.closeAt.hour * 60 + openDay.closeAt.minute;

      if (fixedTime >= openTime && fixedTime <= closeTime) {
        return true;
      }
    }
    return false;
  }
}
