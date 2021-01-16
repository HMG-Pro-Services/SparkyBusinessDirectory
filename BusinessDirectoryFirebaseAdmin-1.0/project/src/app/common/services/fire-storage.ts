import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { uuid } from '../uuid';
import { IStorage } from './storage.interface';

@Injectable()
export class FireStorage implements IStorage {
	private FILES_FOLDER = 'files';

	upload(file: File): Subject<any> {
		let storageRef = firebase.storage().ref();

		let path = `${this.FILES_FOLDER}/${uuid()}-${file.name}`;
		let uploadTask: firebase.storage.UploadTask = storageRef.child(path).put(file);

		let subject = new Subject();

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot: any) => {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				subject.next({
					eventType: 'PROGRESS_CHANGED',
					progress: progress
				});
			},
			(error) => {
				subject.error(error);
			},
			() => {
				// let url = uploadTask.snapshot.downloadURL;
				uploadTask.snapshot.ref
				.getDownloadURL()
				.then((url: string) => {
					subject.next({
						eventType: 'UPLOADED',
						data: {
							url: url,
							path: path
						}
					});
					subject.complete();
				});
			}
		);

		return subject;
	}

	remove(path): Promise<void> {
		let storageRef = firebase.storage().ref();

		return <Promise<void>>storageRef.child(path).delete();
	}
}
