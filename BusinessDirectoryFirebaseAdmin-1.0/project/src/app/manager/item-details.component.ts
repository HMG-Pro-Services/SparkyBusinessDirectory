import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../common/services/data.service';
import { uuid } from '../common/uuid';
import { itemsFormConfig } from './form.config';
import { FormlyFormEnricher } from './formly-form-enricher';

@Component({
	selector: 'item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements AfterViewInit {
	item: any;
	fields: FormlyFieldConfig[];
	form: FormGroup;

	itemId: string;
	itemType: string;
	parentId: string;
	parentType: string;

	constructor(
		private fb: FormBuilder,
		private data: DataService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private location: Location,
		private enricher: FormlyFormEnricher
	) {
		this.parentType = route.snapshot.params['parentType'];
		this.parentId = route.snapshot.params['parentId'];
		this.itemType = route.snapshot.params['itemsType'];
		this.itemId = route.snapshot.params['id'];

		this.initFormFields();
	}

	ngAfterViewInit(): void {
		if (this.itemId) {
			this.data.loadItem(this.itemType, this.itemId)
				.subscribe(item => {
					if (!this.item) {
						this.item = this.preprocessItem(item);
					}
				});
		} else {
			this.item = {};
		}
	}

	back() {
		this.location.back();
	}

	save() {
		let item = this.prepareItem();
		this.data.saveItem(this.itemType, item)
			.then(
				() => {
					this.form.markAsPristine();

					this.snackBar.open('The changes has been saved', 'Ok', {
						duration: 3000
					});

					if (!this.itemId && item.$key) {
						this.itemId = item.$key;
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	cancel() {
		if (!this.itemId) {
			this.location.back();
		} else {
			this.data.loadItem(this.itemType, this.itemId)
				.subscribe(item => {
					this.item = this.preprocessItem(item);
					this.form.reset(this.item);

					this.snackBar.open('The changes has been canceled', 'Ok', {
						duration: 3000
					});
				});
		}
	}

	private initFormFields() {
		this.form = this.fb.group({});
		let fields: FormlyFieldConfig[] = itemsFormConfig()[this.itemType];
		this.enricher.enrichFields(fields);
		this.fields = fields;
	}

	private preprocessItem(item: any) {
		item = JSON.parse(JSON.stringify(item));

		this.fields.forEach(x => {
			if (x.type === 'date-time-picker' && item[x.key]) {
				item[x.key] = new Date(item[x.key]);
			}
		});
		return item;
	}

	private prepareItem() {
		let item = JSON.parse(JSON.stringify(this.item));
		this.fields.forEach(x => {
			if (item[x.key] && x.type === 'date-time-picker' && item[x.key].getTime) {
				item[x.key] = item[x.key].getTime();
			}

			if (item[x.key] === undefined) {
				item[x.key] = null;
			}

			if (x.fieldGroup) {
				x.fieldGroup.forEach(field => {
					if (item[x.key][field.key] === undefined) {
						item[x.key][field.key] = null;
					}
				});
			}
		});

		if (this.parentId) {
			item.parentId = this.parentId;
		}
		if (!item.$key) {
			item.$key = this.itemId || uuid();
		}

		return item;
	}
}
