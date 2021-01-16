import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { MapService } from '../../services/map.service';
import { BusinessDetailPage } from '../businesses/business-detail';

@Component({
	selector: 'page-map',
	templateUrl: './map.html'
})
export class MapPage {
	map: any;

	constructor(
		private service: MapService,
		private businessService: BusinessesService,
		private navCtrl: NavController
	) {
	}

	ionViewDidLoad() {
		this.service.getMapData().then(map => {
			console.log(map);
			this.map = map;
		});
	}

	showBusinessDetails(business) {
		this.businessService.setCurrent(business);
		this.navCtrl.push(BusinessDetailPage);
	}
}
