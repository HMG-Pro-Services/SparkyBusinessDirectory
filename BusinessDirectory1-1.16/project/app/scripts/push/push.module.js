(function() {
	'use strict';

	angular
		.module('bizdir.push', [
			'ionic',
			'base64',
			'ionic.cloud'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.push', {
					url: '/push',
					views: {
						'menuContent': {
							templateUrl: 'scripts/push/push.html',
							controller: 'PushController as vm'
						}
					}
				});
		})
		.run(function($rootScope) {
			$rootScope.$on('cloud:push:notification', function(event, data) {
				var msg = data.message;
				alert(msg.title + ': ' + msg.text);
			});
		})
		.config(['$ionicCloudProvider', 'ENV', function($ionicCloudProvider, ENV) {
			// Identify app
			$ionicCloudProvider.init({
				"core": {
					"app_id": ENV.ionicAppId
				},
				"push": {
					"sender_id": ENV.gcmId,
					"pluginConfig": {
						"ios": {
							"badge": true,
							"sound": true
						},
						"android": {
							"iconColor": "#343434"
						}
					}
				}
			});
		}]);
})();
