import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Config, DataServiceType } from '../config';
import { FirebaseDataService } from './services/database/firebase-data.service';
import { DataService } from './services/database/data.service';
import { BusinessPageModule } from './pages/business/business.module';
import { BackendLessDataService } from './services/database/backend-less-data.service';
import { HttpDataService } from './services/database/http-data.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function getDataService(http: HttpClient, db: AngularFireDatabase) {
  switch (Config.DATA_SERVICE) {
    case DataServiceType.http:
      return new HttpDataService(http);
    case DataServiceType.firebase:
      return new FirebaseDataService(db);
    case DataServiceType.backendless:
      return new BackendLessDataService();
    default:
      throw new Error('Unknown database service');
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(Config.firebase),
    AngularFireDatabaseModule,
    BusinessPageModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: DataService, useFactory: getDataService, deps: [HttpClient, AngularFireDatabase] },
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
