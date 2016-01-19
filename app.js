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
			});
	} 

})();