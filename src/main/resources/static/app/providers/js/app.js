'use strict';
angular.module('providerApp', [
        'ui.bootstrap',
		'ui.router',
		'ngAutocomplete',
		'ngCookies', 
		'checklist-model',
		'ngGeolocation',
		'naif.base64',
		'cgBusy',
		'vcRecaptcha',
        'providerControllers',
        'providerFilters',
        'providerServices',
        'providerDirectives'
     ])
	.config(
			[ '$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider,$urlRouterProvider, $httpProvider) {
				
				$stateProvider
					.state('home', {
					    url: '/',
					    templateUrl: '/app/providers/provider-index.html',
					    controller: 'IndexController'
					  })
					  .state('register', {
					    url: '/registration',
					    templateUrl: '/app/providers/partials/provider-signup.html',
					    resolve:{
//						    	metaDataFactory :function($http) {
//						    		return  $http({method: 'GET', url: '../data/cities.json'})
//						        },
						       MetadataService :function(MetaService){
							      return MetaService.query();
						   }
					    },
					    controller:'RegisterController',
					  })
					  .state('register.start', {
					    url: '/listing-general-info',
					    templateUrl: '/app/providers/partials/provider-general-info.html',
					    
					  })
					  .state('register.features', {
					    url: '/listing-features/:incity?location',
					    templateUrl: '/app/providers/partials/provider-features.html'
					  })
					   .state('register.location', {
					    url: '/provider-location',
					    templateUrl: '/app/providers/partials/provider-location.html'
					  })
					   .state('register.services', {
					    url: '/provider-service-offering',
					    templateUrl: '/app/providers/partials/provider-services.html'
					  })
					  .state('register.photo', {
					    url: '/provider-profile-photo',
					    templateUrl: '/app/providers/partials/provider-profile-photo.html'
					  })
					   .state('register.registered', {
					    url: '/thank-you-for-registering',
					    templateUrl: '/app/providers/partials/provider-thank-you.html'
					  })
					  .state('login', {
					    url: '/login',
					    templateUrl: '/app/providers/partials/provider-signin.html',
					    controller: 'LoginController'
					  })
					  .state('privacy', {
						    url: '^/privace-policy',
						    templateUrl: '/app/providers/partials/page-privacy-policy.html'
						  })
						   .state('terms', {
						    url: '^/terms-conditions',
						    templateUrl: '/app/providers/partials/page-terms-and-conditions.html'
						  });
				
				 $urlRouterProvider.otherwise('/');
				 

					/* Register error provider that shows message on failed requests or redirects to login page on
					 * unauthenticated requests */
				    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
					        return {
					        	'responseError': function(rejection) {
					        		var status = rejection.status;
					        		var config = rejection.config;
					        		var method = config.method;
					        		var url = config.url;
					      
					        		if (status == 401) {
					        			$location.path( "/login" );
					        		} else {
					        			$rootScope.error = method + " on " + url + " failed with status " + status;
					        			console.log($rootScope.error);
					        		}
					              
					        		return $q.reject(rejection);
					        	}
					        };
					    }
				    );
				 
				    /* Registers auth token interceptor, auth token is either passed by header */
				    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
				        return {
				        	'request': function(config) {
				        		var isRestCall = config.url.indexOf('api') == 0;
				        		//console.log(isRestCall + " - " + JSON.stringify(config));
				        		//if (isRestCall) {
				        			var authToken = providerAppConfig.authToken;
				        				config.headers['X-Auth-Token'] = authToken;
				        			//console.log(config);
				        		//}
				        		return config || $q.when(config);
				        	}
				        };
				    }
			    );
  }])
  .run([
        '$rootScope', 
        '$location',
        '$state', 
        '$stateParams',
        '$cookieStore',
        function($rootScope, $location,$state, $stateParams,$cookieStore) {
        	// It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
        ]);




