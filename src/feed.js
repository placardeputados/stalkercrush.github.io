;(function () {

	angular.module('stalkercrush')
		.directive('feed', FeedDirective);

	FeedDirective.$inject = ['AuthContext', 'IndexingService', '$rootScope'];

	function FeedDirective (AuthContext, IndexingService, $rootScope) {
		return {
			restric: 'A',
			scope: {
				user: '=',
				sort: '=',
				error: '&',
				success: '&'
			},
			link: function (scope, element, attributes) { 
				if (scope.user && scope.sort) {
					var success = function () {  scope.success(scope)(); $rootScope.$digest() };

					run(scope.user, scope.sort, AuthContext.get().accessToken, success, function () {
						IndexingService.getTokensFor(scope.user).then(function (tokens) {
							try {
								retry(scope.user, scope.sort,tokens,0, success);
							} catch (error) {
								scope.error()(scope.user);
							}
							
						});
					});
				}
				
			}
		}

		function retry (user, sort, tokens, index, success) {
			if (index === tokens.length) throw new Error();
			run(user, sort, tokens[index], success, function () {
				retry(user, sort, tokens, ++index, success);
			});
		}

		function run (user, sort, token, success, error) {
			var feed = new Instafeed({
		        accessToken: token,
		        target: 'instafeed',
		        get: 'user',
		        userId: user,
		        links: true,
		        sortBy: sort,
		        error: error, 
		        success: success,
		        resolution: 'standard_resolution',
		        template: '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="photo-box">' +
		        	'<div class="image-wrap"><img src="{{image}}"></a><div class="likes">{{likes}} Likes</div></div>' +
		        	'<div class="description">{{caption}}<div class="date">{{model.date}}</div></div></div></div>'
		    });
	    	feed.run();
		}
	}

	

})();