import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-panel',
	encapsulation: ViewEncapsulation.None,
	template: `
		<div class="card">
			<div class="card-header">{{to.title}}</div>
			<div class="card-block">
				<ng-container #fieldComponent></ng-container>
			</div>
		</div>
  `
})
export class FormlyPanelWrapper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}