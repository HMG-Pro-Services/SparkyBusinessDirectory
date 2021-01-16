import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../common/services/data.service';
import { FireStorage } from '../common/services/fire-storage';
import { S3Storage } from '../common/services/s3-storage';

@Injectable()
export class FormlyFormEnricher {
	constructor(
		private dataService: DataService,
		private router: Router,
		private db: AngularFireDatabase,
		private storage: FireStorage,
		private s3: S3Storage
	) {
	}

	enrichFields(fields: FormlyFieldConfig[]) {
		fields.forEach(field => {
			let options: any;

			switch (field.type) {
				case 'reference':
					options = this.buildReferenceOptions();
					break;
				case 'multi-select':
					options = this.buildMultiSelectOptions(field);
					break;
				case 'file-upload':
					options = this.buildFileUploadOptions(field);
					break;
				default:
					break;
			}

			if (field.templateOptions && options) {
				Object.assign(field.templateOptions, options);
			}
		});
	}

	private buildReferenceOptions() {
		let options = {
			load: (collection, parentId) => this.dataService.loadItemsByParent(collection, parentId),
			remove: (collection, item) => this.dataService.deleteItem(collection, item),
			add: (parentCollection, parentId, collection) =>
				this.router.navigate(['./shell/manager', parentCollection, parentId, collection]),
			edit: (parentCollection, parentId, collection, itemId) =>
				this.router.navigate(['./shell/manager', parentCollection, parentId, collection, itemId])
		};

		return options;
	}

	private buildMultiSelectOptions(field: FormlyFieldConfig) {
		if (!field.templateOptions.collection) {
			throw new Error(`'templateOption.collection' should be specified for 'multi-select' field. KEY = '${field.key}'`);
		}
		return {
			dataSource: this.db.list(field.templateOptions.collection).snapshotChanges()
				.map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() })))
		};
	}

	private buildFileUploadOptions(field: FormlyFieldConfig) {
		if (!field.templateOptions.storage) {
			throw new Error(`'templateOption.storage' should be specified for 'file-upload' field. KEY = '${field.key}'`);
		}

		switch (field.templateOptions.storage) {
			case 'FIRE':
				return {
					upload: (file: File) => this.storage.upload(file),
					remove: (url: string) => this.storage.remove(url)
				};
			case 'S3':
				return {
					upload: (file: File) => this.s3.upload(file),
					remove: (url: string) => this.s3.remove(url)
				};
			default:
				throw new Error(`Storage type '${field.templateOptions.storage}' is not supported for 'file-upload' field. KEY = '${field.key}'`);
		}
	}
}
