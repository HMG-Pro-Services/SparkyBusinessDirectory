import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TilesComponent } from './tiles/tiles.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [
    TilesComponent,
  ],
  exports: [
    TilesComponent,
  ],
})
export class CustomComponentsModule { }
