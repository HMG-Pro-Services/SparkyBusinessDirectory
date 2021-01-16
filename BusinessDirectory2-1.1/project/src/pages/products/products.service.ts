import { Injectable } from '@angular/core';
import { DataProvider } from '../../providers/data-provider';

@Injectable()
export class ProductsService {
	constructor(private dataProvider: DataProvider) {
	}

	public getProducts(businessId: string): Promise<any[]> {
		return this.dataProvider.getProducts(businessId);
	}
}