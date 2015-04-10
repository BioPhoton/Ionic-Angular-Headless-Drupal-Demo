/**
 * SearchNode Resource Modules
 */
var SearchNodeResourceModules = angular.module('SearchNodeResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for SearchNodeResourceModules 
 */
SearchNodeResourceModules.constant("SearchNodeResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'search_node',
	//actions of search_node resource
	actions : {
		//retrieve 	: 'retrieve',
	},
	  
	//
	// Constants for SearchNodeResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	searchNode_retrieveConfirmed		: 'event:drupal-searchNode-retrieveConfirmed',
	searchNode_retrieveFailed  		: 'event:drupal-searchNode-retrieveFailed'
	
});

/*Notification channel for the search_node resource */
SearchNodeResourceModules.service('SearchNodeResourceChannel', ['$rootScope', 'SearchNodeResourceConfig',
                                                       function ($rootScope,   SearchNodeResourceConfig) {	
	
	// Retrieve Action
	
	// Publish search_node retrieve confirmed event
    var publishSearchNodeRetrieveConfirmed = function (result) {
        $rootScope.$broadcast(SearchNodeResourceConfig.searchNode_retrieveConfirmed, {result: result});
    };
    // Subscribe to search_node retrieve confirmed event
    var onSearchNodeRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(SearchNodeResourceConfig.searchNode_retrieveConfirmed, function(event, args) {
	    handler(args.result);
	   });	
    };
    
	// Publish search_node retrieve failed event
    var publishSearchNodeRetrieveFailed = function (error) {
        $rootScope.$broadcast(SearchNodeResourceConfig.searchNode_retrieveFailed, {error: error});
    };
    // Subscribe to search_node retrieve failed event
    var onSearchNodeRetrieveFailed = function($scope, handler) {
    	$scope.$on(SearchNodeResourceConfig.searchNode_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
 // public methods
 return {	   
	   //Retrieve event
	   publishSearchNodeRetrieveConfirmed		: publishSearchNodeRetrieveConfirmed,
	   onSearchNodeRetrieveConfirmed			: onSearchNodeRetrieveConfirmed,
	   publishSearchNodeRetrieveFailed		    : publishSearchNodeRetrieveFailed,
	   onSearchNodeRetrieveFailed 			    : onSearchNodeRetrieveFailed
 	};
}]);

/**
 * SearchNodeResource
 * 
 * This service mirrors the Drupal search_node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/search_node*|<mirror>|POST|Content-Type
 * 
**/
SearchNodeResourceModules.service('SearchNodeResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'SearchNodeResourceConfig', 'SearchNodeResourceChannel', '$http', '$q', 
                                                  function($rootScope,  drupalApiConfig,   BaseResource,   SearchNodeResourceConfig,   SearchNodeResourceChannel,   $http,   $q) {
	
	
	// define a new internal private method for this object
    function prepareSearchNodeGetParams(options) {

    	var type = undefined;
		//prepare and set optional params
		angular.forEach(options, function(value , key) {
		    if(key === 'fields') { type = 'array'; }
			BaseResource.prepareAndSetGetParam(value, key, type);
	        type = undefined;
	    });
		var getParamsString = BaseResource.getParams.join('&');
		BaseResource.getParams = [];
		
		return getParamsString;
    }
	
	
	
	/*
	 * 
	 * Retrieve
	 * 
	 * Drupal CORS settings: 
	 * "api_endpoint/search_node/*|<mirror>|GET|Content-Type"
	 * 
	 * Retrieves a searchresult
	 * 
	 * Method: GET 
	 * Url: http://dev-drupal-headless-ionic.pantheon.io/api/v1/search_node/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String}  keys The search key(s), required:true, source:param
	 * @param {Boolean} simple Return a simple result or full nodes., required:false, source:param
	 * @param {Array}   keys Limit nodes to these fields when not using simple results., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(options){
		console.log(options); 
		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + SearchNodeResourceConfig.resourcePath + '/';
		retrievePath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		retrievePath += prepareSearchNodeGetParams(options);
		
	    var defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!options.keys) { errors.push('Param keys is required.'); }
		
		if(errors.length != 0) {
			SearchNodeResourceChannel.publishSearchNodeRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				SearchNodeResourceChannel.publishSearchNodeRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				SearchNodeResourceChannel.publishSearchNodeRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	//public methods	
	return {
		retrieve 	: retrieve,
	};
	
}]);