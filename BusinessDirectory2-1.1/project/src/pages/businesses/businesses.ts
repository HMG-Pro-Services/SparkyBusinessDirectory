import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider';
import { BusinessesService } from '../../services/businesses.service';
import { BusinessDetailPage } from './business-detail';
import { BusinessesFilter } from './businesses-filter';

@Component({
	selector: 'page-businesses',
	templateUrl: './businesses.html'
})
export class BusinessesPage {
	queryText = '';
	businesses: any[] = [];
	orderBy: 'title' | 'distance' = 'title';

	get isFilterDirty(): boolean {
		return !!this.selectedCategory;
	}

	categories: any[] = [];
	selectedCategory: string = null;

	constructor(
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		public service: BusinessesService,
		private data: DataProvider
	) {
	}

	ionViewCanEnter(): Promise<boolean> {
		return this.data.init();
	}

	ionViewDidLoad() {
		this.updateList();
	}

	ionViewWillEnter() {
		Promise.all([this.loadCategories()])
			.then(() => this.updateList());
	}

	updateList() {
		this.service.fetchBusinesses(this.queryText, false, this.selectedCategory, this.orderBy)
			.then(businesses => {
				this.businesses = businesses;
			});
	}

	presentFilter() {
		let modal = this.modalCtrl.create(BusinessesFilter, {
			categories: this.categories,
			orderBy: this.orderBy,
			selectedCategory: this.selectedCategory
		});
		modal.present();

		modal.onWillDismiss((result) => {
			if (result) {
				this.selectedCategory = result.selectedCategory;
				this.orderBy = result.orderBy;
				this.updateList();
			}
		});
	}

	goToBusinessDetail(business: any) {
		this.service.setCurrent(business);
		this.navCtrl.push(BusinessDetailPage);
	}

	clearFilter() {
		this.selectedCategory = null;
		this.updateList();
	}

	selectCategory(category) {
		this.selectedCategory = category.$key;
		this.updateList();
	}

	private loadCategories() {
		return this.service.getCategories().then(categories => {
			this.categories = [{ $key: null, title: 'All' }, ...categories];
		});
	}
}
