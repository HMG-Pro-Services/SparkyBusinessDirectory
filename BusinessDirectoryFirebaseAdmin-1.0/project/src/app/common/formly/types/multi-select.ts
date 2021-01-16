import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-multi-select',
	template: `
		<mat-select [formControl]="formControl" class="form-control" [formlyAttributes]="field" [multiple]="to.multiple">
			<mat-option *ngFor="let item of to.dataSource | async" [value]="item[valueProp]">{{item[labelProp]}}</mat-option>
		</mat-select>
	`
})
export class FormlyFieldMultiSelect extends FieldType {
	get labelProp(): string {
		return this.to['labelProp'] || 'label';
	}

	get valueProp(): string {
		return this.to['valueProp'] || 'value';
	}
}
