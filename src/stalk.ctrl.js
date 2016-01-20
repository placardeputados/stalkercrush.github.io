;(function () {

	angular.module('stalkercrush')
		.controller('StalkCtrl', StalkCtrl);

	StalkCtrl.$inject = ['$state', 'InstagramApi', '$window', 'AuthContext', 'AuthService'];

	function StalkCtrl ($state, InstagramApi, $window, AuthContext, AuthService) {
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
			InstagramApi.mediasOf(userId, AuthContext.get().accessToken).then(function (medias) {
				vm.medias = medias;
			}, function (error) {
				retryGetMedias().then(function (medias) {
					vm.medias = medias;
				}, function (retryError) {
					vm.error = retryError || error;
				}); 
			});
		}

		function retryGetMedias () {
			return AuthService.getTokenFor(userId).then(function (accessToken) {
				return InstagramApi.mediasOf(userId, accessToken).then(function (medias) {
					return medias;
				});
			});
		}
	}	

})();