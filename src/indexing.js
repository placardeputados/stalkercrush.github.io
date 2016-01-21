;(function () {

	angular.module('stalkercrush')
		.service('IndexingService', IndexingService);

	IndexingService.$inject = ['$http'];

	function IndexingService ($http) {

		this.getTokenFor = function (userId) {
			//TODO: retornando apenas um, possibilitar retornar varios...
			return $http.get('https://shrouded-fjord-71871.herokuapp.com/access?user=' + userId).then(function (response) {
				return response.data;
			});
		};
	}

})();