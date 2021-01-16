import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { WordpressItemPage } from './wordpress-item';
import { WordpressPost } from './wordpress-post.model';

import { WordpressService } from './wordpress.service';

@Component({
	selector: 'page-wordpress-list',
	templateUrl: './wordpress-list.html'
})
export class WordpressListPage implements OnInit {
	public posts: WordpressPost[];

	constructor(
		private wordpressService: WordpressService,
		private nav: NavController,
		private businessService: BusinessesService
	) {
	}

	ngOnInit(): void {
		this.wordpressService.getPosts(this.businessService.getCurrent().wordpress)
			.subscribe(posts => {
				this.posts = posts;
			});
	}

	public itemTapped(item) {
		this.nav.push(WordpressItemPage, {
			item: item
		});
	}
}
