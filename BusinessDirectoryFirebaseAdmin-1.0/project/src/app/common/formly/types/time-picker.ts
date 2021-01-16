import { Component } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-time-picker',
	template: `
		<ngb-timepicker [formControl]="formControl" [ngClass]="{'form-control-danger': valid}"
			[spinners]="false">
		</ngb-timepicker>
  `
})
export class FormlyFieldTimePicker extends Field {
}
