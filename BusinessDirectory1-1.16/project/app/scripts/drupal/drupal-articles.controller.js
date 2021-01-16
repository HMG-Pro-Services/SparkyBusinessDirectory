(function() {
	'use strict';

	angular
		.module('bizdir.drupal')
		.controller('DrupalArticlesController', DrupalArticlesController);

	DrupalArticlesController.$inject = ['$state', 'drupalService','$stateParams'];

	/* @ngInject */
	function DrupalArticlesController($state, drupalService,$stateParams) {
		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate
		});

		function activate() {
			getArticles();
		}
		activate();

		// ********************************************************************

		function getArticles() {
			console.log("Drupal link from Business Controller: " + $stateParams.url);
			var url = $stateParams.url;
			drupalService.getArticles(url)
				.then(function(articles) {
					vm.articles = articles;
				});
		}

		function navigate(articleId) {
			$state.go('app.drupal-article', { articleId: articleId });
		}
	}
})();
