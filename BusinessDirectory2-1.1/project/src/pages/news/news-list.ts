import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { NewsItemPage } from './news-item';

import { NewsService } from './news.service';

@Component({
	templateUrl: './news-list.html'
})
export class NewsListPage implements OnInit {
	public posts: any[];

	constructor(private service: NewsService, private nav: NavController, private businessService: BusinessesService) {
	}

	ngOnInit(): void {
		this.service.getPosts(this.businessService.getCurrent().$key)
			.then(posts => this.posts = posts);
	}

	public itemTapped(item) {
		this.nav.push(NewsItemPage, {
			item: item
		});
	}
}
