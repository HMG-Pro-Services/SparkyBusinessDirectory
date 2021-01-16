(function() {
	'use strict';

	angular
		.module('bizdir.push')
		.controller('PushController', PushController);

	PushController.$inject = ['$ionicPopup', 'pushSenderService', 'pushTokenService'];

	/* @ngInject */
	function PushController($ionicPopup, pushSenderService, pushTokenService) {
		var vm = angular.extend(this, {
			registerDevice: registerDevice,
			sendMessage: sendMessage,
			registered: false,
			message: ''
	});

		// ********************************************************************

		function sendMessage() {
			pushSenderService.send(vm.message);
			vm.message = null;
		}

		function registerDevice() {
			pushTokenService.registerDevice()
				.then(function() {
					vm.registered = true;
					$ionicPopup.alert({
						title: 'Push service',
						template: 'Device registered'
					});
				});
		}
	}
})();