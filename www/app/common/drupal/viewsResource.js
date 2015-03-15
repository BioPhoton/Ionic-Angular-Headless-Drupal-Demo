/**
 * Views Resource Modules
 */
var ViewsResourceModules = angular.module('ViewsResourceModules', ['drupal.configurations']);


//@TODO config provider

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
	// Actions:
	// Retrieve action
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
ViewsResourceModules.service('ViewsResource', [ 'drupalApiConfig', 'ViewsResourceConfig', 'ViewsResourceChannel', '$http', '$q', 
                             function(drupalApiConfig,   ViewsResourceConfig,   ViewsResourceChannel,   $http,   $q) {
	

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
	 * @param {String} display_id The display ID of the view to get., required:false, source:param
	 * @param {Array} args A list of arguments to pass to the view., required:false, source:param
	 * @param {Integer} offset The number of the entry for the page begin with., required:false, source:param
	 * @param {Integer} limit The total number of entries to list., required:false, source:param
	 * @param {Boolean} format_output Whether to return the raw data results or style the results., required:false, source:param
	 * @param {Array} filters A list of filters to pass to the view. These are defined by the exposed filters on your view. Example call: /views/your_view?filters[nid]=12345, required:false, source:param
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
	var retrieve = function(view_name, display_id, args, offset, limit, format_output, filters, exp_filters, exp_sort){
		
		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + ViewsResourceConfig.resourcesPath + '/' + view_name; 
		retrievePath +=  ((display_id || args || offset || limit || format_output || filters || exp_filters || exp_sort)?'?':'');
		retrievePath += ( (display_id)?('display_id='+display_id+'&'):'') + ((args)?('args='+args+'&'):'') + ((offset)?('offset='+offset+'&'):'') + ((limit)?('limit='+limit+'&'):'') + ((format_output)?('format_output='+format_output+'&'):'') + ((filters)?(filters+'&'):'');
		retrievePath += ((exp_filters)?(exp_filters+'&'):'') + ((exp_sort)?(exp_sort):'') 
		
			requestConfig = {
	 			method: 'GET',
				url : retrievePath,
				headers: {
					//@TODO use the format of drupalApiServiceConfig
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
	 	 	  },
	 	 	  defer = $q.defer(),
			errors = [];
 			
 			//if not given
 			//if(!view_name) { errors.push('Param view_name is required.'); }
 			
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

	//public methods	
	return {
		retrieve : retrieve
	};
	
}]);