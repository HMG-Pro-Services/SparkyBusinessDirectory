import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ProductsItemPage } from './products-item';
import { ProductsListPage } from './products-list';
import { ProductsService } from './products.service';

@NgModule({
	imports: [
		IonicModule,
		PipesModule,
		CustomComponentsModule
	],
	declarations: [
		ProductsItemPage,
		ProductsListPage
	],
	entryComponents: [
		ProductsItemPage,
		ProductsListPage
	],
	providers: [ProductsService]
})
export class ProductsModule {

}