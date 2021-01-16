import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

export const diffDays = (date1: NgbDate, date2: NgbDate): number => {

	let utc1 = Date.UTC(date1.year, date1.month, date1.day);
	let utc2 = Date.UTC(date2.year, date2.month, date2.day);

	return (utc1 - utc2) / 86400000;
};