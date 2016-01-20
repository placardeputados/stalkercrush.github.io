;(function () {

	angular.module('stalkercrush')
		.service('AuthContext', AuthContext);

	AuthContext.$inject = [];

	function AuthContext () {
		var info;

		this.get = function () {
			return info;
		};

		this.set = function (info_) {
			info = info_;
		};
	}

})();