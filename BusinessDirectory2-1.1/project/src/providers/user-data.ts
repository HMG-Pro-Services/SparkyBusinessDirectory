import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserData {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	getName() {
		return this.user && (this.user.displayName || this.getUsername());
	}

	getUsername() {
		let email = this.getEmail() || '';
		let indexOfAt = email.indexOf('@');
		return indexOfAt > 0 ? email.substring(0, indexOfAt) : 'Anonymous';
	}

	getEmail() {
		return this.user && this.user.email;
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	get id(): string {
		return this.authenticated ? this.user.uid : '';
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	signOut(): firebase.Promise<void> {
		return this.afAuth.auth.signOut();
	}
}
