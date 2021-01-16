import { Component, ViewEncapsulation } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-date-time-picker',
	template: `
		<p-calendar [formControl]="formControl" [showTime]="to.showTime" hourFormat="24"></p-calendar>
	`,
	styles: [
		`
			p-calendar {
				display: block;
			}
			span.ui-calendar {
				width: 100% !important;
			}
			.ui-inputtext { width: 100% !important; }
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class FormlyFieldDateTimePicker extends Field {
}
