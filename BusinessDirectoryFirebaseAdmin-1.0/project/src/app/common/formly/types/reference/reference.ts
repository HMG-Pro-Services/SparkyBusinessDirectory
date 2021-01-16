import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'formly-field-reference',
	template: `
		<div *ngIf="model.$key">
			<button class="btn btn-link" (click)="add()">Add</button>
			<table class="table">
				<tbody>
					<tr *ngFor="let item of data | async; let i = index">
						<td>{{item[to.summaryField]}}</td>
						<td>
							<button class="btn btn-link" (click)="edit(item)">Edit</button>
						</td>
						<td>
							<button class="btn btn-link" (click)="remove(item)">X</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div *ngIf="!model.$key">
			Save this item before adding children
		</div>
	`
})
export class FormlyFieldReference extends FieldType {
	private _data: Observable<any[]>;

	get data() {
		if (!this._data) {
			this._data = this.to.load(this.to.collection, this.model.$key);
		}
		return this._data;
	}

	constructor() {
		super();
	}

	add() {
		this.to.add(this.to.parentCollection, this.model.$key, this.to.collection);
		return false;
	}

	edit(item) {
		this.to.edit(this.to.parentCollection, this.model.$key, this.to.collection, item.$key);
		return false;
	}

	remove(item: any) {
		this.to.remove(this.to.collection, item);
		return false;
	}
}