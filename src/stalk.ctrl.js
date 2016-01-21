;(function () {

	//https://rocky-springs-61885.herokuapp.com/nodes
	//https://shrouded-fjord-71871.herokuapp.com/indexing

	angular.module('stalkercrush')
		.controller('StalkCtrl', StalkCtrl);

	StalkCtrl.$inject = ['$state', 'InstagramApi', '$window', 'AuthContext', 'IndexingService', '$q'];

	function StalkCtrl ($state, InstagramApi, $window, AuthContext, IndexingService, $q) {
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
			return IndexingService.getTokenFor(userId).then(function (accessToken) { 
				if (!accessToken) return $q.reject();
				return InstagramApi.mediasOf(userId, accessToken[0]).then(function (medias) {
					return medias;
				});
			});
		}
	}	

})();