import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { BusinessesPage } from '../pages/businesses/businesses';

import { UserData } from '../providers/user-data';
import { FavoritesPage } from '../pages/favorites/favorites';
import { MapPage } from '../pages/map/map';

export interface PageInterface {
	title: string;
	name: string;
	component: any;
	icon: string;
	logsOut?: boolean;
	index?: number;
	tabName?: string;
	tabComponent?: any;
}

@Component({
	templateUrl: './app.template.html'
})
export class BusinessDirectoryApp {
	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	// List of pages that can be navigated to from the left menu
	// the left menu only works after login
	// the login page disables the left menu
	appPages: PageInterface[] = [
		{ title: 'Directory', name: 'BusinessesPage', component: BusinessesPage, icon: 'home' },
		{ title: 'Favorites', name: 'FavoritesPage', component: FavoritesPage, icon: 'star-outline' },
		{ title: 'Map', name: 'MapPage', component: MapPage, icon: 'map' }
	];
	rootPage: any;

	constructor(
		public events: Events,
		public userData: UserData,
		public menu: MenuController,
		public platform: Platform,
		public splashScreen: SplashScreen
	) {

		this.rootPage = BusinessesPage;

		// decide which menu items should be hidden by current login status stored in local storage
		this.enableMenu(this.userData.authenticated);
	}

	openPage(page: PageInterface) {
		let params = {};

		// the nav component was found using @ViewChild(Nav)
		// setRoot on the nav to remove previous pages and only have this page
		// we wouldn't want the back button to show in this scenario
		if (page.index) {
			params = { tabIndex: page.index };
		}

		// If we are already on tabs just change the selected tab
		// don't setRoot again, this maintains the history stack of the
		// tabs even if changing them from the menu
		if (this.nav.getActiveChildNavs().length && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index);
			// Set the root of the nav with params if it's a tab index
		} else {
			this.nav.setRoot(page.component, params).catch((err: any) => {
				console.log(`Didn't set nav root: ${err}`);
			});
		}

		if (page.logsOut === true) {
			// Give the menu time to close before changing to logged out
			this.userData.signOut();
			this.events.publish('user:logout');
		}
	}

	enableMenu(loggedIn: boolean) {
		this.menu.enable(loggedIn, 'loggedInMenu');
		this.menu.enable(!loggedIn, 'loggedOutMenu');
	}

	platformReady() {
		// Call any initial plugins when ready
		this.platform.ready().then(() => {
			this.splashScreen.hide();
		});
	}

	isActive(page: PageInterface) {
		let childNav = this.nav.getActiveChildNavs()[0];

		// Tabs are a special case because they have their own navigation
		if (childNav) {
			if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
				return 'primary';
			}
			return;
		}

		if (this.nav.getActive() && this.nav.getActive().name === page.name) {
			return 'primary';
		}
		return;
	}
}
