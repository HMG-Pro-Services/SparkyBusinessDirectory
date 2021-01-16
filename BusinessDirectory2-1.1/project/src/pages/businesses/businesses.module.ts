import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from '../../pipes/pipes.module';
import { BusinessDetailPage } from './business-detail';
import { BusinessesPage } from './businesses';
import { BusinessesFilter } from './businesses-filter';
import { ContactUsPage } from './contact-us';

@NgModule({
	imports: [IonicModule, PipesModule, Ionic2RatingModule],
	entryComponents: [BusinessesPage, BusinessDetailPage, ContactUsPage, BusinessesFilter],
	declarations: [BusinessesPage, BusinessDetailPage, ContactUsPage, BusinessesFilter],
	exports: [BusinessesPage]
})
export class BusinessesModule {

}