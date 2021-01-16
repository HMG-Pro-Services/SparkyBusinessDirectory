import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/database/data.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private currentService: any;

  constructor(
    private dataService: DataService,
  ) { }

  getServices(businessId: string): Promise<any[]> {
    return this.dataService.getServices(businessId);
  }

  setCurrent(service: any) {
    this.currentService = service;
  }

  getCurrent() {
    return this.currentService;
  }
}
