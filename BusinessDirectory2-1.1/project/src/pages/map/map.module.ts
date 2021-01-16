import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MapService } from '../../services/map.service';
import { MapPage } from './map';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
	imports: [IonicModule, AgmCoreModule, AgmSnazzyInfoWindowModule],
	entryComponents: [MapPage],
	declarations: [MapPage],
	exports: [MapPage],
	providers: [MapService]
})
export class MapModule {

}