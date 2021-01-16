import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	templateUrl: 'forgot-password.component.html',
	styleUrls: ['forgot-password.component.scss']
})

export class ForgotPasswordComponent {
	email: string = '';
	error: string;
	message: string;

	appName = '';
	appSubtitle = '';
	appSlogan = '';

	constructor(private auth: AuthService, private router: Router) {
	}

	ngOnInit() {
		this.error = '';


		this.appName = environment.app.name;
		this.appSubtitle = environment.app.subtitle;
		this.appSlogan = environment.app.slogan;
	}

	reset() {
		this.auth.resetPassword(this.email)
			.then(
				() => {
					this.error = '';
					this.message = 'Email has been sent';
				},
				(x) => {
					this.error = x.message;
					this.message = '';
				}
			);
	}
}
