'use strict';

/* Services */
var providerServices = angular.module('providerServices', ['ngResource']);

var host = "http://"+ providerAppConfig.host;

providerServices.factory('MetaService', ['$resource',function($resource){
    return $resource(host+'/api/metadata', {},{
			    query : {
					method : 'GET',
					headers : {'Accept': 'application/json'},
					isArray: true
			  }
	  });
  
}]);

providerServices.factory('ListingService', ['$resource',function($resource){
    return $resource(host+'/api/provider', {},{
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

providerServices.factory('SiteVerifyService', ['$resource',function($resource){
    return $resource('providers/api/siteverify', {},{
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