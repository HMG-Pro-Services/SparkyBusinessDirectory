import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'vimeoEmbedUrl'
})
export class VimeoEmbedUrlPipe implements PipeTransform {
	private sanitizer: DomSanitizer;

	constructor(sanitizer: DomSanitizer) {
		this.sanitizer = sanitizer;

	}

	transform(value: any): SafeResourceUrl {
		let url = 'http://player.vimeo.com/video/' + value;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}