import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { ServicesItemPage } from './services-item';

import { ServicesService } from './services.service';

@Component({
	templateUrl: './services-list.html'
})
export class ServicesListPage implements OnInit {
	public services: any[];

	constructor(private service: ServicesService, private nav: NavController, private businessService: BusinessesService) {
	}

	ngOnInit(): void {
		this.service.getServices(this.businessService.getCurrent().$key)
			.then(services => this.services = services);
	}

	public itemTapped(item) {
		this.nav.push(ServicesItemPage, {
			item: item
		});
	}
}
