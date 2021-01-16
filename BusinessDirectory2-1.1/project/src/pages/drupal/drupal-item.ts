import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { DrupalPost } from './drupal-post.model';

@Component({
	templateUrl: './drupal-item.html'
})
export class DrupalItemPage {
	post: DrupalPost;

	constructor(navParams: NavParams) {
		this.post = <DrupalPost>navParams.get('item');
	}
}
