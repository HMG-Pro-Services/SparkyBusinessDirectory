import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { getDistance } from 'geolib';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {

  constructor(
    private geolocation: Geolocation,
  ) { }

  getDistancesToOrigins(origins: string[]) {
    return this.getCurrentPosition()
      .then((position) => {
        return _.map(origins, (origin) => {
          if (!origin) {
            return null;
          }
          return this.getDistance(origin, position);
        });
      });
  }

  getDistance(origin, position) {
    // const origins = origin.split(',');
    origin = {
      latitude: origin.annotation[0].latitude,
      longitude: origin.annotation[0].longitude,
    };

    const distance = getDistance({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, origin);

    /*
    if (distance < 1000) {
      distance = distance + ' m';
    } else {
      distance = convert(distance, 'meters', {
        precision: 2
      }).toKilometers() + ' km';
    }
    */
    return distance;
  }

  getCurrentPosition() {
    const posOptions = {
      enableHighAccuracy: true,
    };

    return this.geolocation.getCurrentPosition(posOptions);
  }
}
