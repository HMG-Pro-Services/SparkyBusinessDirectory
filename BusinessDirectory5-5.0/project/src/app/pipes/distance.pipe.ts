import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {

  transform(distance) {

    if (!distance) {
      return '...';
    }

    if (distance < 1000) {
      return `${distance} m`;
    } else {
      return `${(distance / 1000).toFixed(2)} km`;
    }
  }
}
