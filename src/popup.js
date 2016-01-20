;(function () {

	angular.module('stalkercrush')
		.service('PopupLogin', PopupLogin);

	PopupLogin.$inject = ['$q', '$window', 'InstagramApi'];

	function PopupLogin ($q, $window, InstagramApi) {

		var popUpOptions = {
			name: 'Authentication',
			openParams: {
			    width: 650,
                height: 600,
                resizable: true,
                scrollbars: true,
                status: true
			}
		};

		this.getToken = function () {
			var defer = $q.defer();
			var popup = window.open(InstagramApi.getUrlLogin(), popUpOptions.name, formatPopUpOptions());
			angular.element($window).bind('message', function (event) {
				event = event.originalEvent || event;
				if (event.source === popup && event.origin === window.location.origin) {
					var accessToken = event.data.token;
					defer.resolve(accessToken);
				} else {
					defer.reject();
				}
			});
			return defer.promise;
		};

		function formatPopUpOptions(){
			var pairs = [];
			angular.forEach(popUpOptions.openParams, function(value, key){
				value = value === true ? 'yes' : value;
				pairs.push(key + '=' + value);
			});
			return pairs.join(',');
		}

	}

})();