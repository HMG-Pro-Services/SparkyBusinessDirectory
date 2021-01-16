import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesItemComponent } from './services-item/services-item.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: '',
    component: ServicesListComponent,
  },
  {
    path: ':id',
    component: ServicesItemComponent,
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
    ServicesListComponent,
    ServicesItemComponent,
  ],
})
export class ServicesModule { }
