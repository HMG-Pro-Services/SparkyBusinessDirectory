import { Injectable } from '@angular/core';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../../common/services/is-cordova-available';
import { oneSignalAppId, sender_id } from '../../config';

@Injectable()
export class OneSignalListenerService {

	constructor(private oneSignal: OneSignal) {
		if (isCordovaAvailable()) {
			this.oneSignal.startInit(oneSignalAppId, sender_id);
			this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
			this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
			this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
			this.oneSignal.endInit();
		}
	}

	private onPushReceived(payload: OSNotificationPayload) {
		alert('Push recevied:' + payload.body);
	}

	private onPushOpened(payload: OSNotificationPayload) {
		alert('Push opened: ' + payload.body);
	}
}