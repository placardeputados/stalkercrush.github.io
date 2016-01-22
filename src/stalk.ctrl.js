;(function () {

	//https://rocky-springs-61885.herokuapp.com/nodes
	//https://shrouded-fjord-71871.herokuapp.com/indexing

	angular.module('stalkercrush')
		.controller('StalkCtrl', StalkCtrl);

	StalkCtrl.$inject = ['$state', 'InstagramApi', '$window', 'AuthContext', 'IndexingService', '$q'];

	function StalkCtrl ($state, InstagramApi, $window, AuthContext, IndexingService, $q) {
		var vm = this;
		vm.user = parseInt($state.params.userId, 10);

		if (!vm.user) $state.go('app.search');

		vm.callbackError = function (user) {
			vm.error = true;
			console.log('deu erro para o user ' + user);
		};

		vm.callbackSuccess = function () { 
			vm.success = true;
		};
	}	

})();