'use strict';

/* Services */
var publicServices = angular.module('publicServices', ['ngResource']);

publicServices.factory('MetaService', ['$resource',function($resource){
    return $resource('http://10.0.0.5:8080/api/metadata', {},{
			    query : {
					method : 'GET',
					headers : {'Accept': 'application/json'},
					isArray: true
			  }
	  });
  
}]);

publicServices.factory('ListingService', ['$resource',function($resource){
    return $resource('http://10.0.0.5:8080/api/provider', {},{
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

