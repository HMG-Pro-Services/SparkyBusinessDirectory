import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { DrupalItemPage } from './drupal-item';
import { DrupalPost } from './drupal-post.model';

import { DrupalService } from './drupal.service';

@Component({
	templateUrl: './drupal-list.html'
})
export class DrupalListPage implements OnInit {
	public posts: DrupalPost[];

	constructor(
		private drupal: DrupalService,
		private nav: NavController,
		private businessService: BusinessesService
	) {
	}

	ngOnInit(): void {
		this.drupal.getPosts(this.businessService.getCurrent().drupal)
			.subscribe(posts => this.posts = posts);
	}

	public itemTapped(item) {
		this.nav.push(DrupalItemPage, {
			item: item
		});
	}
}
