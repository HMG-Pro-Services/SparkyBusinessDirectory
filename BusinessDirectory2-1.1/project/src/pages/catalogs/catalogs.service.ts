import { Injectable } from '@angular/core';
import { DataProvider } from '../../providers/data-provider';

@Injectable()
export class CatalogsService {
	constructor(private dataProvider: DataProvider) {
	}

	public getCatalogs(businessId: string): Promise<any[]> {
		return this.dataProvider.getCatalogs(businessId);
	}
}