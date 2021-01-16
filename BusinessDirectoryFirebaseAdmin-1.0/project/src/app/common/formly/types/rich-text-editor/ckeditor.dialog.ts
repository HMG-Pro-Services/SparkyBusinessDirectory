import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';

@Component({
	selector: 'ckeditor-dialog',
	templateUrl: './ckeditor.dialog.html',
	styleUrls: ['./ckeditor.dialog.scss']
})
export class CKEditorDialog {
	text: string = '';
	to: FormlyTemplateOptions;

	constructor(private dialogRef: MatDialogRef<CKEditorDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
		if (data) {
			this.text = data.text;
			this.to = data.to || {};
		}
	}

	ok() {
		this.dialogRef.close({
			status: 'OK',
			text: this.text
		});
	}

	cancel() {
		this.dialogRef.close();
	}
}
