(function() {

	var publicControllers = angular.module('publicControllers', ['cordovaGeolocationModule','ngTextTruncate']);

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
					   // var res = str.replace(/blue|house|car/gi, function myFunction(x){return x.toUpperCase();});
					    
						  $scope.uselocation = false;
						  $scope.location = [];
						  $scope.maxDistance = 20000;
						  
						  $scope.captureUserLocation = function(){
								cordovaGeolocationService.getCurrentPosition(function(position){
									$scope.location[0] = position.coords.latitude;
									$scope.location[1] = position.coords.longitude;
									
							    });

							};
						   
						 $scope.search = function(){
							 //var locat = $scope.uselocation ? $scope.location[0] +','+ $scope.location[1] :''
							 $state.go("search",{ city : $scope.uselocation ? '' : $scope.city,
								                  eventDate : $scope.eventDate,
								                  toDate : $scope.eventToDate,
								                  providerCategory : $scope.providerCategory.type,
								                  nearLocationStr :$scope.uselocation ? '' : $scope.cityDetails.geometry.location,
								                  nearLocation: $scope.uselocation ?  $scope.location[0] +','+ $scope.location[1]: '' ,
								                  maxDistance : $scope.maxDistance,
								                  uselocation: $scope.uselocation
								                  
								 } );
						 };
						 
						 $scope.searchByTerm = function(searchingTerm){
							 $state.go("searchByTerm",{ searchTerm : searchingTerm });
						 };
						 
						 $scope.captureUserLocation(); // load user location		   
		} ]);
	   
	   publicControllers.controller('ProvidersController',
				  ['$scope','$rootScope' ,'$cookieStore',
				   '$state','$filter','$location','$anchorScroll',
				    'cordovaGeolocationService',
				    'MetadataService',
				    'ProvidersContainer',
				    'ProviderServiceByTerm',
				   function($scope, $rootScope, $cookieStore,$state,$filter,$location,$anchorScroll,cordovaGeolocationService,MetadataService,ProvidersContainer,ProviderServiceByTerm) {
					 
					  $scope.currentPage = 1;
					  $scope.pageSize = 10;

					  
					  $scope.resultFrom = $scope.currentPage;
					  $scope.resultTo =  $scope.pageSize; 
					 

					  
					  $scope.typefilter = [];
					  $scope.eventfilter =[];
					  $scope.cityfilter =[];
					  
					  
					  
					  $scope.backTopId="topNav";

						var SW = new google.maps.LatLng(34.854, -6.307); //latitude, longitude for tz
					    var NE = new google.maps.LatLng(33.854, -5.307); 
					    var boundss = new google.maps.LatLngBounds(SW, NE);
						  
						
						  
						    $scope.optionsCities = {
							  bounds: boundss,
						      country: 'tz',
						      types: '(cities)'
						    };  
						    $scope.cityDetails = $state.params.cityDetails;
						    $scope.city = $state.params.city;
						    $scope.provider_type= $state.params.providerCategory;
						    $scope.eventDate = $state.params.eventDate;
						    console.log($scope.cityDetails);
						   
						 // set available range
						    $scope.minPrice = 100;//TODO populate this from back-end providers
						    $scope.maxPrice = 999;//TODO populate this from back-end providers

						    // default the user's values to the available range
						    $scope.userMinPrice = $scope.minPrice;
						    $scope.userMaxPrice = $scope.maxPrice;

						  
						  // console.log(JSON.stringify($state.params));
						  
						   MetadataService.$promise.then(function(result){
							  //console.log(JSON.stringify(result));
						    	 //$scope.meatadata = angular.toJson(result, true);PROVIDER_REP_ROLES
						    	$scope.citiestz = $filter('filter')(result, { key: "CITIES" })[0].value;
						    	// $scope.listingRoles = $filter('filter')(result, { key: "PROVIDER_REP_ROLES" })[0].value;
						    	 $scope.countries = $filter('filter')(result, { key: "COUNTRIES" })[0].value;
						    	 $scope.provider_categories = $filter('filter')(result, { key: "PROVIDER_CATEGORIES" })[0].value;
						    	 $scope.providerCategory = $filter('filter')($scope.provider_categories, {type:$scope.provider_type})[0];
						    	 $scope.events = $filter('filter')(result, { key: "EVENTS" })[0].value;
						    	 //$scope.services = $filter('filter')(result, { key: "SERVICES" })[0].value;
						    	 //console.log(JSON.stringify($scope.provider_categories));
						    	
						    	 $scope.eventsCounts = $scope.events.map(function(e){
						    		 return {key : e.eid, count : 0 };
						    	 });
						    	 
						    	 $scope.providerCounts = $scope.provider_categories.map(function(p){
						    		 return {key : p.type, count : 0}
						    	 });
						    	 
						    	 $scope.providerCityCounts = $scope.citiestz.map(function(c){
						    		 return {key : c.cid, count : 0}
						    	 });
						    	 

						     });
						   
						   function updateCounts(providers){
							   /*
							    * update provider category Count
							    * Filter Providers, using key
							    */
							   for(index in $scope.providerCounts){
								   $scope.providerCounts[index].count = $filter('filter')(providers, {providerCategories :{type: $scope.providerCounts[index].key}}).length;
							   }
							   
							   /*
							    * update provider events Count
							    */
							   for(index in $scope.eventsCounts ){
								   $scope.eventsCounts[index].count = $filter('filter')(providers, {providerEvents :{eventId: $scope.eventsCounts[index].key}}).length;
							   }
							   
							   /*
							    * update provider city Count
							    */
							   for(index in providers ){
								  var c = providers[index].providerAddress.city.cid;
								  var  pos = $scope.providerCityCounts.map(function(e) { return e.key; }).indexOf(c); // index of city in city count
								  if(pos >= 0) $scope.providerCityCounts[pos].count += 1;
							   }

						   }
						   
						 
						   
						   if($state.current.data.detailsPage){
							   //Single Page
                             
							   $scope.listingSearch = ProvidersContainer.$promise.then(function(result){
								   $scope.currentProvider = result;
								   //-2.0185322,%2033.874615199999994
								   $scope.map = { center: { latitude: $scope.currentProvider.providerLocation[0], longitude: $scope.currentProvider.providerLocation[1] }};
								   //$scope.map = { center: { latitude: 33.874615199999994, longitude: -2.0185322 }};
							   });
							   
						   }else{
							   //Other pages
							   if (! $state.current.data.searchByName){
								   $scope.listingSearch = ProvidersContainer.$promise.then(function(results){
									   $scope.providerResult = results;
									   $scope.total =  $scope.providerResult.providers.length;
									   $scope.resultTo = $scope.resultTo > $scope.total ? $scope.total : $scope.resultTo;
									   updateCounts($scope.providerResult.providers)
								   },
								   function(httpResponse){
									   $scope.httpResponse = httpResponse.data;
									  // console.log($scope.httpResponse); // Deal with Errors here
									   });
							   }else {
								   $scope.listingSearch = ProviderServiceByTerm.query({searchingTerm : $state.params.searchTerm}).$promise.then(function(results){
									   $scope.providerResult = results;
									   $scope.total =  $scope.providerResult.providers.length;
									   $scope.resultTo = $scope.resultTo > $scope.total ? $scope.total : $scope.resultTo;
									   updateCounts($scope.providerResult.providers)
	
								   });
							   }
						   }
						   
							
						   
						   
						   $scope.pageChangeHandler = function(num) {
							   if(num == 1) {
							    
								  $scope.resultFrom = $scope.currentPage;
								  $scope.resultTo =  $scope.pageSize > $scope.total ? $scope.total : $scope.pageSize;  
							   }else{
								   var toResult = num * $scope.pageSize;
								   $scope.resultFrom = (num -1 ) * $scope.pageSize + 1;
								   $scope.resultTo = toResult < $scope.total ? toResult : $scope.total;
							   }

							  };


						   $scope.viewDetails = function(providerID){
								 $state.go('details', { providerId: providerID });
							 };
							 
							 $scope.search = function(){
								 $state.go("search",{ city : $scope.city,
									                  eventDate : $scope.eventDate,
									                  eventDays : $scope.days,
									                  providerCategory : $scope.providerCategory.type,
									                  nearLocationStr : $scope.cityDetails.geometry.location
									                  
									 } );
							 };
							 
							 $scope.scrollTo = function(id) {
								    $location.hash(id);
								    console.log($location.hash());
								    $anchorScroll();
								  };
							 
							 /*
							  * To be used in as provider filter pass prov item
							  * ng-repeat='item in items|filter:priceRange'
							  */
							 $scope.provType = function(provider){
								 return $scope.typefilter.length > 0 ? $filter('filter')($scope.typefilter, provider.providerCategories[0]).length > 0 : true;
							 };
							 
							 $scope.fromCity = function(provider){
								 return $scope.cityfilter.length > 0 ? $filter('filter')($scope.cityfilter, provider.providerAddress.city.cid).length > 0 : true;
							 };
							 
							 $scope.prvEvents = function(provider){
								 if ($scope.eventfilter.length == 0 ) return true;

								//Map provider events to Array of String for easy comparison
								 var providerEvents = provider.providerEvents.map(function(e){
									return e.eventId;
								});

								//check that provider events contains all the checked events
								 for (index in $scope.eventfilter) {
									    if($filter('filter')(providerEvents, $scope.eventfilter[index]).length == 0) return false;
									}
								 
								 return true;
							 };
							 
							 $scope.priceRange = function(item) {
								    return (parseInt(item['min-acceptable-price']) >= $scope.minPrice && parseInt(item['max-acceptable-price']) <= $scope.maxPrice);
								  };
								  
							//Results count
						   $scope.typeCount	= function(type)  {
							   return  $filter('filter')($scope.providerCounts, { key: type })[0].count;
						   };
						   
						   $scope.cityCount	= function(city)  {
							   return $filter('filter')($scope.providerCityCounts, { key: city })[0].count;
						   };
						   
						   $scope.eventCount = function(event)  {
							   return  $filter('filter')($scope.eventsCounts, { key: event })[0].count;
						   };
						   
						   $scope.hasThumbnailPhoto = function(prov){
							   return prov.hasOwnProperty('thumnailPhoto');
						   }; 
						   
						   $scope.hasPhotos = function(prov){
							   return prov.hasOwnProperty('gallaryPhotos');
						   };
					  
		} ]);
	   
		  
		   publicControllers.controller('LoginController',
				  ['$scope','$rootScope','$location', '$cookieStore',
				   function($scope, $rootScope, $location, $cookieStore) {
		} ]);
		   
		
})();

