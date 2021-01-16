import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService {
	roles: string[] = [];

	private user: firebase.User = null;

	constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
		afAuth.authState.subscribe((user: firebase.User) => {
			this.user = user;
		});
	}

	auth(): Observable<boolean> {
		return this.afAuth.authState
			.take(1)
			.flatMap(auth => {
				if (!auth) {
					return of(false);
				}

				return this.afDb.list<any>('users/' + auth.uid).valueChanges()
					.do(roles => {
						this.roles = roles;
					})
					.map(() => true);
			});
	}

	getName() {
		return this.user.displayName;
	}

	getEmail() {
		return this.user.email;
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	get id(): string {
		return this.authenticated ? this.user.uid : '';
	}

	resetPassword(email): Promise<any> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	signInWithEmail(email, password): Promise<any> {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	signUp(email, password): Promise<any> {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	signIn(provider: firebase.auth.AuthProvider): Promise<firebase.auth.AuthCredential> {
		return this.afAuth.auth.signInWithRedirect(provider)
			.catch(error => console.log('ERROR @ AuthService#signIn() :', error));
	}

	signInWithGithub(): Promise<firebase.auth.AuthCredential> {
		return this.signIn(new firebase.auth.GithubAuthProvider());
	}

	signInWithGoogle(): Promise<firebase.auth.AuthCredential> {
		return this.signIn(new firebase.auth.GoogleAuthProvider());
	}

	signInWithTwitter(): Promise<firebase.auth.AuthCredential> {
		return this.signIn(new firebase.auth.TwitterAuthProvider());
	}

	signOut(): Promise<any> {
		return this.afAuth.auth.signOut();
	}

	isAdmin(): boolean {
		return this.roles.indexOf('admin') >= 0;
	}
}
