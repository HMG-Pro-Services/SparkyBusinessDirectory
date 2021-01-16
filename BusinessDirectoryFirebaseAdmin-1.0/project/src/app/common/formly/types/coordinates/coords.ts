import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FieldType } from '@ngx-formly/core';
import { EditCoordsDialog } from './edit-coords.dialog';

@Component({
	selector: 'formly-field-multi-select',
	template: `
		<button class="btn btn-link" (click)="add()" [disabled]="!canAdd">Add</button>
		<table class="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Coordinates</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let item of model[key]; let i = index">
					<td>{{item.title}}</td>
					<td>{{item.latitude}},{{item.longitude}}</td>
					<td>
						<button class="btn btn-link" (click)="edit(item)">Edit</button>
					</td>
					<td>
						<button class="btn btn-link" (click)="remove(i)">X</button>
					</td>
				</tr>
			</tbody>
		</table>
	`
})
export class FormlyFieldCoords extends FieldType {
	get canAdd(): boolean {
		let items = this.model[this.key];
		return !items || !this.to.maxRecords || items.length < this.to.maxRecords;
	}

	constructor(private dialog: MatDialog) {
		super();
	}

	add() {
		let dialogRef = this.dialog.open(EditCoordsDialog, {
			data: {
				longitude: this.to['longitude'],
				latitude: this.to['latitude'],
				to: this.to
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.model[this.key] = this.model[this.key] || [];
				this.model[this.key].push({
					title: result.title,
					longitude: result.longitude,
					latitude: result.latitude
				});
				this.formControl.markAsDirty();
			}
		});
		return false;
	}

	edit(item) {
		let dialogRef = this.dialog.open(EditCoordsDialog, {
			data: {
				longitude: item.longitude,
				latitude: item.latitude,
				title: item.title,
				to: this.to
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				item.longitude = result.longitude;
				item.latitude = result.latitude;
				item.title = result.title;
				this.formControl.markAsDirty();
			}
		});
		return false;
	}

	remove(index: number) {
		this.model[this.key].splice(index, 1);
		this.formControl.markAsDirty();
		return false;
	}
}