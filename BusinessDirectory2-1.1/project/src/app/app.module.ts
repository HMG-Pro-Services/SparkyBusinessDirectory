import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CallService } from '../common/services/call.service';
import { DistanceService } from '../common/services/distance.service';
import { EmailService } from '../common/services/email.service';
import { InAppBrowserService } from '../common/services/in-app-browser.service';
import { MapsService } from '../common/services/maps.service';
import { OpenHoursService } from '../common/services/open-hours.service';
import { DATA_PROVIDER, firebaseConfig, mapApiKey } from '../config';
import { BusinessesModule } from '../pages/businesses/businesses.module';
import { CatalogsModule } from '../pages/catalogs/catalogs.module';
import { DrupalModule } from '../pages/drupal/drupal.module';
import { FavoritesModule } from '../pages/favorites/favorites.module';
import { MapModule } from '../pages/map/map.module';
import { NewsModule } from '../pages/news/news.module';
import { ProductsModule } from '../pages/products/products.module';
import { SpeakersModule } from '../pages/reviews/reviews.module';
import { ServicesModule } from '../pages/services/services.module';
import { WordpressModule } from '../pages/wordpress/wordpress.module';
import { PipesModule } from '../pipes/pipes.module';
import { DataProvider } from '../providers/data-provider';
import { FirebaseDataProvider } from '../providers/firebase.data-provider';
import { HttpDataProvider } from '../providers/http.data-provider';
import { UserData } from '../providers/user-data';
import { BusinessesService } from '../services/businesses.service';
import { ReviewsService } from '../services/reviews.service';
import { BusinessDirectoryApp } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { OneSignalModule } from '../pages/push/one-signal.module';
import { BackendlessDataProvider } from '../providers/backendless.data-provider';

function getDataProvider() {
	switch (DATA_PROVIDER) {
		case 'HTTP':
			return HttpDataProvider;
		case 'FIREBASE':
			return FirebaseDataProvider;
		case 'BACKENDLESS':
			return BackendlessDataProvider;
		default:
			throw  new Error('Unknown provider');
	}
}

@NgModule({
	declarations: [
		BusinessDirectoryApp
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(BusinessDirectoryApp, {}),
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(firebaseConfig),
		AgmCoreModule.forRoot({
			apiKey: mapApiKey
		}),
		SpeakersModule,
		MapModule,
		FavoritesModule,
		BusinessesModule,
		WordpressModule,
		DrupalModule,
		NewsModule,
		ProductsModule,
		ServicesModule,
		CatalogsModule,
		OneSignalModule,

		PipesModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		BusinessDirectoryApp
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		InAppBrowser,
		SplashScreen,
		{ provide: DataProvider, useClass: getDataProvider() },
		CallService,
		EmailService,
		InAppBrowserService,
		MapsService,
		UserData,
		BusinessesService,
		ReviewsService,

		AngularFireAuth,
		AngularFireDatabase,
		Geolocation,
		DistanceService,
		OpenHoursService
	]
})
export class AppModule {
}
