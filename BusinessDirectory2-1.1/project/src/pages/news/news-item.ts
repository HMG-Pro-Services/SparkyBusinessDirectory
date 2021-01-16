import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: './news-item.html'
})
export class NewsItemPage {
	post: any;

	constructor(navParams: NavParams) {
		this.post = navParams.get('item');
	}
}
