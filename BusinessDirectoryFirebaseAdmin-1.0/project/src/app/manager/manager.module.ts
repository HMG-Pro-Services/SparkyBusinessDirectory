import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ItemsListComponent } from './items-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewItemDialog } from './new-item.dialog';
import { ItemDetailsComponent } from './item-details.component';
import { AgmCoreModule } from '@agm/core';
import { FormlyFormEnricher } from './formly-form-enricher';
import { ItemsCollectionViewStore } from './items-collection-view.store';

export const managerRoutes: Routes = [
	{ path: 'manager/:itemsType', component: ItemsListComponent, pathMatch: 'full' },
	{ path: 'manager/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full' },
	{ path: 'manager/:parentType/:parentId/:itemsType', component: ItemDetailsComponent, pathMatch: 'full' },
	{ path: 'manager/:parentType/:parentId/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full' }
];


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule,
		CKEditorModule,
		AgmCoreModule
	],
	exports: [],
	declarations: [
		ItemsListComponent,
		ItemDetailsComponent,
		NewItemDialog
	],
	entryComponents: [NewItemDialog],
	providers: [FormlyFormEnricher, ItemsCollectionViewStore],
})
export class ManagerModule {
}
