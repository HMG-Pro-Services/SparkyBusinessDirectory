import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';

import { DrupalItemPage } from './drupal-item';
import { DrupalListPage } from './drupal-list';
import { DrupalService } from './drupal.service';

@NgModule({
	imports: [
		IonicModule,
		PipesModule
	],
	declarations: [
		DrupalItemPage,
		DrupalListPage
	],
	entryComponents: [
		DrupalItemPage,
		DrupalListPage
	],
	providers: [DrupalService]
})
export class DrupalModule {

}