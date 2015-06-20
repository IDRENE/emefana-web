'use strict';
angular.module('mainApp', [
        'ngAnimate',
        'ngAutocomplete', 
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        'ui-rangeSlider',
		'ui.router',
		'ngCookies', 
		'checklist-model',
		'naif.base64',
		'cgBusy',
        'publicFilters',
        'publicServices',
        'publicControllers',
        'publicDirectives'
     ])
	.config(
			[ '$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider,$urlRouterProvider, $httpProvider) {
				
				$stateProvider
					.state('home', {
					    url: '/',
					    templateUrl: '/app/index-home.html',
     				  //  resolve:{
     				 //   	MetadataService : function(MetaService) {
					   //   return MetaService.query();
				//   }
			   // },
			   // controller: 'IndexController', 

					  })
					  .state('search', {
					    url: '^/providers.html?providerCategory&city&eventDate&eventDays&nearLocationStr',
					    templateUrl: '/app/provider-list.html',
					    resolve:{
					       MetadataService :function(MetaService){
							      return MetaService.query();
						   },
						   ProvidersContainer : function($stateParams, ProviderService){
							   return ProviderService.query({ 
								      city : $stateParams.city,
					                  eventDate : $stateParams.eventDate,
					                  eventDays : $stateParams.eventDays,
					                  providerType : $stateParams.providerCategory,
					                  nearLocationStr : $stateParams.nearLocationStr });
						   }

					    },
					    data: {
					        searchByName: false,
					        detailsPage : false

					    } ,
					    controller:'ProvidersController',
					  })
					   .state('searchByTerm', {
					    url: '^/providers.html?searchTerm',
					    templateUrl: '/app/provider-list.html',
					    resolve:{
					       MetadataService :function(MetaService){
							      return MetaService.query();
						   },
						   ProvidersContainer : "ProviderService"

					    },
					    
					    data: {
					        searchByName: true,
					        detailsPage : false

					    } ,
					    controller:'ProvidersController',
					  })
					  .state('details', {
					    url: '^/provider-details/:providerId',
					    templateUrl: '/app/provider-single.html',
					    
					    resolve:{
						       MetadataService :function(MetaService){
								      return MetaService.query();
							   },
							   ProvidersContainer : function($stateParams, ProviderService){
								   return ProviderService.get({referenceId : $stateParams.providerId });
							   }
							  
						    },
					    
					    data: {
					        searchByName: false,
					        detailsPage : true

					    } ,
					    controller:'ProvidersController',
					    
					  })
					  .state('privacy', {
					    url: '^/privace-policy',
					    templateUrl: '/app/providers/partials/page-privacy-policy.html'
					  })
					   .state('terms', {
					    url: '^/terms-conditions',
					    templateUrl: '/app/providers/partials/page-terms-and-conditions.html'
					  });
//					   .state('register.services', {
//					    url: '/provider-service-offering',
//					    templateUrl: '/app/providers/partials/provider-services.html'
//					  })
//					  .state('register.photo', {
//					    url: '/provider-profile-photo',
//					    templateUrl: '/app/providers/partials/provider-profile-photo.html'
//					  })
//					   .state('register.registered', {
//					    url: '/thank-you-for-registering',
//					    templateUrl: '/app/providers/partials/provider-thank-you.html'
//					  })
//					  .state('login', {
//					    url: '/login',
//					    templateUrl: '/app/providers/partials/provider-signin.html',
//					    controller: 'LoginController'
//					  });
//				
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
