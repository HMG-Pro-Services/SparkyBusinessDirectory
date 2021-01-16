import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
	templateUrl: 'sign-up.component.html',
	styleUrls: ['sign-up.component.scss']
})

export class SignUpComponent {
	signupForm: FormGroup;
	error: string;

	appName = '';
	appSubtitle = '';
	appSlogan = '';

	constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.error = '';

		this.appName = environment.app.name;
		this.appSubtitle = environment.app.subtitle;
		this.appSlogan = environment.app.slogan;
	}

	signUp() {
		let data = this.signupForm.value;
		this.auth.signUp(data.email, data.password).then(
			() => this.postSignUp(),
			error => this.error = error.message
		);
	}

	private postSignUp(): void {
		this.router.navigate(['/shell']);
	}
}
