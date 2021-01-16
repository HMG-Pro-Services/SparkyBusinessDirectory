import { Injectable } from '@angular/core';

@Injectable()
export class CallService {
	call(phoneNumber: string): void {
		window.location.href = 'tel:' + phoneNumber;
	}
}