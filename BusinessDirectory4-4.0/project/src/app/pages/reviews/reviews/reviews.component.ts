import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReviewsService } from '../reviews.service';
import { BusinessesService } from 'src/app/services/businesses.service';
import { AddReviewsComponent } from '../add-reviews/add-reviews.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];
  private business: any;

  constructor(
    private service: ReviewsService,
    private modalCtrl: ModalController,
    private businessService: BusinessesService,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    this.loadReviews();
  }

  async addReview() {
    const modal = await this.modalCtrl.create({
      component: AddReviewsComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.service.addReview(this.business.$key, data)
        .then(() => {
          this.loadReviews();
        });
    }
  }

  private loadReviews() {
    this.service.getReviews(this.business.$key)
      .then((reviews) => this.reviews = reviews);
  }
}
