import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, length: number): string {
		if (!value) {
			return value;
		}

		let limit = parseInt(length + '', 10);
		return value.length > limit ? value.substring(0, limit) + '...' : value;
	}
}