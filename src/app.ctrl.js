;(function () {

	angular.module('stalkercrush')
		.controller('AppCtrl', AppCtrl);

	AppCtrl.$inject = ['$state'];

	function AppCtrl ($state) {
		var vm = this;

		vm.search = function (query) {
			if (!query) return;
			$state.go('app.search', { query: query });
		};
	}

})();