import { NgModule } from '@angular/core';
import { TrimHtmlPipe } from './trim-html.pipe';
import { TruncatePipe } from './truncate.pipe';
import { YoutubeEmbedUrlPipe } from './youtube-embed-url.pipe';
import { VimeoEmbedUrlPipe } from './vimeo-embed-url.pipe';
import { LocalDatePipe } from './local-date.pipe';
import { DistancePipe } from './distance.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
	declarations: [
		TruncatePipe,
		TrimHtmlPipe,
		YoutubeEmbedUrlPipe,
		VimeoEmbedUrlPipe,
		LocalDatePipe,
		DistancePipe,
		OrderByPipe
	],
	exports: [
		TruncatePipe,
		TrimHtmlPipe,
		YoutubeEmbedUrlPipe,
		VimeoEmbedUrlPipe,
		LocalDatePipe,
		DistancePipe,
		OrderByPipe
	]
})
export class PipesModule {

}