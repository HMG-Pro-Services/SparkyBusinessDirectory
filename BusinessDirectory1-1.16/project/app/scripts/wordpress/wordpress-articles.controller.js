(function() {
	'use strict';

	angular
		.module('bizdir.wordpress')
		.controller('WordpressArticlesController', WordpressArticlesController);

	WordpressArticlesController.$inject = ['$state', 'wordpressService','$stateParams'];

	/* @ngInject */
	function WordpressArticlesController($state, wordpressService,$stateParams) {
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
			console.log("Wordpress link from Business Controller: " + $stateParams.url);
			var url = $stateParams.url;
			wordpressService.getArticles(url)
				.then(function(articles) {
					vm.articles = articles;
				});
		}

		function navigate(articleId) {
			$state.go('app.wordpress-article', { articleId: articleId });
		}
	}
})();
