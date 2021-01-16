(function() {
	'use strict';

	angular
		.module('bizdir.push')
		.service('pushTokenService', pushTokenService);

	pushTokenService.$inject = ['$ionicPush'];

	/* @ngInject */
	function pushTokenService($ionicPush) {

		var service = {
			registerDevice: registerDevice
		};

		return service;

		// ***************************************

		function registerDevice() {
			return $ionicPush.register().then(function(t) {
				return $ionicPush.saveToken(t);
			});
		}
	}
})();
