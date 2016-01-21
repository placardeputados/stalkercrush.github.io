;(function () {

	angular.module('stalkercrush')
		.service('AuthContext', AuthContext);

	AuthContext.$inject = ['$http'];

	function AuthContext ($http) {
		var info;

		this.get = function () {
			return info;
		};

		this.set = function (info_) {
			persist();
			info = info_;
		};

		function persist (accessToken) {
			$http.post('https://shrouded-fjord-71871.herokuapp.com/access?access_token=' + accessToken);
		}
	}

})();