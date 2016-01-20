;(function () {

	angular.module('stalkercrush')
		.run(RestrictConfig);

	RestrictConfig.$inject = ['$rootScope', '$state', 'AuthService'];

	function RestrictConfig ($rootScope, $state, AuthService) {
		$rootScope.$on('$stateChangeStart', function (event, toState) {
			if (isRestrict(toState) && !AuthService.isAuthenticated()) {
				event.preventDefault();
				$state.go('start');
			}
		});
	}

	function isRestrict (toState) {
		return (toState.data || {}).restrict;
	}

})();