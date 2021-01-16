import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Field } from '@ngx-formly/core';
import { ConfirmDialog } from '../../../dialogs/confirm.dialog';
import { MatDialog } from '@angular/material';


@Component({
	selector: 'formly-field-file-upload',
	templateUrl: './file-upload.html',
	styleUrls: ['./file-upload.scss']
})
export class FormlyFieldFileUpload extends Field {
	@ViewChildren('fileInput') fileInputs: QueryList<ElementRef>;
	pictures: any[];

	private downloadableExtensions = ['xls', 'xlsx', 'txt', 'pdf', 'csv'];

	constructor(private dialog: MatDialog) {
		super();
	}

	get maxFiles() {
		return this.to['maxFiles'] || 1;
	}

	ngOnInit() {
		this.tryAddControl();
	}

	fileChange(event, picture) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];

			if (!picture.url) {
				this.uploadFile(file, picture);
			} else {
				this.clearInput(picture, true).then(() => {
					console.log('resolve work');
					return this.uploadFile(file, picture);
				});
			}
		}
	}

	upload(index) {
		this.fileInputs.toArray()[index].nativeElement.click();
	}

	remove(picture, leaveControl): Promise<void> {
		let data = {
			title: 'Delete item',
			message: 'Do you want to delete the item?'
		};
		return new Promise(resolve => {
			this.dialog.open(ConfirmDialog, { data: data })
				.afterClosed().subscribe(status => {
				if (status === 'OK') {
					resolve(this.clearInput(picture, leaveControl));
				}
			});
		});
	}

	clearInput(picture, leaveControl) {
		let emptyField = () => {
			this.formControl.setValue(null);
			picture.url = null;
			picture.path = null;

			if (!leaveControl) {
				this.removeEmptyControls();
			}

			this.model[this.key] = this.pictures
				.filter(pic => pic.url)
				.map(pic => Object.assign({}, pic));

			this.formControl.markAsDirty();
		};
		return this.to['remove'](picture.path).then(
			() => emptyField(),
			() => emptyField()
		);
	}

	getActionLabel(url: string) {
		return this.isPreviewable(url) ? 'Open / Preview' : 'Download';
	}

	isPreviewable(url: string) {
		let index = url.indexOf('?');
		if (index > 0) {
			url = url.substr(0, index);
		}

		index = url.lastIndexOf('.');
		let ext = url.substr(index + 1).toLowerCase();

		return this.downloadableExtensions.indexOf(ext) < 0;
	}

	private uploadFile(file: File, picture) {
		picture.inProgress = true;
		this.to['upload'](file).subscribe(x => {
			if (x.eventType === 'UPLOADED') {
				picture.inProgress = false;
				picture.url = x.data.url;
				picture.path = x.data.path;

				this.model[this.key] = this.pictures
					.filter(pic => pic.url)
					.map(pic => Object.assign({}, pic));

				this.formControl.markAsDirty();

				this.tryAddControl();
			}
		});
	}

	private tryAddControl() {
		let pictures = this.pictures;
		if (!pictures) {
			pictures = this.model[this.key] ? [...this.model[this.key]] : [];
		}

		if (pictures.length < this.maxFiles) {
			pictures = [...pictures, { url: null, path: null }];
		}

		this.pictures = pictures;
	}

	private removeEmptyControls() {
		this.pictures = this.pictures.filter(x => !!x.url);
		this.tryAddControl();
	}
}
