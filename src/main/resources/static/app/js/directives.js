'use strict';

/* Directives */
(function() {

	var publicDirectives = angular.module('publicDirectives', ['publicControllers']);

	publicDirectives.directive('publicHeader',function() {
	  return {
		  restrict :'E',
		  transclude: true,
		  templateUrl : '/app/partials/public-header.html',
		  controller: 'IndexController'
	  };
  })
  .directive('publicFooter',function(){
	  return {
		  restrict :'E',
		  transclude: true,
		  templateUrl : '/app/providers/partials/provider-footer.html'
		 // controller: 'IndexController'
	  };
  })
  .directive('back', ['$window', function($window) {
      return {
          restrict: 'A',
          link: function (scope, elem, attrs) {
              elem.bind('click', function () {
                  $window.history.back();
              });
          }
      };
  }]);
  
//   .directive('registrationHeader',function(){
//	  return {
//		  restrict :'E',
//		  transclude: true,
//		  templateUrl : '/app/providers/partials/registration-header.html'
//	  };
//  })
//	.directive('providerWhyregister',function(){
//		  return {
//			  restrict :'E',
//			  transclude: true,
//			  templateUrl : '/app/providers/partials/provider-whyregister.html'
//			  //controller: 'RegisterController'
//		  };
//	  });
  

})();