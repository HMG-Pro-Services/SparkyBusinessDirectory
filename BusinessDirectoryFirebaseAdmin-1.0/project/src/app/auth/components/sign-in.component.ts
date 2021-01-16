import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	templateUrl: 'sign-in.component.html',
	styleUrls: ['sign-in.component.scss']
})

export class SignInComponent {
	loginForm: FormGroup;
	error: string;

	appName = '';
	appSubtitle = '';
	appSlogan = '';


	constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.error = '';

		this.appName = environment.app.name;
		this.appSubtitle = environment.app.subtitle;
		this.appSlogan = environment.app.slogan;
	}

	reset() {
		let data = this.loginForm.value;
		this.auth.resetPassword(data.email).then(x => console.log(x));
	}

	signInWithEmail() {
		let data = this.loginForm.value;
		this.auth.signInWithEmail(data.email, data.password).then(
			() => this.postSignIn(),
			error => this.error = error.message
		);
	}

	signInWithGoogle(): void {
		this.auth.signInWithGoogle()
			.then(() => this.postSignIn());
	}

	private postSignIn(): void {
		this.router.navigate(['/shell']);
	}
}
