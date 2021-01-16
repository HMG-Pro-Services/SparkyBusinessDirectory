import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { CatalogsItemPage } from './catalogs-item';
import { CatalogsListPage } from './catalogs-list';
import { CatalogsService } from './catalogs.service';

@NgModule({
	imports: [
		IonicModule,
		PipesModule,
		CustomComponentsModule
	],
	declarations: [
		CatalogsItemPage,
		CatalogsListPage
	],
	entryComponents: [
		CatalogsItemPage,
		CatalogsListPage
	],
	providers: [CatalogsService]
})
export class CatalogsModule {

}