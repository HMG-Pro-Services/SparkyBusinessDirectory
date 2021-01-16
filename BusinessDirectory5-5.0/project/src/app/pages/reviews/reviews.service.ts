import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/database/data.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {

  constructor(
    private dataService: DataService,
  ) { }

  getReviews(businessId: string) {
    return this.dataService.getReviews(businessId);
  }

  addReview(businessId, review: any) {
    Object.assign(review, {
      date: new Date().getTime(),
      business: businessId,
    });
    return this.dataService.addReview(businessId, review);
  }
}
