import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-reviews',
  templateUrl: './add-reviews.component.html',
  styleUrls: ['./add-reviews.component.scss'],
})
export class AddReviewsComponent implements OnInit {
  review: any = { rate: 0 };

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  async addReview() {
    if (!this.review.author || !this.review.comment) {
      const alert = await this.alertCtrl.create({
        header: 'Validation',
        message: 'Author and comment fields are required',
        buttons: ['OK'],
      });
      alert.present();
    } else {
      this.dismiss(this.review);
    }
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
