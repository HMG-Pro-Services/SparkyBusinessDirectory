import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IonicRatingModule } from 'ionic-rating';

import { BusinessComponent } from './business/business.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessesFilterComponent } from './businesses-filter/businesses-filter.component';

const routes: Routes = [
  { path: '', component: BusinessComponent },
  { path: ':id', component: BusinessDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    IonicRatingModule,
  ],
  declarations: [
    BusinessComponent,
    BusinessDetailComponent,
    BusinessesFilterComponent,
  ],
  entryComponents: [
    BusinessesFilterComponent,
  ],
})
export class BusinessPageModule {}
