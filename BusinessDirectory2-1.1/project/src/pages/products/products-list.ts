import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { ProductsItemPage } from './products-item';

import { ProductsService } from './products.service';

@Component({
	templateUrl: './products-list.html'
})
export class ProductsListPage implements OnInit {
	public products: any[];

	constructor(private service: ProductsService, private nav: NavController, private businessService: BusinessesService) {
	}

	ngOnInit(): void {
		this.service.getProducts(this.businessService.getCurrent().$key)
			.then(products => this.products = products);
	}

	public itemTapped(item) {
		this.nav.push(ProductsItemPage, {
			item: item
		});
	}
}
