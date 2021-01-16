import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsItemComponent } from './products-item/products-item.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  {
    path: ':id',
    component: ProductsItemComponent,
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
    ProductsListComponent,
    ProductsItemComponent,
  ],
})
export class ProductsModule { }
