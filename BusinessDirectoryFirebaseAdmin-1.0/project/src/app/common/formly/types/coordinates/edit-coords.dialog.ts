import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';

@Component({
	selector: 'edit-coords-dialog',
	templateUrl: './edit-coords.dialog.html',
	styleUrls: ['./edit-coords.dialog.scss']
})
export class EditCoordsDialog {
	longitude: number = 0;
	latitude: number = 0;
	to: FormlyTemplateOptions;

	form: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<EditCoordsDialog>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		fb: FormBuilder
	) {
		this.to = data.to;

		this.latitude = data.latitude;
		this.longitude = data.longitude;
		this.form = fb.group({
			title: [data.title || '', Validators.required],
			latitude: [data.latitude, Validators.required],
			longitude: [data.longitude, Validators.required]
		});
	}

	mapClick($event) {
		this.latitude = parseFloat($event.coords.lat);
		this.longitude = parseFloat($event.coords.lng);

		this.form.setValue({
			title: this.form.value.title,
			longitude: $event.coords.lng,
			latitude: $event.coords.lat
		});
		this.form.markAsDirty();
	}

	longitudeChange(value) {
		this.longitude = parseFloat(value);
	}

	latitudeChange(value) {
		this.latitude = parseFloat(value);
	}

	ok(value: any) {
		let result = {
			status: 'OK',
			title: value.title,
			latitude: parseFloat(value.latitude),
			longitude: parseFloat(value.longitude)
		};
		this.dialogRef.close(result);
	}

	cancel() {
		this.dialogRef.close();
	}
}
