import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'no-items',
	templateUrl: './no-items.component.html'
})
export class NoItemsComponent {
	@Output() create = new EventEmitter<void>();
}