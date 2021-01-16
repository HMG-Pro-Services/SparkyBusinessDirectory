import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import * as g from 'geolib';
import * as _ from 'lodash';

@Injectable()
export class DistanceService {
	constructor(private geolocation: Geolocation) {

	}

	getDistancesToOrigins(origins) {
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

	getDistanceToOrigin(origin) {
		return this.getCurrentPosition()
			.then((position) => this.getDistance(origin, position));
	}

	getDistance(origin, position) {
		// origin = origin.split(',');
		origin = {
			latitude: origin.annotation[0].latitude,
			longitude: origin.annotation[0].longitude
		};

		let distance = g.getDistance({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
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
		let posOptions = {
			enableHighAccuracy: true
		};

		return this.geolocation.getCurrentPosition(posOptions);
	}
}
