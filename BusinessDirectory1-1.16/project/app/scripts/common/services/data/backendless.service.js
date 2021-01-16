(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('db', ['ENV', function(ENV) {
			firebase.initializeApp(ENV.firebase);

			var rootRef = firebase.database().ref();
			return rootRef;
		}])
		.factory('backendlessService', backendlessService);

	backendlessService.$inject = ['_', '$q', 'ENV', '$rootScope'];

	/* @ngInject */
	function backendlessService(_, $q, ENV, $rootScope) {
		Backendless.serverURL = 'https://api.backendless.com';
		Backendless.initApp(ENV.data.appId, ENV.data.appKey);

		var categories = null;
		var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var service = {
			getBusinesses: getBusinesses,
			getBusiness: getBusiness,
			getCatalogs: getCatalogs,
			getCommon: getCommon,
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

		function getCatalog(businessId, catalogId) {
			var promise = Backendless.Data.of('CatalogItem').findById({ objectId: catalogId })
				.then(function(item) {
					adoptItem(item);
					return item;
				});
			return apply(promise);
		}

		function getCatalogs(businessId) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			var whereClause = "business.objectId = '" + businessId + "'";
			queryBuilder.setWhereClause(whereClause);

			var promise = Backendless.Data.of('CatalogItem').find(queryBuilder)
				.then(function(items) {
					_.each(items, adoptItem);
					return items;
				});
			return apply(promise);
		}

		function getServices(businessId) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			var whereClause = "business.objectId = '" + businessId + "'";
			queryBuilder.setWhereClause(whereClause);

			var promise = Backendless.Data.of('Service').find(queryBuilder)
				.then(function(items) {
					_.each(items, adoptItem);
					return items;
				});
			return apply(promise);
		}

		function getService(businessId, serviceId) {
			var promise = Backendless.Data.of('Service').findById({ objectId: serviceId })
				.then(function(item) {
					adoptItem(item);
					return item;
				});
			return apply(promise);
		}

		function getArticles(businessId) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			var whereClause = "business.objectId = '" + businessId + "'";
			queryBuilder.setWhereClause(whereClause);

			var promise = Backendless.Data.of('Article').find(queryBuilder)
				.then(function(items) {
					_.each(items, adoptItem);
					return items;
				});
			return apply(promise);
		}

		function getArticle(businessId, articleId) {
			var promise = Backendless.Data.of('Article').findById({ objectId: articleId })
				.then(function(item) {
					adoptItem(item);
					return item;
				});
			return apply(promise);
		}

		function getProducts(businessId) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			var whereClause = "business.objectId = '" + businessId + "'";
			queryBuilder.setWhereClause(whereClause);

			var promise = Backendless.Data.of('Product').find(queryBuilder)
				.then(function(items) {
					_.each(items, adoptItem);
					return items;
				});
			return apply(promise);
		}

		function getProduct(businessId, productId) {
			var promise = Backendless.Data.of('Product').findById({ objectId: productId })
				.then(function(item) {
					adoptItem(item);
					return item;
				});
			return apply(promise);
		}

		function getBusinesses() {
			return getBusinessesByCategory('All');
		}

		function getRawCategories() {
			if (categories) {
				return $q.resolve(categories);
			}

			return Backendless.Data.of('Category').find()
				.then(function(items) {
					categories = items;
					return items;
				});
		}

		function getCategories() {
			var promise = getRawCategories()
				.then(function(categories) {
					categories = _.map(categories, function(category) {
						return category.name;
					});

					return ['All'].concat(_.sortBy(_.unique(categories)));
				});
			return apply(promise);
		}

		function getBusinessesByCategory(categoryName) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			if (categoryName && categoryName !== 'All') {
				var whereClause = "category.name = '" + categoryName + "'";
				queryBuilder.setWhereClause(whereClause);
			}

			var promise = Backendless.Data.of('Business').find(queryBuilder)
				.then(function(items) {
					_.each(items, adoptBusiness);
					return items;
				});
			return apply(promise);
		}

		function getBusiness(businessId) {
			var businesses$ = Backendless.Data.of('Business');
			var promise = businesses$.findById({ objectId: businessId })
				.then(function(item) {
					adoptBusiness(item);
					return item;
				});
			return apply(promise);
		}

		function getReviews(businessId) {
			var queryBuilder = Backendless.DataQueryBuilder.create();
			var whereClause = "business.objectId = '" + businessId + "'";
			queryBuilder.setWhereClause(whereClause);

			var promise = Backendless.Data.of('Review').find(queryBuilder)
				.then(function(reviews) {
					_.each(reviews, function(review) {
						review.date = review.postDate;
					});
					return reviews;
				});
			return apply(promise);
		}

		function addReview(review) {
			var newReview = {
				postDate: new Date().getTime(),
				comment: review.comment,
				rate: review.rate,
				author: review.author
			};
			var promise = Backendless.Data.of('Review').save(newReview)
				.then(function(response) {
					var parentObject = { objectId: response.objectId };
					var childObject = { objectId: review.business };
					var children = [childObject];

					if (review.rate) {
						getBusiness(review.business).then(function(business) {
							var rating = calcRating(business.rating, review.rate);
							return saveBusiness(review.business, {
								rating: rating.value,
								reviews: rating.reviews
							})
						});
					}

					return Backendless.Data.of('Review').setRelation(parentObject, 'business', children);
				});
			return apply(promise);
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
			var promise = Backendless.Data.of('Map').findFirst()
				.then(function(data) {
					return {
						map: {
							zoomLevel: data.zoomLevel,
							origin: data.origin
						}
					};
				});
			return apply(promise);
		}

		function saveBusiness(id, changeSet) {
			changeSet.objectId = id;
			return Backendless.Data.of('Business').save(changeSet);
		}

		function adoptBusiness(business) {
			business.logo = business.logo.url;
			business.officeLocation = business.officeLocation.latitude + ',' + business.officeLocation.longitude;
			business.category = business.category.name;
			business.pictures = _.map(business.pictures, 'url');
			business.rating = {
				value: business.rating || 0,
				reviews: business.reviews || 0
			};

			_.forEach(business.mapAnnotations, function(annotation) {
				annotation.title = annotation.metadata.title;
			});
			business.mapdata = {
				annotations: business.mapAnnotations
			};

			_.each(business.openHours, function(day) {
				day.day = dayNames.indexOf(day.day);
			});
			business.openhours = {
				days: business.openHours
			};

			adoptId(business);
		}

		function adoptItem(item) {
			item.thumb = item.thumb.url;
			item.pictures = _.map(item.pictures, 'url');
			item.picture = item.pictures[0];
			adoptId(item);
		}

		function adoptId(item) {
			item.guid = item.objectId;
		}

		function apply(promise) {
			var deferred = $q.defer();

			promise.then(
				function(data) {
					$rootScope.$apply(function() {
						deferred.resolve(data);
					});
				},
				function(error) {
					$rootScope.$apply(function() {
						deferred.reject(error);
					});
				}
			);

			return deferred.promise;
		}
	}
})();
