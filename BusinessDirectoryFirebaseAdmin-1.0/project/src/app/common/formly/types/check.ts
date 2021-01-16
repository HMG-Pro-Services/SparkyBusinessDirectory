import { Component } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-check',
	template: `
		<label class="custom-control custom-checkbox">
			<input type="checkbox" [formControl]="formControl"
				*ngIf="!to.hidden" value="on"
				[formlyAttributes]="field" class="custom-control-input">
			{{to.label}}
			<span class="custom-control-indicator"></span>
		</label>
	`,
})
export class FormlyFieldCheck extends FieldType {
	static createControl(model: any, field: FormlyFieldConfig): AbstractControl {
		let value = model ? true : false;
		return new FormControl(
			{ value: value, disabled: field.templateOptions.disabled },
			field.validators ? field.validators.validation : undefined,
			field.asyncValidators ? field.asyncValidators.validation : undefined,
		);
	}
}
