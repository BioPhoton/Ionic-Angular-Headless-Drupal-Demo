/**
 * Views Resource Modules
 */
var ViewsResourceModules = angular.module('ViewsResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for ViewsResourceModules 
*/
ViewsResourceModules.constant("ViewsResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'views',
	//actions of node resource
	actions : {
		//retrieve 	: 'retrieve'
	},
	  
	//
	// Constants for NodeResourceChannel
	//
	// Event names:
	// Retrieve events
	views_retrieveConfirmed	: 'event:drupal-views-retrieveConfirmed',
	views_retrieveFailed  	: 'event:drupal-views-retrieveFailed',

}); 

/*Notification channel for the views resource */
ViewsResourceModules.service('ViewsResourceChannel', ['$rootScope', 'ViewsResourceConfig',
                                             function ($rootScope,   ViewsResourceConfig) {	
	
	// Retrieve Action
	
	// Publish views retrieve confirmed event
    var publishViewsRetrieveConfirmed = function (viewData) {
        $rootScope.$broadcast(ViewsResourceConfig.views_retrieveConfirmed, {viewData: viewData});
    };
    // Subscribe to views retrieve confirmed event
    var onViewsRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(ViewsResourceConfig.views_retrieveConfirmed, function(event, args) {
	    handler(args.viewData);
	   });	
    };
    
	// Publish views retrieve failed event
    var publishViewsRetrieveFailed = function (error) {
        $rootScope.$broadcast(ViewsResourceConfig.views_retrieveFailed, {error: error});
    };
    // Subscribe to views retrieve failed event
    var onViewsRetrieveFailed = function($scope, handler) {
    	$scope.$on(ViewsResourceConfig.views_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };


 // public methods
 return {	   
	   //Retrieve event
	   publishViewsRetrieveConfirmed 	: publishViewsRetrieveConfirmed,
	   onViewsRetrieveConfirmed 		: onViewsRetrieveConfirmed,
	   publishViewsRetrieveFailed		: publishViewsRetrieveFailed,
	   onViewsRetrieveFailed			: onViewsRetrieveFailed,
 	};
}]);


/**
 * ViewsResource
 * 
 * This service mirrors the Drupal views resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * 
 * your_api_endpoint/views/*|<mirror>|POST|Content-Type
 * 
 * Docs: 
 * https://www.drupal.org/project/views_datasource
 * 
**/

//http://blog.revolunet.com/blog/2014/02/14/angularjs-services-inheritance/
ViewsResourceModules.factory('ViewsResource', [   'ViewsResourceConfig', 'BaseResource', 'drupalApiConfig', '$http', '$q',  'ViewsResourceChannel', 
                                        function(  ViewsResourceConfig, BaseResource,  drupalApiConfig,   $http,   $q,     ViewsResourceChannel) {

    // define a new internal private method for this object
    function prepareRetrieveGetParams(options) {

        var type = undefined;
		//prepare and set optional params
		angular.forEach(options, function(value , key) {
			if(key === 'exposed_filters') { type = 'json'; }
			BaseResource.prepareAndSetGetParam(value, key, type);
	        type = undefined;
	    });
		
		var getParamsString = BaseResource.getParams.join('&');
		BaseResource.getParams = [];
		
		return getParamsString;
    }
	
	/*
	 * Retrieve
	 * 
	 * Retrieves a view.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/views/{VIEW_NAME}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} view_name The name of the view to get., required:true, source:path
	 * @param {Json-Object} options
	 * options@key {String} display_id The display ID of the view to get., required:false, source:param
	 * options@key {Array} args A list of arguments to pass to the view., required:false, source:param
	 * options@key {Integer} offset The number of the entry for the page begin with., required:false, source:param
	 * options@key {Integer} limit The total number of entries to list., required:false, source:param
	 * options@key {Boolean} format_output Whether to return the raw data results or style the results., required:false, source:param
	 * options@key {Array} exposed_filters A list of filters to pass to the view. These are defined by the exposed filters on your view. Example call: /views/your_view?filters[nid]=12345, required:false, source:param
	 * 
	 * 
	 * @return 	{Promise}
	 * 
	 * Custom view settings
	 * exposed filters: create them in the view under "Filter criteria". Expose them for users. Under the more tab in "Configure filter criterion" in the field "Filter identifier" you can change the field name. Use it like => comment_count=4
	 * order by : create them in the view under "Sort criteria".  Expose it for users and use it like => sort_by=created&sort_order=ASC
	 * 
	 * 
	 */
	var retrieve = function(view_name, options){
		
		var self = this;
		
		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + ViewsResourceConfig.resourcePath + '/' + view_name; 
		
		if(options) {
			retrievePath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
			retrievePath += prepareRetrieveGetParams(options);
		}
		
		requestConfig = {
 			method: 'GET',
			url : retrievePath,
			//@TODO set these over the format options in baseRecource
			headers: {
				"Accept" 		: "application/json",
				"Content-Type"	: "application/json",
			},
 	 	},
 	 	defer = $q.defer(),
		errors = [];
 			
		//if not given
		if(!view_name) { errors.push('Param view_name is required.'); }
		
		if(errors.length != 0) {
			ViewsResourceChannel.publishViewsRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}		
				
		$http(requestConfig)
		.success(function(data, status, headers, config){
			ViewsResourceChannel.publishViewsRetrieveConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			ViewsResourceChannel.publishViewsRetrieveFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;

	};

	return {
		retrieve : retrieve
	};
	
}]);