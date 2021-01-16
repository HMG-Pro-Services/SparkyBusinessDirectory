import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';
import { NewsListPage } from './news-list';
import { PipesModule } from '../../pipes/pipes.module';
import { NewsService } from './news.service';

@NgModule({
	imports: [IonicModule, PipesModule],
	declarations: [
		NewsListPage,
		NewsItemPage
	],
	entryComponents: [
		NewsListPage,
		NewsItemPage
	],
	providers: [NewsService]
})
export class NewsModule {

}