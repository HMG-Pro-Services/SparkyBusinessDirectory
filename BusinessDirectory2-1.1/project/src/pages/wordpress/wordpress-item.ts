import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { WordpressPost } from './wordpress-post.model';

@Component({
	selector: 'page-wordpress-item',
	templateUrl: './wordpress-item.html'
})
export class WordpressItemPage {
	post: WordpressPost;

	constructor(navParams: NavParams) {
		this.post = <WordpressPost>navParams.get('item');
	}
}
