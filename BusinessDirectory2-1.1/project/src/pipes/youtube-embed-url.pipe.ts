import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
	name: 'youtubeEmbedUrl'
})
export class YoutubeEmbedUrlPipe implements PipeTransform  {
	private sanitizer: DomSanitizer;

	constructor(sanitizer: DomSanitizer) {
		this.sanitizer = sanitizer;

	}

	transform(value: any): SafeResourceUrl {
		let url = 'http://www.youtube.com/embed/' + value;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}