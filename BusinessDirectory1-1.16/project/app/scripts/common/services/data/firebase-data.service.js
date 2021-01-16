(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('db', ['ENV', function(ENV) {
			firebase.initializeApp(ENV.firebase);

			var rootRef = firebase.database().ref();
			return rootRef;
		}])
		.factory('firebaseDataService', firebaseDataService);

	firebaseDataService.$inject = ['_', 'db', '$q', '$firebaseArray', '$firebaseObject'];

	/* @ngInject */
	function firebaseDataService(_, db, $q, $firebaseArray, $firebaseObject) {
		var service = {
			getBusinesses: getBusinesses,
			getCatalogs: getCatalogs,
			getCommon: getCommon,
			getBusiness: getBusiness,
			getBusinessesByCategory: getBusinessesByCategory,
			getCategories: getCategories,
			getCatalog: getCatalog,
			getProducts: getProducts,
			getProduct: getProduct,
			getServices: getServices,
			getService: getService,
			getArticle: getArticle,
			getArticles: getArticles,
			getReviews: getReviews,
			addReview: addReview
		};
		return service;

		// ***********************************************************

		function getArticles(businessId) {
			var query = db.child('news').orderByChild('business').equalTo(businessId);
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function getArticle(businessId, articleId) {
			var query = db.child('news/' + articleId);
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function getServices(businessId) {
			var query = db.child('services').orderByChild('business').equalTo(businessId);
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function getService(businessId, serviceId) {
			var query = db.child('services/' + serviceId);
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function getProducts(businessId) {
			var query = db.child('products').orderByChild('business').equalTo(businessId);
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function getProduct(businessId, productId) {
			var query = db.child('products/' + productId);
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function getBusinesses() {
			var query = db.child('businesses');
			return $firebaseArray(query).$loaded()
				.then(initArray)
				.then(enrichBusinessesWithCategory);
		}

		function getBusinessesByCategory(categoryName) {
			var query = db.child('businesses');

			var categoryDefer;
			if (categoryName === 'All') {
				categoryDefer = $q.when(null);
			} else {
				categoryDefer = getRawCategory(categoryName);
			}

			return categoryDefer.then(function(category) {
				if (category) {
					query = query.orderByChild('category').equalTo(category.$id);
				}

				return $firebaseArray(query).$loaded()
					.then(initArray)
					.then(enrichBusinessesWithCategory);
			});
		}

		function getBusiness(businessId) {
			var query = db.child('businesses/' + businessId);
			return $firebaseObject(query).$loaded()
				.then(initItem)
				.then(enrichBusinessWithRating)
				.then(enrichBusinessWithCategory);
		}

		function enrichBusinessWithCategory(business) {
			return getRawCategories().then(function(categories) {
				var category = _.find(categories, '$id', business.category);
				business.category = category ? category.name : null;
				return business;
			});
		}

		function enrichBusinessesWithCategory(businesses) {
			return getRawCategories().then(function(categories) {
				_.each(businesses, function(business) {
					var category = _.find(categories, '$id', business.category);
					business.category = category ? category.name : null;
				});
				return businesses;
			});
		}

		function getRawCategories() {
			var query = db.child('categories');
			return $firebaseArray(query).$loaded();
		}

		function getRawCategory(name) {
			return getRawCategories().then(function(categories) {
				return _.find(categories, 'name', name);
			});
		}

		function enrichBusinessWithRating(item) {
			if (!item.rating) {
				item.rating = {
					value: 0,
					reviews: 0
				}
			}
			return item;
		}

		function getCategories() {
			var query = db.child('categories');
			return $firebaseArray(query).$loaded().then(function(categories) {
				categories = _.map(categories, function(category) {
					return category.name;
				});
				return ['All'].concat(_.sortBy(_.unique(categories)));
			});
		}

		function getCatalog(businessId, catalogId) {
			var query = db.child('catalogs/' + catalogId);
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function getCatalogs(businessId) {
			var query = db.child('catalogs').orderByChild('business').equalTo(businessId);
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function getReviews(businessId) {
			var query = db.child('reviews').orderByChild('business').equalTo(businessId);
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function addReview(review) {
			review.date = new Date().getTime();
			var query = db.child('reviews');
			var reviews = $firebaseArray(query);

			return reviews.$add(review).then(function() {
				if (review.rate) {
					return getBusiness(review.business).then(function(business) {
						var rating = calcRating(business.rating, review.rate);
						return saveBusiness(review.business, {
							rating: rating
						})
					});
				}
			});
		}

		function calcRating(rating, newRate) {
			if (!newRate) {
				return rating;
			}
			if (!rating || rating.reviews === 0) {
				rating = {
					value: newRate,
					reviews: 1
				};
			} else {
				var rate = (rating.value * rating.reviews);
				rating = {
					value: (rate + newRate) / (rating.reviews + 1),
					reviews: rating.reviews + 1
				};
			}
			return rating;
		}


		function getCommon() {
			var query = db.child('common');
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function initItem(item) {
			return angular.extend({}, item, {
				guid: item.$id
			});
		}

		function initArray(array) {
			return _.map(array, initItem);
		}

		function saveBusiness(id, changeSet) {
			var one = db.child('businesses').child(id);
			return $firebaseObject(one).$loaded().then(function(item) {
				angular.extend(item, changeSet);
				return item.$save();
			});
		}
	}
})();
