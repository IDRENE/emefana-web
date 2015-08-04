(function() {

	var providerControllers = angular.module('providerControllers', ['ngGeolocation','cordovaGeolocationModule']);

	  providerControllers.controller('RegisterController',
			  ['$scope',
			   '$rootScope', 
			   '$geolocation',
			   '$state',
			   '$filter',
			   'cordovaGeolocationService',
			   'MetadataService',
			   'ListingService', 
			   'vcRecaptchaService',
			   'SiteVerifyService',
			   function($scope,$rootScope,$geolocation,$state,$filter,cordovaGeolocationService, MetadataService,ListingService,vcRecaptchaService,SiteVerifyService) {
			
		     $scope.phone_pattern=/^((\+)|(00)|(\*)|())[0-9]{10,14}((\#)|())$/;
		     
		     $scope.response = null;
	         $scope.widgetId = null;
	         $scope.siteResponseSuccess = false;

	         $scope.model = {
	             key: providerAppConfig.siteKey
	         };
		     
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

		     
		     MetadataService.$promise.then(function(result){
		    	 //$scope.meatadata = angular.toJson(result, true);PROVIDER_REP_ROLES
		    	 $scope.cities = $filter('filter')(result, { key: "CITIES" })[0].value;
		    	 $scope.listingRoles = $filter('filter')(result, { key: "PROVIDER_REP_ROLES" })[0].value;
		    	 $scope.countries = $filter('filter')(result, { key: "COUNTRIES" })[0].value;
		    	 $scope.provider_categories = $filter('filter')(result, { key: "PROVIDER_CATEGORIES" })[0].value;
		    	 $scope.events = $filter('filter')(result, { key: "EVENTS" })[0].value;
		    	 $scope.services = $filter('filter')(result, { key: "SERVICES" })[0].value;
		    	 
		     });
		     
		     
			
			 $scope.features = [];
			 
			  $scope.provider = {
					  venues : [ ],
					  features : [ ],
					  services : [ ],
					  events : [ ],
			  };
			  
			 
			  

			 $scope.getCssClasses = function(ngModelContoller) {
				    return {
				      error: ngModelContoller.$invalid && ngModelContoller.$dirty,
				      success: ngModelContoller.$valid && ngModelContoller.$dirty
				    };
				  };

				  
				  $scope.showError = function(ngModelController, error) {
				    return ngModelController.$error[error];
				  };
				  
				  /**
				   * 
				   */
				  $scope.canGoNext = function() {
					  if($state.includes("register.features")){// Set Provider city, as it not possible for google places to persist values btn pages
						 
						var cityArray = $state.params.incity.split(",");
						var strLocation = $state.params.location;

						  $scope.provider.city= {
								    "cid": cityArray[0],
								    "region":cityArray.length > 2 ? cityArray[1] : cityArray[0]  ,
								    "country": cityArray[cityArray.length -1],
								    "location": [0,0],
								    "strLocation" : strLocation
						   }
						  
						 // console.log($scope.provider.city);//TODO on Server
						  

					  }
					 
					    return $scope.listingForm.$valid && $scope.listingForm.$dirty ;
					};
					  
				  $scope.canSave = function(){
					  return $scope.provider.agree && $scope.canGoNext() && $scope.hasEventtypes() && $scope.isVenuesWithVenueSpace() && $scope.siteResponseSuccess;
				  }	;  
				  
				  $scope.toJSON = function(obj) {
					    return JSON.stringify(obj, null, 2);
					  };
				 
			  //general information
			  $scope.provider.uselocation = false;
			  
			  $scope.loadmap = function(){
					if($scope.provider.uselocation){
						$scope.$geolocation = $geolocation;
						// basic usage
//					    $geolocation.getCurrentPosition().then(function(location) {
//					      $scope.provider.location = location.coords;
//					      console.log(JSON.stringify(location.coords.latitude ));
//					    });
//						    $geolocation.watchPosition({
//						      timeout: 60000,
//					      maximumAge: 250,
//						      enableHighAccuracy: true
//						    });
					}
					
					
					cordovaGeolocationService.getCurrentPosition(function(position){
//				        alert(
//				            'Latitude: '          + position.coords.latitude          + '\n' +
//				            'Longitude: '         + position.coords.longitude         + '\n' +
//				            'Altitude: '          + position.coords.altitude          + '\n' +
//				            'Accuracy: '          + position.coords.accuracy          + '\n' +
//				            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//				            'Heading: '           + position.coords.heading           + '\n' +
//				            'Speed: '             + position.coords.speed             + '\n' +
//				            'Timestamp: '         + position.timestamp                + '\n'
//				        );
						//console.log(JSON.stringify(position.coords.latitude  ));
						$scope.provider.location = position.coords ;
						$scope.provider.location.latitude = position.coords.latitude;
						$scope.provider.latitude = position.coords.latitude;
						$scope.provider.longitude = position.coords.longitude;
						$scope.provider.location.longitude = position.coords.longitude;
						
						//console.log(JSON.stringify($scope.provider.location.longitude ));
						//console.log(JSON.stringify($scope.provider.location.latitude ));
					//	$scope.provider.location.longitude = position.coords.longitude ;
						
						
				    });
					//console.log(JSON.stringify($scope.provider.location.latitude));
					   
				};
			 $scope.hasVenue = function(){
				 if ($scope.provider.category === undefined) return false;
				 if ($scope.provider.category.type === undefined) return false;
				 return $scope.provider.category.type === "Venues";
			 };
			 
			 /*
			  * Returns true for no Venues providers
			  */
			 $scope.isVenuesWithVenueSpace = function(){
				 if (!$scope.hasVenue()|| $scope.provider.venues === undefined) return true;
					return $scope.provider.venues.length > 0;	
			 };
			 
			 $scope.hasServices = function(){
				 if($scope.provider.services === undefined) return false;
					
				 return $scope.provider.services.length > 0;
			 };
			 
			 $scope.hasEventtypes= function(){
				 if ($scope.provider.events === undefined) {
						return false;
					}
					
				 return $scope.provider.events.length > 0;
			 };
			 
			 $scope.addVenue = function(){
				 $scope.provider.venues.push({name : '',capacity : '',price : ''});
			 };
			 
			 
			 $scope.removeVenue = function(index){
				 $scope.provider.venues.splice(index, 1);
			 };
			 
			 $scope.addService = function(){
				
				 $scope.provider.services.push( { service :{
				      sid: '',
				      providerTypes: [
				        {
				          type: ''
				        }
				      ]
				    },
				   description: '',
				   price :{
					    price: '',
				        currency: ''
				        }
				   
			    });
			 };
			 
			 $scope.removeService = function(index){
				 $scope.provider.services.splice(index, 1);
			 };
			 
			 // services
			 $scope.checkAll = function(type) {
				 if(type == "E"){
					 
					 $scope.provider.events = angular.copy($scope.events);
				 }
					 
				 if(type == "S"){

					 //filter by provider category & then copy {providerTypes:provider.category}
					 $scope.provider.services= angular.copy($filter('filter')($scope.services, {providerTypes:$scope.provider.category}));
				 }
				 
				 if(type == "F"){
					 $scope.provider.features= angular.copy($scope.features);
				 }
					 
			 };
			 $scope.uncheckAll = function(type) {
				 if(type == "E"){$scope.provider.events = []; }
				 if(type == "F"){$scope.provider.features = []; }
				 if(type == "S"){$scope.provider.services = []; }
			    
			    
			  };
			  
			  //Features
			  $scope.provider.feature ='';
			  $scope.provider.agree = false;
			  
			 $scope.addFeature = function(){
				 $scope.provider.features.push({name :$scope.provider.feature,description:[ ] });
				 $scope.provider.feature='';//re-set to empty
			 }; 
			 
			 $scope.removeFeature = function(index){
				 $scope.provider.features.splice(index,1);
			 };
			  
			$scope.addFeatureDescription = function(index)  {
				 $scope.provider.features[index].description.push('');
			};
			
			$scope.removeFeatureDescription = function(index1,index)  {
				feature = $scope.provider.features[index1].description.splice(index, 1);
				
			};
			
			//photo 
			 $scope.provider.photo;
			 
//		photo =	 {
//				  "filesize": 54836,
//				  "filetype": "image/jpeg",
//				  "filename": "profile.jpg",
//				  "base64":   "/9j/4AAQSkZJRgABAgAAAQABAAD//gAEKgD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQA..."
//				}
		$scope.submitListing = function(){
			$scope.httpResponse = {};
			//console.log(JSON.stringify($scope.provider.latitude ));
			//console.log(JSON.stringify($scope.provider.longitude ));
			$scope.listingSubmission = ListingService.save({},$scope.provider, function(httpResponse,responseHeaders){
				$scope.httpResponse = httpResponse; // think of returning listing code , for future correspondence
				$scope.provider = {};
				$state.go("register.registered");
			},function(httpResponse){
				$scope.httpResponse = httpResponse.data;
				$state.go("register.start");
			});
			
		};	 
		

         $scope.setResponse = function (response) {
             $scope.response = response;
             $scope.verifyRequest={"gCaptchaResponse" : vcRecaptchaService.getResponse($scope.widgetId)};
             SiteVerifyService.save({},$scope.verifyRequest, function(httpResponse,responseHeaders){
 				$scope.httpResponse = httpResponse;
 				$scope.siteResponseSuccess = $scope.httpResponse.success;
 				 console.info($scope.httpResponse);
 				 if(!$scope.siteResponseSuccess){
 					 // In case of a failed validation you need to reload the captcha
                      // because each response can be checked just once
                      vcRecaptchaService.reload($scope.widgetId);
 				 }
 			},function(httpResponse){
                  console.log(httpResponse.data);
                  $scope.siteResponseSuccess = false;
 			});
             
         };

         $scope.setWidgetId = function (widgetId) {
             console.info('Created widget ID: %s', widgetId);
             $scope.siteResponseSuccess = false;
             $scope.widgetId = widgetId;
         };

         $scope.cbExpiration = function() {
             console.info('Captcha expired. Resetting response object');
             $scope.siteResponseSuccess = false;
             $scope.response = null;
          };


		
			 
	} ]);
	  
	  providerControllers.controller('IndexController',
			  ['$scope','$rootScope',
			   function($scope,$rootScope) {
				  $scope.backTopId="topHead";
	} ]);
	  
	  providerControllers.controller('LoginController',
			  ['$scope','$rootScope','$location', '$cookieStore',
			   function($scope, $rootScope, $location, $cookieStore) {
	} ]);

})();

