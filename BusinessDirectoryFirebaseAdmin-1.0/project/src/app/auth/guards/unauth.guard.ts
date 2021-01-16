import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate(): Promise<boolean> {
		return this.authService.afAuth.authState
			.map(authState => !authState)
			.do(unauthenticated => {
				if (!unauthenticated) {
					this.router.navigate(['/tasks']);
				}
			})
			.take(1)
			.toPromise();
	}
}
