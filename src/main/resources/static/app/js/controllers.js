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
				   'ModalService',
				    'cordovaGeolocationService','vcRecaptchaService','SiteVerifyService',
				    'MetadataService',
				    'ProvidersContainer',
				    'ProviderServiceByTerm',
				   function($scope, $rootScope, $cookieStore,$state,$filter,$location,$anchorScroll,ModalService,cordovaGeolocationService, vcRecaptchaService, SiteVerifyService,MetadataService,ProvidersContainer,ProviderServiceByTerm) {
					  
					  $scope.phone_pattern=/^((\+)|(00)|(\*)|())[0-9]{10,14}((\#)|())$/;
					  
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
						    $scope.minPrice = 0;//TODO populate this from back-end providers
						    $scope.maxPrice = 5000000;//TODO populate this from back-end providers

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
								 if ($scope.typefilter.length == 0) return true;
								 
								 
								//Map provider categories to Array of String for easy comparison
								 var providerCategories = provider.providerCategories.map(function(e){
									return e.type;
								});
								 //check that provider categories contains all checked type(s)
								 for(index in $scope.typefilter){
									 if ($filter('filter')(providerCategories, $scope.typefilter[index].type).length == 0) return false;
								 }
								 
								 return true;
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
							 
							 $scope.priceRange = function(provider) {
								    return (parseInt(provider.priceRange.priceFrom) >= $scope.userMinPrice && parseInt(provider.priceRange.priceTo) <= $scope.userMaxPrice);
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
						   
						   //Robot Verification
						   
						   $scope.response = null;
			                $scope.widgetId = null;
			                $scope.siteResponseSucess = false;

			                $scope.model = {
			                    key: providerAppConfig.siteKey
			                };
			                
			                $scope.setResponse = function (response , id) {
			                	//console.log(($scope.widgetId == id));
			                    $scope.response = response;
			                    $scope.verifyRequest={"gCaptchaResponse" : vcRecaptchaService.getResponse(id)};
			                    SiteVerifyService.save({},$scope.verifyRequest, function(httpResponse,responseHeaders){
			        				$scope.httpResponse = httpResponse;
			        				 $scope.siteResponseSucess = $scope.httpResponse.success;
			        				 console.info($scope.httpResponse);
			        				 if(!$scope.siteResponseSucess){
			        					 // In case of a failed validation you need to reload the captcha
			                             // because each response can be checked just once
			                             vcRecaptchaService.reload($scope.widgetId);
			                             vcRecaptchaService.reload(0);
			        				 }
			        			},function(httpResponse){
			                         console.log(httpResponse.data);
			                         $scope.siteResponseSucess = false;
			        			});
			                    
			                };
			                
			               


			                $scope.setWidgetId = function (widgetId) {
			                    console.info('Created widget ID: %s', widgetId);
			                    $scope.siteResponseSucess = false;
			                    $scope.widgetId = widgetId;
			                };
			                
			              


			                $scope.cbExpiration = function() {
			                    console.info('Captcha expired. Resetting response object');
			                    $scope.siteResponseSucess = false;
			                    $scope.response = null;
			                 };
			                 

						  //show model window
						   var serv = $state.params.providerCategory === undefined ? "(--service--name--)":$state.params.providerCategory ;
						   $scope.messageToProvider = {
								   eventEndDate : $state.params.toDate ,
								   eventStartDate : $state.params.eventDate,
								   category : $state.params.providerCategory,
								   subject: "Hi, I found your  "+  serv +"  listing on Emefana.com and I'd like to know it's availability for my upcoming --event-name-- on the dates  below. Thanks!"
						   };
						   
						   $scope.show = function(provider) {
						        ModalService.showModal({
						            templateUrl: 'availabilityModelContent.html',
						            controller: "ModalController",
						            inputs: {
						                contactProvider: provider,
						                messageToProvider:  $scope.messageToProvider

						              }
						        }).then(function(modal) {
						            modal.element.modal();
						            modal.close.then(function(result) {
						                $scope.message = "You said " + result;
						                console.log( $scope.message);
						            });
						        });
						    };
						    
					$scope.contactProvider = function(){
						$scope.siteResponseSucess = false;
	                    $scope.response = null;
						vcRecaptchaService.reload($scope.widgetId);
						vcRecaptchaService.reload(0);
						
						console.log(JSON.stringify($scope.messageToProvider));
					};
					
					$scope.canContactProvider = function(){
	                	return $scope.contactProviderForm.$valid && $scope.contactProviderForm.$dirty && $scope.siteResponseSucess;
	                };
	                
	                $scope.canContactProvider1 = function(){
	                	return $scope.contactProviderForm1.$valid && $scope.contactProviderForm1.$dirty && $scope.siteResponseSucess;
	                };
					  
		} ]);
	   
		  
		   publicControllers.controller('LoginController',
				  ['$scope','$rootScope','$location', '$cookieStore',
				   function($scope, $rootScope, $location, $cookieStore) {
		} ]);
		   
		   publicControllers.controller('ModalController',
					  ['$scope','contactProvider', 'messageToProvider', 'vcRecaptchaService','SiteVerifyService','close',function($scope, contactProvider, messageToProvider, vcRecaptchaService, SiteVerifyService,close) {
						  $scope.phone_pattern=/^((\+)|(00)|(\*)|())[0-9]{10,14}((\#)|())$/;
						  $scope.contactProvider =  contactProvider;
						  $scope.messageToProvider = messageToProvider;
						  
						  $scope.close = function(result) {
							  console.log(JSON.stringify($scope.messageToProvider));
							 	close(result, 500); // close, but give 500ms for bootstrap to animate
							 };
							 
                $scope.canContactProvider = function(){
                	return $scope.contactProviderForm.$valid && $scope.contactProviderForm.$dirty && $scope.siteResponseSucess;
                };
                
                $scope.response = null;
                $scope.widgetId = null;
                $scope.siteResponseSucess = false;

                $scope.model = {
                    key: providerAppConfig.siteKey
                };

                $scope.setResponse = function (response) {
                    $scope.response = response;
                    $scope.verifyRequest={"gCaptchaResponse" : vcRecaptchaService.getResponse($scope.widgetId)};
                    SiteVerifyService.save({},$scope.verifyRequest, function(httpResponse,responseHeaders){
        				$scope.httpResponse = httpResponse;
        				 $scope.siteResponseSucess = $scope.httpResponse.success;
        				 console.info($scope.httpResponse);
        				 if(!$scope.siteResponseSucess){
        					 // In case of a failed validation you need to reload the captcha
                             // because each response can be checked just once
                             vcRecaptchaService.reload($scope.widgetId);
        				 }
        			},function(httpResponse){
                         console.log(httpResponse.data);
                         $scope.siteResponseSucess = false;
        			});
                    
                };

                $scope.setWidgetId = function (widgetId) {
                    console.info('Created widget ID: %s', widgetId);
                    $scope.siteResponseSucess = false;
                    $scope.widgetId = widgetId;
                };

                $scope.cbExpiration = function() {
                    console.info('Captcha expired. Resetting response object');
                    $scope.siteResponseSucess = false;
                    $scope.response = null;
                 };


			} ]);
		   
		
})();

