import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  constructor() { }

  sendEmail(email: string): void {
    window.location.href = 'mailto:' + email;
  }
}
