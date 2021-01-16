import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DataProvider } from '../providers/data-provider';
import { DistanceService } from '../common/services/distance.service';
import { LS } from '../common/services/local-storage';

@Injectable()
export class BusinessesService {
	businesses: any[];
	private currentBusiness: any;

	constructor(private data: DataProvider, private distanceService: DistanceService) {
	}

	fetchBusinesses(filter: string, showFavorites: boolean, categoryId: string, orderBy: 'title' | 'distance' = 'title'): Promise<any[]> {
		filter = filter ? filter.toLowerCase() : filter;
		return this.getBusinesses().then(() => {
			let businesses = _.filter(this.businesses, (business: any) => {
				return (!filter || business.title.toLowerCase().indexOf(filter) >= 0)
					&& (!showFavorites || business.isInFavorites)
					&& (!categoryId || business.category === categoryId);
			});
			businesses = _.sortBy(businesses, business => business[orderBy]);

			return Promise.resolve(businesses);
		});
	}

	toggleFavorites(businessId): void {
		let toggle = !this.isInFavorites(businessId);

		_.each(this.businesses, (businessItem) => {
			if (businessItem.$key === businessId) {
				businessItem.isInFavorites = toggle;

				let favorites = LS.getItem('favoritesBusinesses') || [];

				if (toggle) {
					favorites.push(businessItem.$key);
					favorites = _.uniq(favorites);
				} else {
					favorites = _.filter(favorites, (item) => item != businessItem.$key);
				}
				LS.setItem('favoritesBusinesses', favorites);
			}
		});
	}

	getCategories(): Promise<any[]> {
		return this.data.getCategories().then(categories => Object.keys(categories).map(key => categories[key]));
	}

	isInFavorites(id): boolean {
		let favorites = LS.getItem('favoritesBusinesses');
		return _.indexOf(favorites, id) >= 0;
	}

	getBusinesses(): Promise<any[]> {
		if (!this.businesses) {
			return Promise.all([this.data.getBusinesses(), this.data.getCategories()])
				.then(([businesses, categories]) => {
					this.businesses = businesses;

					let favorites = LS.getItem('favoritesBusinesses') || [];
					_.each(businesses, (business) => {
						if (favorites.indexOf(business.$key) >= 0) {
							business.isInFavorites = true;
						}
						business.categoryName = categories[business.category].title;
					});

					this.setDistance(businesses);

					return businesses;
				});
		}
		return Promise.resolve(this.businesses);
	}

	private setDistance(businesses: any) {
		let origins = _.map(businesses, (business: any) => {
			return business.officeLocation;
		});
		businesses = _.map(businesses, (business) => business);

		this.distanceService.getDistancesToOrigins(origins)
			.then((distances) => {
				_.each(businesses, (business, index) => {
					business.distance = distances[index];
				});
			});
	}

	setCurrent(business: any) {
		this.currentBusiness = business;
	}

	getCurrent() {
		return this.currentBusiness;
	}
}
