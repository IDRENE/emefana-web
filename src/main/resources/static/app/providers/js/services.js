'use strict';

/* Services */
var providerServices = angular.module('providerServices', ['ngResource']);

providerServices.factory('MetaService', ['$resource',function($resource){
    return $resource('http://localhost:8080/api/metadata', {},{
			    query : {
					method : 'GET',
					headers : {'Accept': 'application/json'},
					isArray: true
			  }
	  });
  
}]);

providerServices.factory('ListingService', ['$resource',function($resource){
    return $resource('http://localhost:8080/api/provider', {},{
			    save : {
					method : 'POST',
					headers : {
						       'Accept': 'application/json',
						       'Content-Type': 'application/json'
						},
					isArray: false
			  }
	  });
  
}]);