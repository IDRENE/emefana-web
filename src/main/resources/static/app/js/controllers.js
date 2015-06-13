(function() {

	var publicControllers = angular.module('publicControllers', ['cordovaGeolocationModule']);
	
	   publicControllers .animation('.slide', function() {
			var NG_HIDE_CLASS = 'ng-hide';
			return {
				beforeAddClass: function(element, className, done) {
					if(className === NG_HIDE_CLASS) {
						element.slideUp(done);
					}
				},
				removeClass: function(element, className, done) {
					if(className === NG_HIDE_CLASS) {
						element.hide().slideDown(done);
					}
				}
			}
		});
	
	   publicControllers.controller('IndexController', 
			   ['$scope',
			    '$rootScope',
			    '$state',
			    '$filter',
			    'cordovaGeolocationService',
			    'MetaService',
			    function($scope,$rootScope,$state,$filter, cordovaGeolocationService,MetaService) {
					$scope.backTopId="topNav";

					var SW = new google.maps.LatLng(34.854, -6.307); //latitude, longitude for tz
				    var NE = new google.maps.LatLng(33.854, -5.307); 
				    var boundss = new google.maps.LatLngBounds(SW, NE);
					  
					  $scope.city = '';
					    $scope.optionsCities = {
						  bounds: boundss,
					      country: 'tz',
					      types: '(cities)'
					    };  
					    $scope.cityDetails = '';
					  
					  //Drop Downs
					  
					//  console.log(JSON.stringify(MetaService.query()));
					  
					    MetaService.query(function(result){
						  //console.log(JSON.stringify(result));
					    	 //$scope.meatadata = angular.toJson(result, true);PROVIDER_REP_ROLES
					    	// $scope.citiestz = $filter('filter')(result, { key: "CITIES" })[0].value;
					    	// $scope.listingRoles = $filter('filter')(result, { key: "PROVIDER_REP_ROLES" })[0].value;
					    	 $scope.countries = $filter('filter')(result, { key: "COUNTRIES" })[0].value;
					    	 $scope.provider_categories = $filter('filter')(result, { key: "PROVIDER_CATEGORIES" })[0].value;
					    	 $scope.events = $filter('filter')(result, { key: "EVENTS" })[0].value;
					    	 //$scope.services = $filter('filter')(result, { key: "SERVICES" })[0].value;
					    	 //console.log(JSON.stringify($scope.provider_categories));
					    	 
					     });
						

						   
						 $scope.search = function(){
							 $state.go("search",{ city : $scope.city,
								                  eventDate : $scope.eventDate,
								                  eventDays : $scope.days,
								                  providerCategory : $scope.providerCategory.type,
								                  cityDetails : $scope.cityDetails
								                  
								 } );
						 };
						 
						   
		} ]);
	   
	   publicControllers.controller('ProvidersController',
				  ['$scope','$rootScope' ,'$cookieStore',
				   '$state','$filter',
				    'cordovaGeolocationService',
				    'MetadataService',
				   function($scope, $rootScope, $cookieStore,$state,$filter,cordovaGeolocationService,MetadataService) {
					  
					  $scope.backTopId="topNav";

						var SW = new google.maps.LatLng(34.854, -6.307); //latitude, longitude for tz
					    var NE = new google.maps.LatLng(33.854, -5.307); 
					    var boundss = new google.maps.LatLngBounds(SW, NE);
						  
						
						  console.log($scope.city);
						    $scope.optionsCities = {
							  bounds: boundss,
						      country: 'tz',
						      types: '(cities)'
						    };  
						    $scope.cityDetails = $state.params.cityDetails;
						    $scope.city = $state.params.city;
						    $scope.provider_type= $state.params.providerCategory;
						    $scope.eventDate = $state.params.eventDate;
						   
						 // set available range
						    $scope.minPrice = 100;//TODO populate thus from back-end providers
						    $scope.maxPrice = 999;//TODO populate thus from back-end providers

						    // default the user's values to the available range
						    $scope.userMinPrice = $scope.minPrice;
						    $scope.userMaxPrice = $scope.maxPrice;

						  
						   console.log(JSON.stringify($state.params));
						  
						   MetadataService.$promise.then(function(result){
							  //console.log(JSON.stringify(result));
						    	 //$scope.meatadata = angular.toJson(result, true);PROVIDER_REP_ROLES
						    	// $scope.citiestz = $filter('filter')(result, { key: "CITIES" })[0].value;
						    	// $scope.listingRoles = $filter('filter')(result, { key: "PROVIDER_REP_ROLES" })[0].value;
						    	 $scope.countries = $filter('filter')(result, { key: "COUNTRIES" })[0].value;
						    	 $scope.provider_categories = $filter('filter')(result, { key: "PROVIDER_CATEGORIES" })[0].value;
						    	 $scope.providerCategory = $filter('filter')($scope.provider_categories, {type:$scope.provider_type})[0];
						    	 $scope.events = $filter('filter')(result, { key: "EVENTS" })[0].value;
						    	 //$scope.services = $filter('filter')(result, { key: "SERVICES" })[0].value;
						    	 //console.log(JSON.stringify($scope.provider_categories));
						    	 
						     });
							
						   $scope.viewDetails = function(providerID){
								 $state.go('details', { providerId: providerID });
								console.log(JSON.stringify( $state.params));
							 };
							 
							 /*
							  * To be used in as provider filter pass prov item
							  * ng-repeat='item in items|filter:priceRange'
							  */
							 $scope.priceRange = function(item) {
								    return (parseInt(item['min-acceptable-price']) >= $scope.minPrice && parseInt(item['max-acceptable-price']) <= $scope.maxPrice);
								  };
					  
		} ]);
	   
		  
		   publicControllers.controller('LoginController',
				  ['$scope','$rootScope','$location', '$cookieStore',
				   function($scope, $rootScope, $location, $cookieStore) {
		} ]);
		   
		
})();

