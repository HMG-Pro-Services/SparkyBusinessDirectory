import { Injectable } from '@angular/core';

@Injectable()
export class Base64Service {
	PADCHAR: any;
	ALPHA: any;

	constructor() {
		this.PADCHAR = '=';
		this.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	}

	getbyte(s, i) {
		var x = s.charCodeAt(i);
		if (x > 255) {
			throw "INVALID_CHARACTER_ERR: DOM Exception 5";
		}
		return x;
	}

	encode(s) {
		if (arguments.length !== 1) {
			throw "SyntaxError: Not enough arguments";
		}

		let i, b10;
		let x = [];

		// convert to string
		s = "" + s;

		let imax = s.length - s.length % 3;

		if (s.length === 0) {
			return s;
		}
		for (i = 0; i < imax; i += 3) {
			b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8) | this.getbyte(s, i + 2);
			x.push(this.ALPHA.charAt(b10 >> 18));
			x.push(this.ALPHA.charAt((b10 >> 12) & 0x3F));
			x.push(this.ALPHA.charAt((b10 >> 6) & 0x3f));
			x.push(this.ALPHA.charAt(b10 & 0x3f));
		}
		switch (s.length - imax) {
			case 1:
				b10 = this.getbyte(s, i) << 16;
				x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 0x3F) +
					this.PADCHAR + this.PADCHAR);
				break;
			case 2:
				b10 = (this.getbyte(s, i) << 16) | (this.getbyte(s, i + 1) << 8);
				x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 0x3F) +
					this.ALPHA.charAt((b10 >> 6) & 0x3f) + this.PADCHAR);
				break;
		}
		return x.join('');
	}
}