// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	app: {
		name: 'Business Directory',
		subtitle: 'Admin Portal',
		slogan: 'Admin Portal'
	},
	fire: {
		auth: {
			apiKey: '',
			authDomain: 'business-directory-adm-stage.firebaseapp.com',
			databaseURL: 'https://business-directory-adm-stage.firebaseio.com',
			projectId: 'business-directory-adm-stage',
			storageBucket: 'business-directory-adm-stage.appspot.com',
			messagingSenderId: '517986873774'
		}
	},
	s3: {
		accessKeyId: 'AKIAJY6GD4REGAP7BPHQ',
		secretAccessKey: '',
		bucket: 'dev.appseed.io/mobile-apps/businessdirectory-frb-admin'
	}
};
