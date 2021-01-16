import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { CatalogsItemPage } from './catalogs-item';

import { CatalogsService } from './catalogs.service';

@Component({
	templateUrl: './catalogs-list.html'
})
export class CatalogsListPage implements OnInit {
	public catalogs: any[];

	constructor(private service: CatalogsService, private nav: NavController, private businessService: BusinessesService) {
	}

	ngOnInit(): void {
		this.service.getCatalogs(this.businessService.getCurrent().$key)
			.then(catalogs => this.catalogs = catalogs);
	}

	public itemTapped(item) {
		this.nav.push(CatalogsItemPage, {
			item: item
		});
	}
}
