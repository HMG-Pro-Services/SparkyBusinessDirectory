import { Injectable } from '@angular/core';


@Injectable()
export class ItemsCollectionViewStore {

	private _defultViewMode: string = 'cards';
	private _viewMode: string; // 'table' || 'cards'

	constructor() {
		let viewMode = this.loadSettings('_viewMode');
		if (!viewMode) {
			this.viewMode = this._defultViewMode;
		} else {
			this.viewMode = viewMode;
		}
	}

	set viewMode(viewMode: string) {
		this._viewMode = viewMode;
		this.saveSettings('_viewMode', viewMode);
	}

	get viewMode(): string {
		return this._viewMode;
	}

	private loadSettings(key): string {
		return localStorage.getItem(key);
	}

	private saveSettings(key, value) {
		localStorage.setItem(key, value);
	}

}