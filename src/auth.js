;(function () {

	angular.module('stalkercrush')
		.service('AuthService', AuthService);

	AuthService.$inject = ['PopupLogin', 'InstagramApi', 'AuthContext'];

	function AuthService (PopupLogin, InstagramApi, AuthContext) {

		this.isAuthenticated = function () {
			return !!AuthContext.get();
		};

		this.requireAuthentication = function () {
			return PopupLogin.getToken().then(function (accessToken) {
				return InstagramApi.informationOf(accessToken).then(function (info) {
					AuthContext.set(info);
				});
			});
		};

	}

})();