import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CallService {

  constructor() { }

  call(phoneNumber: string): void {
    window.location.href = 'tel:' + phoneNumber;
  }
}
