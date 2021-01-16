(function() {
	'use strict';

	angular
		.module('bizdir.push')
		.factory('pushSenderService', pushSenderService);

	pushSenderService.$inject = ['$http', '$ionicPush', 'ENV'];

	/* @ngInject */
	function pushSenderService($http, $ionicPush, ENV) {
		var pushUrl = 'https://api.ionic.io/push/notifications';

		var service = {
			send: send
		};
		return service;

		// ***********************************************

		function send(message) {
			var token = $ionicPush.token;
			var data = {
				'tokens': [token.token],
				'profile': ENV.ionicSecurityProfile,
				'notification': {
					'ios': {
						'title': 'test push',
						'message': message
					},
					'android': {
						'title': "test push",
						'message': message
					}
				}
			};
			$http({
				method: 'POST',
				url: pushUrl,
				data: data,
				headers: {
					'Authorization': 'Bearer ' + ENV.ionicCloudApiToken,
					'Content-Type': 'application/json'
				}
			});
		}
	}
})();
