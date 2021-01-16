import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-businesses-filter',
	templateUrl: './businesses-filter.html'
})
export class BusinessesFilter {
	categories: any[];
	selectedCategory: string;
	orderBy: string;

	constructor(
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {
		let data = this.navParams.data;
		this.categories = data.categories;
		this.orderBy = data.orderBy;
		this.selectedCategory = data.selectedCategory;
	}

	applyFilters() {
		this.dismiss({
			selectedCategory: this.selectedCategory,
			orderBy: this.orderBy
		});
	}

	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
}
