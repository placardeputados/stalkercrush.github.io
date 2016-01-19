;(function () {

	angular.module('stalkercrush', ['ui.router'])
		.config(StateConfig);

	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function StateConfig ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/start');

		$stateProvider

			.state('start', {
				url: '/start',
				templateUrl: 'start.html'
			})

			.state('app', {
				url: '/app',
				templateUrl: 'app.html'
			})
			.state('app.search', {
				url: '/search',
				views: {
					'@app': {
						templateUrl: 'search.html'
					}
				}
			})
			.state('app.stalk', {
				url: '/stalk',
				views: {
					'@app': {
						templateUrl: 'stalk.html'
					}
				}
			});
	} 

})();