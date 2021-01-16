import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
	@Input() sidenav: any;

	get email() {
		return this.authService.getEmail();
	}

	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}

	signOut() {
		this.authService.signOut().then(() => this.router.navigate(['/sign-in']));
	}
}