import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from '../../pipes/pipes.module';
import { FavoritesPage } from './favorites';

@NgModule({
	imports: [IonicModule, PipesModule, Ionic2RatingModule],
	entryComponents: [FavoritesPage],
	declarations: [FavoritesPage],
	exports: [FavoritesPage]
})
export class FavoritesModule {

}