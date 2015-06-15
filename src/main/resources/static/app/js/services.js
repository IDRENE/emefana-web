'use strict';


/* Services */
(function() {
 var publicServices = angular.module('publicServices', ['ngResource']);

publicServices.factory('MetaService', ['$resource',function($resource){
    return $resource('http://10.0.0.17:8080/api/metadata', {},{
			    query : {
					method : 'GET',
					headers : {'Accept': 'application/json'},
					isArray: true
			  }
	  });
  
}]);

publicServices.factory('ListingService', ['$resource',function($resource){
    return $resource('http://10.0.0.17:8080/api/provider', {},{
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
        return $resource('http://10.0.0.17:8080/api/search/providers/:referenceId', 
        		{
        	      referenceId: '@providerId',
        	      
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
        return $resource('http://10.0.0.17:8080/api/search-term/providers', {},
        		{
    			 query : {
    					method : 'GET',
    					headers : {'Accept': 'application/json'},
    					isArray: false
    			  }
    	  });

}]);
    
})();
