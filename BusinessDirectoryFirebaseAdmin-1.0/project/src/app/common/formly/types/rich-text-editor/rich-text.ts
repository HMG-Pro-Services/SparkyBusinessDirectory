import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FieldType } from '@ngx-formly/core';
import { CKEditorDialog } from './ckeditor.dialog';

@Component({
	selector: 'formly-field-rich-text',
	template: `
		<button type="button" class="btn btn-primary btn-sm" (click)="edit()">Edit</button>
		<button type="button" class="btn btn-sm" (click)="reset()">Reset</button>
		<div [innerHTML]="model[key]"></div>
	`
})
export class FormlyFieldRichText extends FieldType {
	constructor(private dialog: MatDialog) {
		super();
	}

	edit() {
		let dialogRef = this.dialog.open(CKEditorDialog, {
			data: {
				text: this.model[this.key] || this.to['defaultValue'],
				to: this.to
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.formControl.setValue(result.text);
				this.model[this.key] = result.text;
				this.formControl.markAsDirty();
			}
		});
	}

	reset() {
		this.formControl.setValue('');
		this.model[this.key] = '';

		this.formControl.markAsDirty();
	}
}
