import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/database/data.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private currentProduct: any;

  constructor(
    private dataService: DataService,
  ) { }

  public getProducts(businessId: string): Promise<any[]> {
    return this.dataService.getProducts(businessId);
  }

  setCurrent(product: any) {
    this.currentProduct = product;
  }

  getCurrent() {
    return this.currentProduct;
  }
}
