import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { InAppBrowserService } from '../../common/services/in-app-browser.service';

@Component({
	templateUrl: './products-item.html'
})
export class ProductsItemPage {
	product: any;

	constructor(navParams: NavParams, private browser: InAppBrowserService) {
		this.product = navParams.get('item');
	}

	buyNow() {
		this.browser.open(this.product.url);
	}
}
