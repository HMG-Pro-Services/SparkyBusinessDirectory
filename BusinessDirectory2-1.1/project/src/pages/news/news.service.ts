import { Injectable } from '@angular/core';
import { DataProvider } from '../../providers/data-provider';

@Injectable()
export class NewsService {
	constructor(private dataProvider: DataProvider) {
	}

	public getPosts(businessId): Promise<any[]> {
		return this.dataProvider.getPosts(businessId);
	}
}