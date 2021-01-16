import { ViewContainerRef, ViewChild, Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-warning',
	template: `
		<div [ngClass]="{ 'has-warning': to['warn']}">
			<template #fieldComponent></template>
		</div>
	`,
})
export class FormlyWrapperWarning extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}

@Component({
	selector: 'formly-wrapper-validation-messages',
	template: `
		<template #fieldComponent></template>
		<div>
			<small class="text-muted text-warning" *ngIf="to['warn']" role="alert">
				{{to['warnMessage']}}
			</small>
		</div>
	`,
})
export class FormlyWrapperWarningMessage extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
