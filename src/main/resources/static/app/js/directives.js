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
  });
  
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