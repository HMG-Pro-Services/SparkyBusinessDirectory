import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { InAppBrowserService } from '../../common/services/in-app-browser.service';

@Component({
	templateUrl: './services-item.html'
})
export class ServicesItemPage {
	service: any;

	constructor(navParams: NavParams, private browser: InAppBrowserService) {
		this.service = navParams.get('item');
	}

	open() {
		this.browser.open(this.service.url);
	}
}
