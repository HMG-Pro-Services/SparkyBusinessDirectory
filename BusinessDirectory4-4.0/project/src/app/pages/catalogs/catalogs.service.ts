import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/database/data.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private currentCatalog: any;

  constructor(
    private dataService: DataService,
  ) { }

  getCatalogs(businessId: string): Promise<any[]> {
    return this.dataService.getCatalogs(businessId);
  }

  setCurrent(catalog: any) {
    this.currentCatalog = catalog;
  }

  getCurrent() {
    return this.currentCatalog;
  }
}
