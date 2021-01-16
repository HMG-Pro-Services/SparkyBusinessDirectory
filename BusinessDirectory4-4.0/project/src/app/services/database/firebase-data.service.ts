import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService extends DataService {

  constructor(
    private db: AngularFireDatabase,
  ) {
    super();
  }

  getBusinesses(): Promise<any[]> {
    return this.db.list<any>('businesses').snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  getCategories(): Promise<any[]> {
    return this.db.object<any>('categories').valueChanges().pipe(first()).toPromise()
    .then((categories: any) => {
      Object.keys(categories).forEach((key) => {
        categories[key].$key = key;
      });
      return categories;
    });
  }

  getReviews(businessId: string): Promise<any[]> {
    return this.db.list<any>('reviews', (ref) => ref.orderByChild('business').equalTo(businessId)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  addReview(businessId: string, review: any): Promise<void> {
    this.db.list<any>('reviews').push(review);

    return this.db.object<any>(`businesses/${businessId}`)
      .valueChanges()
      .pipe(first())
      .toPromise()
      .then((business) => {
        return this.db.object(`businesses/${businessId}`)
          .update({
            rating: this.calcRating(business.rating, review.rate),
          });
      });
  }

  getPosts(businessId: string): Promise<any[]> {
    return this.db.list<any>('news', (ref) => ref.orderByChild('business').equalTo(businessId)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  getProducts(businessId: string): Promise<any[]> {
    return this.db.list<any>('products', (ref) => ref.orderByChild('business').equalTo(businessId)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  getServices(businessId: string): Promise<any[]> {
    return this.db.list<any>('services', (ref) => ref.orderByChild('business').equalTo(businessId)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  getCatalogs(businessId: string): Promise<any[]> {
    return this.db.list<any>('catalogs', (ref) => ref.orderByChild('business').equalTo(businessId)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => ({ $key: a.key, ...a.payload.val() }));
      }),
      first(),
    ).toPromise();
  }

  getMapCommon(): Promise<any> {
    return this.db.object<any>(`common/map`).valueChanges().pipe(first()).toPromise();
  }

  init(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
