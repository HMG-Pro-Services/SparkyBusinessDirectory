import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
  },
  {
    path: ':id',
    component: AddReviewsComponent,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    IonicRatingModule,
    PipesModule,
    FormsModule,
  ],
  declarations: [
    ReviewsComponent,
    AddReviewsComponent,
  ],
})
export class ReviewsModule { }
