import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsService } from '../../common/services/maps.service';
import { OpenHoursService } from '../../common/services/open-hours.service';
import { BusinessesService } from '../../services/businesses.service';
import { DrupalListPage } from '../drupal/drupal-list';
import { NewsListPage } from '../news/news-list';
import { ProductsListPage } from '../products/products-list';
import { ReviewsPage } from '../reviews/reviews';
import { ServicesListPage } from '../services/services-list';
import { WordpressListPage } from '../wordpress/wordpress-list';
import { ContactUsPage } from './contact-us';
import { CatalogsListPage } from '../catalogs/catalogs-list';

@Component({
	selector: 'page-business-detail',
	templateUrl: './business-detail.html'
})
export class BusinessDetailPage {
	business: any;
	tiles: any[][] = [
		[
			{ title: 'News', icon: 'at', component: NewsListPage },
			{ title: 'Products', icon: 'cart', component: ProductsListPage }
		],
		[
			{ title: 'Services', icon: 'cog', component: ServicesListPage },
			{ title: 'Catalogs', icon: 'book', component: CatalogsListPage }
		]
	];
	isOpen: boolean;

	constructor(
		public service: BusinessesService,
		private navCtrl: NavController,
		openHoursService: OpenHoursService,
		private mapsService: MapsService
	) {
		this.business = service.getCurrent();
		this.isOpen = this.business.openhours && openHoursService.isBusinessOpen(this.business.openhours);
	}

	getDirections(officeLocation: string) {
		this.mapsService.openMapsApp(officeLocation, this.business.title);
	}

	goToContactUs(business: any) {
		this.navCtrl.push(ContactUsPage, { business: business });
	}

	goToReviews() {
		this.navCtrl.push(ReviewsPage);
	}

	navigateToWordpress() {
		this.navCtrl.push(WordpressListPage);
	}

	navigateToDrupal() {
		this.navCtrl.push(DrupalListPage);
	}

	navigateTo(tile: any) {
		this.navCtrl.push(tile.component);
	}
}
