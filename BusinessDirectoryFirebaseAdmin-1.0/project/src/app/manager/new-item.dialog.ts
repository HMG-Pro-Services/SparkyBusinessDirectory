import { MatDialogRef } from '@angular/material';

import { Component } from '@angular/core';
@Component({
	selector: 'new-item-dialog',
	templateUrl: 'new-item.dialog.html',
	styleUrls: ['new-item.dialog.scss']
})
export class NewItemDialog {
	itemName: string = '';

	constructor(private dialogRef: MatDialogRef<NewItemDialog>) {}

	create() {
		this.dialogRef.close(this.itemName);
	}

	cancel() {
		this.dialogRef.close();
	}
}