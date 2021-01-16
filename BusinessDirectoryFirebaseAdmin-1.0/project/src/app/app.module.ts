import { AgmCoreModule } from '@agm/core';
import { ApplicationRef, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CKEditorModule } from 'ng2-ckeditor';
import { environment } from '../environments/environment';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { CustomFormlyModule, ngFormlyConfig } from './common/formly/custom-formly.module';
import { DataService } from './common/services/data.service';
import { FireStorage } from './common/services/fire-storage';
import { S3Storage } from './common/services/s3-storage';
import { SharedModule } from './common/shared.module';

import { ManagerModule } from './manager/manager.module';
import { ShellModule } from './shell/shell.module';

// Application wide providers
const APP_PROVIDERS = [
	...APP_RESOLVER_PROVIDERS,
	AuthService,
	FireStorage,
	S3Storage,
	DataService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		MatSnackBarModule,

		NgbModule.forRoot(),
		FormlyModule.forRoot(ngFormlyConfig),
		FormlyBootstrapModule,
		CustomFormlyModule,

		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyB3c6WmfOf9_Dd_Sh1gC2n7MjyGrUYPiSw'
		}),
		FlexLayoutModule,
		CKEditorModule,

		AngularFireModule.initializeApp(environment.fire.auth),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		SharedModule,
		AuthModule,
		ShellModule,
		ManagerModule
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		APP_PROVIDERS
	]
})
export class AppModule {
	constructor(public appRef: ApplicationRef) {
	}
}
