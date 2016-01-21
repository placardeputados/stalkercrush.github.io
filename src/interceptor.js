;(function () {

	angular.module('stalkercrush')
		.config(InterceptorConfig);

	InterceptorConfig.$inject = ['$httpProvider'];

	function InterceptorConfig ($httpProvider) {
		$httpProvider.interceptors.push(['$q', function ($q) {
			return {
				response: function (response) {
					if (angular.isObject(response.data) && hasError(response)) {
						return $q.reject(response.data.meta.error_type);
					}
					return response;
				}
			};		
		}]);

		function hasError (response) {
			return response.data.meta && response.data.meta.code !== 200;
		}
	}

})();