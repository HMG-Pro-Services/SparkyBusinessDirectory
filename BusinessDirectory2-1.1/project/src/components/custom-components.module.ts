import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NoItemsComponent } from './no-items/no-items.component';
import { TilesComponent } from './tiles/tiles.component';

@NgModule({
	imports: [IonicModule],
	declarations: [TilesComponent, NoItemsComponent],
	exports: [TilesComponent, NoItemsComponent]
})
export class CustomComponentsModule {
}