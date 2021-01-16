import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CatalogsListComponent } from './catalogs-list/catalogs-list.component';
import { CatalogsItemComponent } from './catalogs-item/catalogs-item.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: '',
    component: CatalogsListComponent,
  },
  {
    path: ':id',
    component: CatalogsItemComponent,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
  ],
  declarations: [
    CatalogsListComponent,
    CatalogsItemComponent,
  ],
})
export class CatalogsModule { }
