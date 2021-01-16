import { Pipe, PipeTransform } from '@angular/core';
import convert from 'conversion.js';

@Pipe({
	name: 'distance'
})
export class DistancePipe implements PipeTransform {
	transform(distance) {

		if (!distance) {
			return '...';
		}

		if (distance < 1000) {
			return  distance + ' m'
		} else {
			return convert(distance, 'meters', {
				precision: 2
			}).toKilometers() + ' km'
		}
	}
}