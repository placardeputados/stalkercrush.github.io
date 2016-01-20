;(function () {

	angular.module('stalkercrush')
		.service('InstagramApi', InstagramApi);

	InstagramApi.$inject = ['$http', 'AuthContext'];

	function InstagramApi ($http, AuthContext) {

		this.getUrlLogin = function () {
			return 'https://instagram.com/oauth/authorize/?client_id=' + 
				'1ce47c06b480418fa169465ed261ed20' + '&redirect_uri=' + 'http://stalkercrush.github.io/auth/callback.html' + '&response_type=token';
		};

		this.informationOf = function (accessToken) {
			return $http.jsonp(urlInformation(accessToken)).then(function (response) {
				return {
					username: response.data.data.username,
					id: response.data.data.id,
					accessToken: accessToken
				};
			});
		};

		this.searchFor = function (query) {
			return $http.jsonp(urlSearch(query)).then(function (response) {
				return response.data.data;
			});
		};

		this.mediasOf = function (userId, accessToken) {
			return $http.jsonp(urlMedias(userId, accessToken)).then(function (response) {
				return response.data.data;
			})
		};

		this.followsOf =function (accessToken) {
			return $http.jsonp(urlFollows(accessToken)).then(function (response) {
				return response.data;
			});
		};

		function urlInformation (accessToken) {
			return 'https://api.instagram.com/v1/users/self/?access_token=' + accessToken + '&callback=JSON_CALLBACK';
		}

		function urlSearch (query) {
			return 'https://api.instagram.com/v1/users/search?q='+ query +'&access_token=' + AuthContext.get().accessToken + '&callback=JSON_CALLBACK';
		}

		function urlMedias (userId, accessToken) {
			return 'https://api.instagram.com/v1/users/'+ userId +'/media/recent/?access_token=' + accessToken + '&callback=JSON_CALLBACK';
		}

		function urlFollows (accessToken) {
			return 'https://api.instagram.com/v1/users/self/follows?access_token=' + accessToken + '&callback=JSON_CALLBACK';
		}

	}

})();