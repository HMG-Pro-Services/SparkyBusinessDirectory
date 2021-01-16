import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import format from 'date-format';

@Injectable()
export class OpenHoursService {
	dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// *****************************************************************

	getOpenHours(openHours) {
		let days = [];
		let groupedDays = _.groupBy(openHours.days, 'day');
		_.each(groupedDays, (groupedDay) => {
			let day = {
				times: [],
				name: ''
			};

			_.each(groupedDay, (d: any) => {
				day.name = this.dayNames[d.day];
				let openAt = new Date(d.openAt.epoch);
				let closeAt = new Date(d.closeAt.epoch);

				let from = format('hh:mm', openAt);
				let to = format('hh:mm', closeAt);
				day.times.push(from + ' - ' + to);
			});

			days.push(day);
		});
		// debugger;
		return days;
	}

	isBusinessOpen(openHours) {
		let now = (new Date());
		let day = now.getDay();
		let hours = now.getHours();
		let minutes = now.getMinutes();

		let fixedTime = (new Date(2015, 0, 1, hours, minutes, 0)).getTime();

		let open;
		for (let i = 0; i < openHours.days.length; i++) {
			open = openHours.days[i];
			if (open.day !== day) {
				continue;
			}

			if (fixedTime >= open.openAt && fixedTime <= open.closeAt) {
				return true;
			}
		}

		return false;
	}
}
