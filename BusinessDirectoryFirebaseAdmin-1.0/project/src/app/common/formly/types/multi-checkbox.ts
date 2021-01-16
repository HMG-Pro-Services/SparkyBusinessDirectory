import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-multi-checkbox',
	template: `
		<div *ngFor="let option of to.options" class="checkbox">
			<label class="custom-control custom-checkbox">
				<input type="checkbox" [value]="option.value" [formControl]="formControl.get(option.key)"
					[formlyAttributes]="field" class="custom-control-input">
				{{ option.value }}&nbsp;<span *ngIf="option.description" [innerHTML]="option.description"></span>
				<span class="custom-control-indicator"></span>
			</label>
		</div>
	`
})
export class FormlyFieldMultiCheckbox extends FieldType {
	static createControl(model: any, field: FormlyFieldConfig): AbstractControl {
		const fieldTemplateOptions = <any[]>field.templateOptions.options;

		let controlGroupConfig = fieldTemplateOptions.reduce((previous, option) => {
			previous[option.key] = new FormControl(model ? model[option.key] : undefined);
			return previous;
		}, {});

		return new FormGroup(
			controlGroupConfig,
			field.validators ? field.validators.validation : undefined,
			field.asyncValidators ? field.asyncValidators.validation : undefined
		);
	}
}
