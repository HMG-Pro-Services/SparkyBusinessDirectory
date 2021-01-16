import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as _ from 'lodash';

import { DataService } from '../database/data.service';
import { BusinessesService } from '../businesses.service';

@Injectable({
  providedIn: 'root',
})
export class MapsService {

  constructor(
    private platform: Platform,
    private dataService: DataService,
    private businessesService: BusinessesService,
  ) { }

  openMapsApp(location: any, label: string = null) {
    let q;
    if (this.platform.is('android')) {
      q = 'geo:' + location + '?q=' + location;
      if (label) {
        q += '(' + label + ')';
      }
    } else {
      q = 'maps://maps.apple.com/?q=' + location;
    }
    window.location.href = q;
  }

  getMapData(): Promise<any[]> {
    return this.dataService.getMapCommon().then((mapCommon) => {
      const data: any = {};
      data.origin = mapCommon.origin;
      data.zoom = parseInt(mapCommon.zoomLevel, 10);

      return this.businessesService.getBusinesses().then((businesses) => {
        const pins = [];
        _.each(businesses, (business) => {
          if (business.mapdata && business.mapdata.annotations) {
            _.each(business.mapdata.annotations, (annotation) => {

              pins.push({
                name: business.title + '. ' + annotation.title,
                lat: annotation.latitude,
                lng: annotation.longitude,
                business: business,
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
