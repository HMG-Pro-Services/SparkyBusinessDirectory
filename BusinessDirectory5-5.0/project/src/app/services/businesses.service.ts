import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DataService } from './database/data.service';
import { LocalStorageService } from './common/local-storage.service';
import { DistanceService } from './common/distance.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessesService {
  businesses: any[];
  private currentBusiness: any;

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService,
    private distanceService: DistanceService,
  ) { }

  fetchBusinesses(filter: string, showFavorites: boolean, categoryId: string, orderBy: 'title' | 'distance' = 'title'): Promise<any[]> {
    filter = filter ? filter.toLowerCase() : filter;
    return this.getBusinesses().then(() => {
      let businesses = _.filter(this.businesses, (business: any) => {
        return (!filter || business.title.toLowerCase().indexOf(filter) >= 0)
          && (!showFavorites || business.isInFavorites)
          && (!categoryId || business.category === categoryId);
      });
      businesses = _.sortBy(businesses, (business) => business[orderBy]);

      return Promise.resolve(businesses);
    });
  }

  toggleFavorites(businessId): void {
    const toggle = !this.isInFavorites(businessId);

    _.each(this.businesses, (businessItem) => {
      if (businessItem.$key === businessId) {
        businessItem.isInFavorites = toggle;

        let favorites = this.localStorageService.getItem('favoritesBusinesses') || [];

        if (toggle) {
          favorites.push(businessItem.$key);
          favorites = _.uniq(favorites);
        } else {
          favorites = _.filter(favorites, (item) => item !== businessItem.$key);
        }
        this.localStorageService.setItem('favoritesBusinesses', favorites);
      }
    });
  }

  getCategories(): Promise<any[]> {
    return this.dataService.getCategories().then((categories) => {
      return Object.keys(categories).map((key) => categories[key]);
    });
  }

  isInFavorites(id): boolean {
    const favorites = this.localStorageService.getItem('favoritesBusinesses');
    return _.indexOf(favorites, id) >= 0;
  }

  getBusinesses(): Promise<any[]> {
    if (!this.businesses) {
      return Promise.all([this.dataService.getBusinesses(), this.dataService.getCategories()])
        .then(([businesses, categories]) => {
          this.businesses = businesses;
          const favorites = this.localStorageService.getItem('favoritesBusinesses') || [];
          _.each(businesses, (business) => {
            if (favorites.indexOf(business.$key) >= 0) {
              business.isInFavorites = true;
            }
            business.categoryName = categories[business.category] && categories[business.category].title;
          });

          this.setDistance(businesses);

          return businesses;
        });
    }
    return Promise.resolve(this.businesses);
  }

  private setDistance(businesses: any) {
    const origins = _.map(businesses, (business: any) => {
      return business.officeLocation;
    });
    businesses = _.map(businesses, (business) => business);

    this.distanceService.getDistancesToOrigins(origins)
      .then((distances) => {
        _.each(businesses, (business, index) => {
          business.distance = distances[index];
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setCurrent(business: any) {
    this.currentBusiness = business;
  }

  getCurrent() {
    return this.currentBusiness;
  }
}
