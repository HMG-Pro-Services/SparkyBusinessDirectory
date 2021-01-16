import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FieldType } from '@ngx-formly/core';
import { days } from './weekdays';
import { EditHoursDialog } from './edit-hours.dialog';

@Component({
	selector: 'formly-field-open-hours',
	template: `
		<button class="btn btn-link" (click)="add()">Add</button>
		<table class="table">
			<thead>
				<tr>
					<th>Day</th>
					<th>Open at</th>
					<th>Close at</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody *ngIf="openHours">
				<tr *ngFor="let item of openHours.days | orderBy: ['day']; let i = index">
					<td>{{weekdays[item.day - 1]}}</td>
					<td>{{item.openAt.hour | number: '2.0'}}:{{item.openAt.minute | number: '2.0'}}</td>
					<td>{{item.closeAt.hour | number: '2.0'}}:{{item.closeAt.minute | number: '2.0'}}</td>
					<td>
						<button class="btn btn-link" (click)="edit(item)">Edit</button>
					</td>
					<td>
						<button class="btn btn-link" (click)="remove(i)">X</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="form-group">
			<label for="zone">Zone</label>
			<input type="number" class="form-control" id="zone" placeholder="Zone" [value]="zone" (keyup)="changeZone(zon.value)" #zon>
		</div>
	`
})
export class FormlyFieldOpenHours extends FieldType {
	weekdays = days;

	get openHours() {
		return this.model[this.key];
	}

	get zone() {
		return this.model[this.key] ? this.model[this.key].zone : 0;
	}

	constructor(private dialog: MatDialog) {
		super();
	}

	changeZone(zone: string) {
		this.model[this.key] = this.model[this.key] || { zone: 0, days: [] };
		this.model[this.key].zone = parseInt(zone, 10);
		this.formControl.markAsDirty();
	}

	add() {
		let dialogRef = this.dialog.open(EditHoursDialog, {
			data: {
				to: this.to
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.model[this.key] = this.model[this.key] || { zone: 0, days: [] };
				result.day.openAt.epoch = this.createEpochFromHours(result, 'openAt');
				result.day.closeAt.epoch = this.createEpochFromHours(result, 'closeAt');
				this.model[this.key].days.push(result.day);
				this.formControl.markAsDirty();
			}
		});
		return false;
	}

	edit(item) {
		let dialogRef = this.dialog.open(EditHoursDialog, {
			data: {
				day: item,
				to: this.to
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				item.day = result.day.day;
				item.openAt = result.day.openAt;
				item.openAt.epoch = this.createEpochFromHours(result, 'openAt');
				item.closeAt = result.day.closeAt;
				item.closeAt.epoch = this.createEpochFromHours(result, 'closeAt');
				this.formControl.markAsDirty();
			}
		});
		return false;
	}

	remove(index: number) {
		this.openHours.days.splice(index, 1);
		this.formControl.markAsDirty();
		return false;
	}

	createEpochFromHours(result, mode: string): number {
		try {
			let epoch = new Date().setHours(result.day[mode].hour, result.day[mode].minute);
			return epoch;
		} catch (err) {
			console.log(err);
			return 0;
		}
	}
}
