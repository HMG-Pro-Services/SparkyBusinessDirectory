import { Component } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-datepicker',
	template: `
		<div class="input-group">
			<input [formControl]="formControl" class="form-control" ngbDatepicker #d="ngbDatepicker"
				placeholder="yyyy-mm-dd" [formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}"
				[minDate]="minDate">
			<div class="input-group-addon" (click)="d.toggle()">
				<img src="assets/icon/svg/ic_date_range_black_24px.svg" style="width: 1.2rem; height: 1rem; cursor: pointer;"/>
			</div>
		</div>
  `,
})
export class FormlyFieldDatePicker extends Field {
	get minDate() {
		let minDateField = this.to.minDateField;
		if (minDateField) {
			return this.form.value[minDateField];
		}
		return null;
	}
}
