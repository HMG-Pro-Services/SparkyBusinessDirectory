import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { apiUrl } from '../config';
import { DataProvider } from './data-provider';

const reviews = [{
	author: 'John Snow',
	comment: 'Good business',
	rate: 4,
	date: 1
}, {
	author: 'Tyrion Lanniste',
	comment: 'Not bad',
	rate: 2,
	date: 2
}, {
	author: 'Daenerys Targaryen',
	comment: 'Wonderful',
	date: 3
}];

@Injectable()
export class HttpDataProvider extends DataProvider {
	private cache: { [collection: string]: any };

	constructor(private http: Http) {
		super();
	}

	getMapCommon(): Promise<any> {
		return Promise.resolve(this.cache.common.map);
	}

	getProducts(businessId: string): Promise<any[]> {
		let products = Object.keys(this.cache.products)
			.map(key => this.cache.products[key])
			.filter(product => product.business === businessId);
		return Promise.resolve(products);
	}

	getCatalogs(businessId: string): Promise<any[]> {
		let catalogs = Object.keys(this.cache.catalogs)
			.map(key => this.cache.catalogs[key])
			.filter(catalog => catalog.business === businessId);
		return Promise.resolve(catalogs);
	}

	getServices(businessId: string): Promise<any[]> {
		let services = Object.keys(this.cache.services)
			.map(key => this.cache.services[key])
			.filter(service => service.business === businessId);
		return Promise.resolve(services);
	}

	getPosts(businessId: string): Promise<any[]> {
		let posts = Object.keys(this.cache.news)
			.map(key => this.cache.news[key])
			.filter(post => post.business === businessId);
		return Promise.resolve(posts);
	}

	addReview(businessId: string, review: any): Promise<void> {
		reviews.push(review);
		let business = this.cache.businesses[businessId];
		business.rating = this.calcRating(business.rating, review.rate);

		return Promise.resolve();
	}

	getReviews(businessId: string): Promise<any[]> {
		console.log(businessId);
		return Promise.resolve(reviews);
	}

	getBusinesses(): Promise<any[]> {
		return Promise.resolve(this.cache.businesses);
	}

	getCategories(): Promise<any[]> {
		return Promise.resolve(this.cache.categories);
	}

	init(): Promise<boolean> {
		if (this.cache) {
			return Promise.resolve(true);
		}

		return this.http.get(apiUrl)
			.map(x => x.json())
			.toPromise()
			.then(response => {
				this.cache = response;
				this.setInternalIds(['businesses', 'categories', 'news', 'products', 'catalogs', 'services']);
				return true;
			});
	}

	private setInternalIds(collections: string[]) {
		collections.forEach(collectionKey => {
			let collection = this.cache[collectionKey];
			Object.keys(collection).forEach(id => collection[id].$key = id);
		});
	}
}