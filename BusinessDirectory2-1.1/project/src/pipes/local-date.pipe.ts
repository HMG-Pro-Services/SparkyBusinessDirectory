import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {
	transform(value) {
		return new Date(value).toLocaleString();
	}
}