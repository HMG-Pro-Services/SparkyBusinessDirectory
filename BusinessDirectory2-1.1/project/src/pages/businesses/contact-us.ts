import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CallService } from '../../common/services/call.service';
import { EmailService } from '../../common/services/email.service';
import { InAppBrowserService } from '../../common/services/in-app-browser.service';
import { MapsService } from '../../common/services/maps.service';
import { OpenHoursService } from '../../common/services/open-hours.service';

@Component({
	selector: 'page-contact-us',
	templateUrl: './contact-us.html'
})
export class ContactUsPage {
	business: any;
	days: any[];

	constructor(
		navParams: NavParams,
		private callService: CallService,
		private emailService: EmailService,
		private inBrowser: InAppBrowserService,
		private openHoursService: OpenHoursService,
		private mapsService: MapsService
	) {
		this.business = navParams.get('business');
		this.days = this.openHoursService.getOpenHours(this.business.openhours);
	}

	call(phone: string) {
		this.callService.call(phone);
	}

	sendEmail(email: string) {
		this.emailService.sendEmail(email);
	}

	openUrl(url: string) {
		this.inBrowser.open(url);
	}

	getDirections(officeLocation: string) {
		this.mapsService.openMapsApp(officeLocation, this.business.title);
	}
}
