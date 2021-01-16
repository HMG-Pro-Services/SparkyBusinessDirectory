import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() { }

  getItem(key): any {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  }

  setItem(key, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
