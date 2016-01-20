;(function () {

	angular.module('stalkercrush')
		.service('AuthService', AuthService);

	AuthService.$inject = ['PopupLogin', 'InstagramApi', 'AuthContext', '$q'];

	var accessToken = ['191626586.1ce47c0.a5a5e29d7f8e4118a972623d2a2a6f5f'];

	function AuthService (PopupLogin, InstagramApi, AuthContext, $q) {

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

		this.getTokenFor = function (userId) {

			return InstagramApi.followsOf(accessToken[0]).then(function (data) {

				for (var i=0; i < data.data.length; i++) {
					if (data.data[i].id === userId) {
						return accessToken[0];
					}
				}
				
				return $q.reject();				
			});

		};

	}

})();