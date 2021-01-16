import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { InAppBrowserService } from '../../common/services/in-app-browser.service';

@Component({
	templateUrl: './catalogs-item.html'
})
export class CatalogsItemPage {
	catalog: any;

	constructor(navParams: NavParams, private browser: InAppBrowserService) {
		this.catalog = navParams.get('item');
	}

	open() {
		this.browser.open(this.catalog.url);
	}

	openPdf() {
		this.browser.open(this.catalog.pdf);
	}
}
