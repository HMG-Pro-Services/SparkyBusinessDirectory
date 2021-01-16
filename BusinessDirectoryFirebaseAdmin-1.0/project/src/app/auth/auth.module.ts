import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ShellModule } from '../shell/shell.module';
import { SignInComponent } from './components/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignUpComponent } from './components/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';


const routes: Routes = [
	{ path: 'sign-in', component: SignInComponent, canActivate: [UnauthGuard] },
	{ path: 'sign-up', component: SignUpComponent, canActivate: [UnauthGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [UnauthGuard] }

];


@NgModule({
	declarations: [
		SignInComponent,
		SignUpComponent,
		ForgotPasswordComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		ShellModule,
		SharedModule
	],
	providers: [
		AuthGuard,
		AuthService,
		UnauthGuard
	]
})

export class AuthModule {
}


export { AuthGuard };
export { AuthService };
export { UnauthGuard };