import { Injectable } from '@angular/core';
import { DataProvider } from '../../providers/data-provider';

@Injectable()
export class ServicesService {
	constructor(private dataProvider: DataProvider) {
	}

	public getServices(businessId: string): Promise<any[]> {
		return this.dataProvider.getServices(businessId);
	}
}