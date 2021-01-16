import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/config';

const reviews = [
  {
    author: 'John Snow',
    comment: 'Good business',
    rate: 4,
    date: 1,
  },
  {
    author: 'Tyrion Lanniste',
    comment: 'Not bad',
    rate: 2,
    date: 2,
  },
  {
    author: 'Daenerys Targaryen',
    comment: 'Wonderful',
    date: 3,
  },
];

@Injectable({
  providedIn: 'root',
})
export class HttpDataService extends DataService {
  private cache: { [collection: string]: any };

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getMapCommon(): Promise<any> {
    return Promise.resolve(this.cache.common.map);
  }

  getProducts(businessId: string): Promise<any[]> {
    const products = Object.keys(this.cache.products)
      .map((key) => this.cache.products[key])
      .filter((product) => product.business === businessId);
    return Promise.resolve(products);
  }

  getCatalogs(businessId: string): Promise<any[]> {
    const catalogs = Object.keys(this.cache.catalogs)
      .map((key) => this.cache.catalogs[key])
      .filter((catalog) => catalog.business === businessId);
    return Promise.resolve(catalogs);
  }

  getServices(businessId: string): Promise<any[]> {
    const services = Object.keys(this.cache.services)
      .map((key) => this.cache.services[key])
      .filter((service) => service.business === businessId);
    return Promise.resolve(services);
  }

  getPosts(businessId: string): Promise<any[]> {
    const posts = Object.keys(this.cache.news)
      .map((key) => this.cache.news[key])
      .filter((post) => post.business === businessId);
    return Promise.resolve(posts);
  }

  addReview(businessId: string, review: any): Promise<void> {
    reviews.push(review);
    const business = this.cache.businesses[businessId];
    business.rating = this.calcRating(business.rating, review.rate);

    return Promise.resolve();
  }

  getReviews(businessId: string): Promise<any[]> {
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

    return this.http.get(Config.apiUrl)
      .toPromise()
      .then((response) => {
        this.cache = response;
        this.setInternalIds(['businesses', 'categories', 'news', 'products', 'catalogs', 'services']);
        return true;
      });
  }

  private setInternalIds(collections: string[]) {
    collections.forEach((collectionKey) => {
      const collection = this.cache[collectionKey];
      Object.keys(collection).forEach((id) => collection[id].$key = id);
    });
  }
}
