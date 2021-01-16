export class LS {
	static getItem(key): any {
		let json = localStorage.getItem(key);
		return json ? JSON.parse(json) : null;
	}

	static setItem(key, value): void {
		localStorage.setItem(key, JSON.stringify(value));
	}
}