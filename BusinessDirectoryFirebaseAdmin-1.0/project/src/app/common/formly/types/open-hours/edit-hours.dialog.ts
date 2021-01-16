import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import { days } from './weekdays';

@Component({
	selector: 'edit-hours-dialog',
	templateUrl: './edit-hours.dialog.html'
})
export class EditHoursDialog {
	weekdays = days;

	day: { day: number; openAt: { hour: number, minute: number }; closeAt: { hour: number, minute: number } };
	to: FormlyTemplateOptions;

	form: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<EditHoursDialog>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		fb: FormBuilder
	) {
		this.to = data.to;

		this.day = data.day || { day: 1, openAt: { hour: 8, minute: 0 }, closeAt: { hour: 22, minute: 0 } };

		this.form = fb.group({
			day: [this.day.day, Validators.required],
			openAt: [this.day.openAt, Validators.required],
			closeAt: [this.day.closeAt, Validators.required]
		});
	}

	ok(value: any) {
		let result = {
			status: 'OK',
			day: value
		};
		this.dialogRef.close(result);
	}

	cancel() {
		this.dialogRef.close();
	}
}
