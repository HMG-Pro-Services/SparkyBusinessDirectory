import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { backendlessConfig } from '../config';
import { DataProvider } from './data-provider';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Injectable()
export class BackendlessDataProvider extends DataProvider {
	constructor() {
		super();

		Backendless.serverURL = 'https://api.backendless.com';
		Backendless.initApp(backendlessConfig.appId, backendlessConfig.appKey);
	}

	getBusinesses(): Promise<any[]> {
		return Backendless.Data.of('Business').find()
			.then((items: any[]) => {
				items.forEach(item => this.adoptBusiness(item));
				return items;
			});
	}

	getCategories(): Promise<any[]> {
		return Backendless.Data.of('Category').find()
			.then((categories: any[]) => {
				return categories.reduce((acc, currentValue) => {
					this.adoptId(currentValue);
					acc[currentValue.objectId] = currentValue;
					return acc;
				}, {});
			});
	}

	getReviews(businessId: string): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'business.objectId = \'' + businessId + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('Review').find(queryBuilder)
			.then((reviews: any) => {
				reviews.forEach(review => {
					review.date = review.postDate;
				});
				return reviews;
			});
	}

	addReview(businessId: string, review: any): Promise<void> {
		let newReview = {
			postDate: new Date().getTime(),
			comment: review.comment,
			rate: review.rate,
			author: review.author
		};
		return Backendless.Data.of('Review').save(newReview)
			.then((response: any) => {
				let parentObject = { objectId: response.objectId };
				let childObject = { objectId: review.business };
				let children = [childObject];

				if (review.rate) {
					this.getBusiness(businessId).then((business: any) => {
						let rating = this.calcRating(business.rating, review.rate);
						return this.saveBusiness(review.business, {
							rating: rating.value,
							reviews: rating.reviews
						});
					});
				}

				return <any>Backendless.Data.of('Review').setRelation(parentObject, 'business', children);
			});
	}

	getPosts(businessId: string): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'business.objectId = \'' + businessId + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('Article').find(queryBuilder)
			.then((items: any[]) => {
				items.forEach(item => this.adoptItem(item));
				return items;
			});
	}

	getProducts(businessId: string): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'business.objectId = \'' + businessId + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('Product').find(queryBuilder)
			.then((items: any[]) => {
				items.forEach(item => this.adoptItem(item));
				return items;
			});
	}

	getServices(businessId: string): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'business.objectId = \'' + businessId + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('Service').find(queryBuilder)
			.then((items: any[]) => {
				items.forEach(item => this.adoptItem(item));
				return items;
			});
	}

	getCatalogs(businessId: string): Promise<any[]> {
		let queryBuilder = Backendless.DataQueryBuilder.create();
		let whereClause = 'business.objectId = \'' + businessId + '\'';
		queryBuilder.setWhereClause(whereClause);

		return Backendless.Data.of('CatalogItem').find(queryBuilder)
			.then((items: any[]) => {
				items.forEach(item => this.adoptItem(item));
				return items;
			});
	}

	getMapCommon(): Promise<any> {
		return Backendless.Data.of('Map').findFirst();
	}

	init(): Promise<boolean> {
		return Promise.resolve(true);
	}

	private saveBusiness(id, changeSet) {
		changeSet.objectId = id;
		return Backendless.Data.of('Business').save(changeSet);
	}

	private getBusiness(businessId) {
		let businesses$ = Backendless.Data.of('Business');
		return businesses$.findById({ objectId: businessId })
			.then((item) => {
				this.adoptBusiness(item);
				return item;
			});
	}

	private adoptBusiness(business: any) {
		business.logo = business.logo.url;
		business.officeLocation = business.officeLocation.latitude + ',' + business.officeLocation.longitude;
		business.category = business.category.objectId;
		business.pictures = business.pictures.map(x => x.url);
		business.rating = {
			value: business.rating || 0,
			reviews: business.reviews || 0
		};
		business.mapAnnotations.forEach(annotation => {
			annotation.title = annotation.metadata.title;
		});

		business.mapdata = {
			annotations: business.mapAnnotations
		};

		business.openHours.forEach(day => {
			day.day = dayNames.indexOf(day.day);
		});
		business.openhours = {
			days: business.openHours
		};

		this.adoptId(business);
	}

	private adoptItem(item) {
		item.thumb = item.thumb.url;
		item.pictures = item.pictures.map(x => x.url);
		item.picture = item.pictures[0];
		this.adoptId(item);
	}

	private adoptId(item) {
		item.$key = item.objectId;
	}
}