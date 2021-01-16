import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { uuid } from '../uuid';

@Injectable()
export class DataService {
	constructor(private afDB: AngularFireDatabase) {
	}

	loadItems(type: string): Observable<any[]> {
		return this.afDB.list(type).snapshotChanges()
			.map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() })));
	}

	loadItemsByParent(collection: string, parentId: string): Observable<any[]> {
		let query = ref => ref.orderByChild('parentId').equalTo(parentId);
		return this.afDB.list(collection, query).valueChanges();
	}

	createItem(itemType: string, item: any): Promise<void> {
		let key = uuid();
		return this.afDB.object(`${itemType}/${key}`).set(item);
	}

	deleteItem(itemType: string, item: any): Promise<void> {
		let key = item.$key;
		return this.afDB.object(`${itemType}/${key}`).remove();
	}

	loadItem(itemType: string, itemId: string): Observable<any> {
		return this.afDB.object(`${itemType}/${itemId}`).valueChanges();
	}

	saveItem(itemType: string, item: any): Promise<void> {
		let key = item.$key;
		let update = this.patchEntity(item);
		return this.afDB.object(`${itemType}/${key}`).update(update);
	}

	private patchEntity(item: any): any {
		let update = JSON.parse(JSON.stringify(item));
		delete update.$key;
		return update;
	}
}
