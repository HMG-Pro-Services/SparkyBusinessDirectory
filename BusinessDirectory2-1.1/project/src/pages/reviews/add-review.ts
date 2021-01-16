import { Component } from '@angular/core';
import { AlertController, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-add-review',
	templateUrl: './add-review.html'
})
export class AddReviewPage {
	review: any = { rate: 0 };

	constructor(
		private viewCtrl: ViewController,
		private alertCtrl: AlertController
	) {
	}

	addReview() {
		if (!this.review.author || !this.review.comment) {
			let alert = this.alertCtrl.create({
				title: 'Validation',
				subTitle: 'Author and comment fields are required',
				buttons: ['OK']
			});
			alert.present();
		} else {
			this.dismiss(this.review);
		}
	}

	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
}
