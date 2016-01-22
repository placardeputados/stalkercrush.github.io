;(function () {

	angular.module('stalkercrush')
		.config(StateConfig);

	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function StateConfig ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/start');

		$stateProvider

			.state('start', {
				url: '/start',
				templateUrl: 'start.html',
				controller: 'StartCtrl as startCtrl'
			})

			.state('terms', {
				url: '/terms',
				templateUrl: 'terms.html'
			})

			.state('app', {
				data: { restrict: true },
				url: '/app',
				templateUrl: 'app.html',
				abstract: true,
				controller: 'AppCtrl as appCtrl'
			})
			.state('app.search', {
				url: '/search/:query',
				views: {
					'@app': {
						templateUrl: 'search.html',
						controller: 'SearchCtrl as searchCtrl'
					}
				}
			})
			.state('app.stalk', {
				url: '/stalk/:userId',
				views: {
					'@app': {
						templateUrl: 'stalk.html',
						controller: 'StalkCtrl as stalkCtrl'
					}
				}
			});
	} 

})();