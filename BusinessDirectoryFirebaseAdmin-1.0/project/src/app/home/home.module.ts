import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	declarations: [HomeComponent],
})
export class HomeModule {
}
