import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ServicesItemPage } from './services-item';
import { ServicesListPage } from './services-list';
import { ServicesService } from './services.service';

@NgModule({
	imports: [
		IonicModule,
		PipesModule,
		CustomComponentsModule
	],
	declarations: [
		ServicesItemPage,
		ServicesListPage
	],
	entryComponents: [
		ServicesItemPage,
		ServicesListPage
	],
	providers: [ServicesService]
})
export class ServicesModule {

}