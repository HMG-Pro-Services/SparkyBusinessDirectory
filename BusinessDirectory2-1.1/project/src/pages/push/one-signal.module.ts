import { NgModule } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicModule } from 'ionic-angular';
import { OneSignalListenerService } from './one-signal-listener.service';

@NgModule({
	imports: [IonicModule],
	providers: [
		OneSignalListenerService,
		OneSignal
	]
})
export class OneSignalModule {

}