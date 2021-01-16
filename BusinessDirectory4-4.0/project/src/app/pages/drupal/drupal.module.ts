import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../../pipes/pipes.module';
import { DrupalItemPage } from './item/drupal.item.page';
import { DrupalListPage } from './list/drupal.list.page';

const routes: Routes = [
  {
    path: '',
    component: DrupalListPage,
  },
  {
    path: ':id',
    component: DrupalItemPage,
  },
];

@NgModule({
  imports: [
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [
    DrupalItemPage,
    DrupalListPage,
  ],
})
export class DrupalModule {}
