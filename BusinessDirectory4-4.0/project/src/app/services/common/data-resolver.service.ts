import { Injectable } from '@angular/core';
import { DataService } from '../database/data.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataResolverService implements Resolve<any> {

  constructor(
    private dataService: DataService,
  ) { }

  async resolve() {
    return await this.dataService.init();
  }
}
