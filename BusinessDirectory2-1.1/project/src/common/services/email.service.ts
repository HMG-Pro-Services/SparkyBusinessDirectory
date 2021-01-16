import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
	sendEmail(email: string): void {
		window.location.href = 'mailto:' + email;
	}
}