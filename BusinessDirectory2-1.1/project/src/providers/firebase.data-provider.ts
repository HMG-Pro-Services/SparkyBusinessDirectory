import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataProvider } from './data-provider';

@Injectable()
export class FirebaseDataProvider extends DataProvider {
	getBusinesses(): Promise<any[]> {
		return this.db.list('businesses').first().toPromise();
	}

	getCategories(): Promise<any[]> {
		return this.db.object('categories').first().toPromise()
		.then((categories: any) => {
			Object.keys(categories).forEach(function(key) {
				categories[key].$key = key;
			});
			return categories;
		});
	}

	getReviews(businessId: string): Promise<any[]> {
		return this.db
			.list('reviews', {
				query: {
					orderByChild: 'business',
					equalTo: businessId
				}
			})
			.first().toPromise();
	}

	addReview(businessId: string, review: any): Promise<void> {
		this.db.list('reviews').push(review);

		return this.db.object(`businesses/${businessId}`)
			.first().toPromise()
			.then(business => {
				return this.db.object(`businesses/${businessId}`)
					.update({
						rating: this.calcRating(business.rating, review.rate)
					});
			});
	}

	getPosts(businessId: string): Promise<any[]> {
		return this.db
			.list('news', {
				query: {
					orderByChild: 'business',
					equalTo: businessId
				}
			})
			.first().toPromise();
	}

	getProducts(businessId: string): Promise<any[]> {
		return this.db
			.list('products', {
				query: {
					orderByChild: 'business',
					equalTo: businessId
				}
			})
			.first().toPromise();
	}

	getServices(businessId: string): Promise<any[]> {
		return this.db
			.list('services', {
				query: {
					orderByChild: 'business',
					equalTo: businessId
				}
			})
			.first().toPromise();
	}

	getCatalogs(businessId: string): Promise<any[]> {
		return this.db
			.list('catalogs', {
				query: {
					orderByChild: 'business',
					equalTo: businessId
				}
			})
			.first().toPromise();
	}

	getMapCommon(): Promise<any> {
		return this.db.object(`common/map`)
			.first().toPromise();
	}

	constructor(private db: AngularFireDatabase) {
		super();
	}

	init(): Promise<boolean> {
		return Promise.resolve(true);
	}
}
