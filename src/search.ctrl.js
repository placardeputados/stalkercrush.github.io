;(function () {

	angular.module('stalkercrush')
		.controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['InstagramApi', '$state'];

	function SearchCtrl (InstagramApi, $state) {
		var vm = this;
		var query = $state.params.query;

		init();

		vm.stalkear = function (userId) {
			$state.go('app.stalk', { userId: userId });
		};

		function init () {
			if (!query) return;
			InstagramApi.searchFor(query).then(function (users) {
				vm.users = users;
			});
		}

	}

})();