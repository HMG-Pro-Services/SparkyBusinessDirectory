import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BusinessesService } from '../../services/businesses.service';
import { AddReviewPage } from './add-review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
	selector: 'page-reviews',
	templateUrl: './reviews.html'
})
export class ReviewsPage {
	reviews: any[] = [];
	private business: any;

	constructor(
		private service: ReviewsService,
		private modalCtrl: ModalController,
		public businessService: BusinessesService
	) {
		this.business = businessService.getCurrent();
	}

	ionViewDidLoad() {
		this.loadReviews();
	}

	addReview() {
		let modal = this.modalCtrl.create(AddReviewPage);
		modal.present();

		modal.onWillDismiss((review) => {
			if (review) {
				this.service.addReview(this.business.$key, review)
					.then(() => {
						this.loadReviews();
					});
			}
		});
	}

	private loadReviews() {
		this.service.getReviews(this.business.$key)
			.then(reviews => this.reviews = reviews);
	}
}
