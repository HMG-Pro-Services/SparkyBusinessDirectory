import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DataProvider } from '../providers/data-provider';
import { BusinessesService } from './businesses.service';

@Injectable()
export class MapService {
	constructor(private data: DataProvider, private businessService: BusinessesService) {
	}

	getMapData(): Promise<any[]> {
		return this.data.getMapCommon().then(mapCommon => {
			let data: any = {};
			data.origin = mapCommon.origin;
			data.zoom = parseInt(mapCommon.zoomLevel, 10);

			return this.businessService.getBusinesses().then((businesses) => {
				let pins = [];
				_.each(businesses, (business) => {
					if (business.mapdata && business.mapdata.annotations) {
						_.each(business.mapdata.annotations, (annotation) => {

							pins.push({
								name: business.title + '. ' + annotation.title,
								lat: annotation.latitude,
								lng: annotation.longitude,
								business: business
							});
						});
					}
				});

				data.markers = pins;
				return data;
			});
		});
	}
}
