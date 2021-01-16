/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	styleUrls: [
		'app.component.scss',
		'../../node_modules/primeng/resources/primeng.min.css',
		'../../node_modules/primeng/resources/themes/bootstrap/theme.css'
	],
	template: `<router-outlet></router-outlet>`,
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}