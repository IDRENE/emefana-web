'use strict';


/* Services */
(function() {
 var publicServices = angular.module('publicServices', ['ngResource']);
 
 var host = "http://"+ providerAppConfig.host;

publicServices.factory('MetaService', ['$resource',function($resource){
    return $resource(host+'/api/metadata', {},{
			    query : {
					method : 'GET',
					headers : {'Accept': 'application/json'},
					isArray: true
			  }
	  });
  
}]);

publicServices.factory('ListingService', ['$resource',function($resource){
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

publicServices.factory('SiteVerifyService', ['$resource',function($resource){
    return $resource('/api/siteverify', {},{
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
    
    publicServices.factory('ProviderService', ['$resource',function($resource){
        return $resource(host+'/api/search/providers/:referenceId', 
        		{
        	      referenceId: '@referenceId',
        	      
        		},
        		
        		{
    			 query : {
    					method : 'GET',
    					headers : {'Accept': 'application/json'},
    					isArray: false
    			  },
    			  get :{
    				    method : 'GET',
      					headers : {'Accept': 'application/json'},
      					isArray: false

    				  }
    	  });

}]);
    
    publicServices.factory('ProviderServiceByTerm', ['$resource',function($resource){
        return $resource(host+'/api/search-term/providers', {},
        		{
    			 query : {
    					method : 'GET',
    					headers : {'Accept': 'application/json'},
    					isArray: false
    			  }
    	  });

}]);
    
})();
