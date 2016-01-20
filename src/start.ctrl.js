;(function () {

	angular.module('stalkercrush')
		.controller('StartCtrl', StartCtrl);

	StartCtrl.$inject = ['AuthService', '$state'];

	function StartCtrl (AuthService, $state) {
		var vm = this;

		vm.start = function () {
			AuthService.requireAuthentication()
				.then(function () {
					$state.go('app.search');
				}, function () {
					alert('devo atualizar a página...');
				});
			
		};
	}

})();