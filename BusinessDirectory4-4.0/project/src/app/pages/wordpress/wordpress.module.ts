import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { WordPressItemPage } from './item/wordpress.item.page';
import { WordPressListPage } from './list/wordpress.list.page';

const routes: Routes = [
  {
    path: '',
    component: WordPressListPage,
  },
  {
    path: ':id',
    component: WordPressItemPage,
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
    WordPressItemPage,
    WordPressListPage,
  ],
})
export class WordpressModule {}
