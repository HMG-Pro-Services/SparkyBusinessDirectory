import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';

import { WordpressItemPage } from './wordpress-item';
import { WordpressListPage } from './wordpress-list';
import { WordpressService } from './wordpress.service';

@NgModule({
	imports: [
		IonicModule,
		PipesModule
	],
	declarations: [
		WordpressItemPage,
		WordpressListPage
	],
	entryComponents: [
		WordpressItemPage,
		WordpressListPage
	],
	providers: [WordpressService]
})
export class WordpressModule {

}