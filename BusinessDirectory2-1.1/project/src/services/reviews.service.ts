import { Injectable } from '@angular/core';
import { DataProvider } from '../providers/data-provider';

@Injectable()
export class ReviewsService {
	constructor(
		private dataProvider: DataProvider
	) {

	}

	getReviews(businessId: string) {
		return this.dataProvider.getReviews(businessId);
	}

	addReview(businessId, review: any) {
		Object.assign(review, {
			date: new Date().getTime(),
			business: businessId
		});
		return this.dataProvider.addReview(businessId, review);
	}
}