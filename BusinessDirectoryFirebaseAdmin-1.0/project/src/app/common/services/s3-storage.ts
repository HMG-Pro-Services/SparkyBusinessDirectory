import { environment } from '../../../environments/environment';
import { IStorage } from './storage.interface';
import * as AWS from 'aws-sdk';
import { Subject } from 'rxjs';

export class S3Storage implements IStorage {
	private s3: AWS.S3;

	constructor() {
		AWS.config.update({
			accessKeyId: environment.s3.accessKeyId,
			secretAccessKey: environment.s3.secretAccessKey
		});
		this.s3 = new AWS.S3();
	}

	upload(file: File): Subject<any> {
		let filename = this.generateFilename(file.name);
		console.log(filename);
		let params = {
			Key: filename,
			ContentType: 'image/jpeg',
			Body: file,
			ACL: 'public-read',
			Bucket: environment.s3.bucket
		};

		let subject = new Subject();

		this.s3
			.putObject(params, (err, data: AWS.S3.Types.PutObjectOutput) => {
				if (err) {
					subject.error(err);
				} else {
					console.log(data);
					let url = this.getFullUrl(filename);
					subject.next({
						eventType: 'UPLOADED',
						data: {
							url: url,
							path: url
						}
					});
					subject.complete();
				}
			})
			.on('httpUploadProgress', function (progress) {
				subject.next({
					eventType: 'PROGRESS_CHANGED',
					progress: progress.loaded / progress.total * 100
				});
				console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
			});

		return subject;
	}

	remove(path): Promise<void> {
		let params: AWS.S3.Types.DeleteObjectRequest = {
			Key: this.getFilename(path),
			Bucket: environment.s3.bucket
		};

		return new Promise<void>((resolve, reject) => {
			this.s3
				.deleteObject(params, function (err) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
		});
	}

	private getFullUrl(filename) {
		return 'https://s3.amazonaws.com/' + environment.s3.bucket + '/' + filename;
	}

	private generateFilename(name: string) {
		if (!name) {
			return `${new Date().getTime()}.jpg`;
		}

		let index = name.lastIndexOf('.');
		return `${new Date().getTime()}.${name.substr(index + 1).toLowerCase()}`;
	}

	private getFilename(url) {
		return url.substring(url.lastIndexOf('/') + 1);
	}
}