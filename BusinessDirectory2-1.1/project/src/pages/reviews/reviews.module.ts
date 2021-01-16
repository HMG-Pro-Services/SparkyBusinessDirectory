import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AddReviewPage } from './add-review';
import { ReviewsPage } from './reviews';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	imports: [IonicModule, Ionic2RatingModule, PipesModule],
	entryComponents: [ReviewsPage, AddReviewPage],
	declarations: [ReviewsPage, AddReviewPage],
	exports: [ReviewsPage]
})
export class SpeakersModule {

}