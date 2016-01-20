;(function () {

	angular.module('stalkercrush')
		.controller('StalkCtrl', StalkCtrl);

	StalkCtrl.$inject = ['$state', 'InstagramApi', '$window'];

	function StalkCtrl ($state, InstagramApi, $window) {
		var vm = this;
		var userId = $state.params.userId;

		init();

		vm.isPrivateMediaError = function () {
			return vm.error === 'APINotAllowedError';
		};

		vm.back = function () {
			$window.history.back();
		};

		function init () {
			if (!userId) $state.go('app.search');
			InstagramApi.mediasOf(userId).then(function (medias) { console.log(medias);
				vm.medias = medias;
			}, function (error) {
				vm.error = error;
			});
		}
	}

})();