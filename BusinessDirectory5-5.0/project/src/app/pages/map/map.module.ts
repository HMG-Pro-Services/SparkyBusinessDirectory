import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { MapPage } from './map.page';
import { Config } from 'src/config';

const routes: Routes = [
  {
    path: '',
    component: MapPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: Config.mapApiKey,
    }),
    AgmSnazzyInfoWindowModule,
  ],
  declarations: [MapPage],
})
export class MapPageModule {}
