'use strict';

/* Filters */
(function() {
 var publicFilters = angular.module('publicFilters', []);

	publicFilters.filter('checkmark', function() {
	  return function(input) {
	    return input ? '\u2713' : '\u2718';
	  };
 });
	
	publicFilters.filter('distance', function () {
		return function (input) {
		    if (input >= 1) {
		        return input.toFixed(2) + 'km';
		    } else {
		        return (input*1000).toFixed(2) + 'm';
		    }
		}
		})
})();