import { Component, ViewEncapsulation, HostListener } from '@angular/core';

@Component({
	selector: 'shell',
	templateUrl: 'shell.component.html',
	styleUrls: ['./shell.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ShellComponent {
	mode = 'side';
	opened = true;

	constructor() {
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.fitLayoutToWidth(event);
	}

	private fitLayoutToWidth(event) {
		if (event.target.innerWidth < 960) {
			this.mode = 'over';
			this.opened = false;
		} else {
			this.mode = 'side';
			this.opened = true;
		}
	}
}