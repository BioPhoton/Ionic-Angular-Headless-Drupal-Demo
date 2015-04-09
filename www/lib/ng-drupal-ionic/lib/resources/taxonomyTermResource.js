/**
 * TaxonomyTerm Resource Modules
 */
var TaxonomyTermResourceModules = angular.module('TaxonomyTermResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for TaxonomyTermResourceModules 
 */
TaxonomyTermResourceModules.constant("TaxonomyTermResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'taxonomy_term',
	//actions of taxonomyTerm resource
	actions : {
		//retrieve 		: 'retrieve',
		//create		: 'create',
		//delete		: 'delete',
		//index 		: 'index',
		selectNodes  	: 'selectNodes'
	},
	  
	//
	// Constants for TaxonomyTermResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	taxonomyTerm_retrieveConfirmed		: 'event:drupal-taxonomyTerm-retrieveConfirmed',
	taxonomyTerm_retrieveFailed  		: 'event:drupal-taxonomyTerm-retrieveFailed',
	// Create action
	taxonomyTerm_createConfirmed		: 'event:drupal-taxonomyTerm-createConfirmed',
	taxonomyTerm_createFailed  			: 'event:drupal-taxonomyTerm-createFailed',
	// Update action
	taxonomyTerm_updateConfirmed		: 'event:drupal-taxonomyTerm-updateConfirmed',
	taxonomyTerm_updateFailed  			: 'event:drupal-taxonomyTerm-updateFailed',
	// Delete action
	taxonomyTerm_deleteConfirmed		: 'event:drupal-taxonomyTerm-deleteConfirmed',
	taxonomyTerm_deleteFailed  			: 'event:drupal-taxonomyTerm-deleteFailed',
	// Index action
	taxonomyTerm_indexConfirmed			: 'event:drupal-taxonomyTerm-indexConfirmed',
	taxonomyTerm_indexFailed  			: 'event:drupal-taxonomyTerm-indexFailed',
	// Select Nodes action
	taxonomyTerm_selectNodesConfirmed	: 'event:drupal-taxonomyTerm-selectNodesConfirmed',
	taxonomyTerm_selectNodesFailed  	: 'event:drupal-taxonomyTerm-selectNodesFailed',
	
});

/*Notification channel for the taxonomyTerm resource */
TaxonomyTermResourceModules.service('TaxonomyTermResourceChannel', ['$rootScope', 'TaxonomyTermResourceConfig',
                                                           function ($rootScope,   TaxonomyTermResourceConfig) {	
	
	// Retrieve Action
	
	// Publish taxonomyTerm retrieve confirmed event
    var publishTaxonomyTermRetrieveConfirmed = function (term) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_retrieveConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm retrieve confirmed event
    var onTaxonomyTermRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_retrieveConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm retrieve failed event
    var publishTaxonomyTermRetrieveFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_retrieveFailed, {error: error});
    };
    // Subscribe to taxonomyTerm retrieve failed event
    var onTaxonomyTermRetrieveFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish taxonomyTerm create confirmed event
    var publishTaxonomyTermCreateConfirmed = function (term) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_createConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm create confirmed event
    var onTaxonomyTermCreateConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_createConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
  
	// Publish create create failed event
    var publishTaxonomyTermCreateFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_createFailed, {error: error});
    };
    // Subscribe to taxonomyTerm create failed event
    var onTaxonomyTermCreateFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
   // Update action
    
	// Publish node update confirmed event
    var publishTaxonomyTermUpdateConfirmed = function (term) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_updateConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm update confirmed event
    var onTaxonomyTermUpdateConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_updateConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm update failed event
    var publishTaxonomyTermUpdateFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_updateFailed, {error: error});
    };
    // Subscribe to taxonomyTerm update failed event
    var onTaxonomyTermUpdateFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish taxonomyTerm delete confirmed event
    var publishTaxonomyTermDeleteConfirmed = function (term) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_deleteConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm delete confirmed event
    var onTaxonomyTermDeleteConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_deleteConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm delete failed event
    var publishTaxonomyTermDeleteFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_deleteFailed, {error: error});
    };
    // Subscribe to taxonomyTerm delete failed event
    var onTaxonomyTermDeleteFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish taxonomyTerm index confirmed event
    var publishTaxonomyTermIndexConfirmed = function (data) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_indexConfirmed, {data: data});
    };
    // Subscribe to taxonomyTerm index confirmed event
    var onTaxonomyTermIndexConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_indexConfirmed, function(event, args) {
	    handler(args.data);
	   });	
    };
    
	// Publish taxonomyTerm index failed event
    var publishTaxonomyTermIndexFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_indexFailed, {error: error});
    };
    // Subscribe to taxonomyTerm index failed event
    var onTaxonomyTermIndexFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Select Nodes action
 
	// Publish taxonomyTerm selectNodes confirmed event
    var publishTaxonomyTermSelectNodesConfirmed = function (term) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_selectNodesConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm selectNodes confirmed event
    var onTaxonomyTermSelectNodesConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_selectNodesConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm selectNodes failed event
    var publishTaxonomyTermSelectNodesFailed = function (error) {
        $rootScope.$broadcast(TaxonomyTermResourceConfig.taxonomyTerm_selectNodesFailed, {error: error});
    };
    // Subscribe to taxonomyTerm selectNodes failed event
    var onTaxonomyTermSelectNodesFailed = function($scope, handler) {
    	$scope.$on(TaxonomyTermResourceConfig.taxonomyTerm_selectNodesFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

 // public methods
 return {	   
	   //Retrieve event
	   publishTaxonomyTermRetrieveConfirmed		: publishTaxonomyTermRetrieveConfirmed,
	   onTaxonomyTermRetrieveConfirmed			: onTaxonomyTermRetrieveConfirmed,
	   publishTaxonomyTermRetrieveFailed		: publishTaxonomyTermRetrieveFailed,
	   onTaxonomyTermRetrieveFailed 			: onTaxonomyTermRetrieveFailed,
	  // Create action
	   publishTaxonomyTermCreateConfirmed		: publishTaxonomyTermCreateConfirmed,
	   onTaxonomyTermCreateConfirmed			: onTaxonomyTermCreateConfirmed,
	   publishTaxonomyTermCreateFailed			: publishTaxonomyTermCreateFailed,
	   onTaxonomyTermCreateFailed 				: onTaxonomyTermCreateFailed,
	   // Update action
	   publishTaxonomyTermUpdateConfirmed		: publishTaxonomyTermUpdateConfirmed,
	   onTaxonomyTermUpdateConfirmed			: onTaxonomyTermUpdateConfirmed,
	   publishTaxonomyTermUpdateFailed			: publishTaxonomyTermUpdateFailed,
	   onTaxonomyTermUpdateFailed 				: onTaxonomyTermUpdateFailed,
	   // Delete action
	   publishTaxonomyTermDeleteConfirmed		: publishTaxonomyTermDeleteConfirmed,
	   onTaxonomyTermDeleteConfirmed			: onTaxonomyTermDeleteConfirmed,
	   publishTaxonomyTermDeleteFailed			: publishTaxonomyTermDeleteFailed,
	   onTaxonomyTermDeleteFailed 				: onTaxonomyTermDeleteFailed,
	   // Index action
	   publishTaxonomyTermIndexConfirmed		: publishTaxonomyTermIndexConfirmed,
	   onTaxonomyTermIndexConfirmed				: onTaxonomyTermIndexConfirmed,
	   publishTaxonomyTermIndexFailed			: publishTaxonomyTermIndexFailed,
	   onTaxonomyTermIndexFailed 				: onTaxonomyTermIndexFailed,
	   // selectNode action
	   publishTaxonomyTermSelectNodesConfirmed	: publishTaxonomyTermSelectNodesConfirmed,
	   onTaxonomyTermSelectNodesConfirmed		: onTaxonomyTermSelectNodesConfirmed,
	   publishTaxonomyTermSelectNodesFailed		: publishTaxonomyTermSelectNodesFailed,
	   onTaxonomyTermSelectNodesFailed 			: onTaxonomyTermSelectNodesFailed,
 	};
 	
}]);

/**
 * TaxonomyTermResource
 * 
 * This service mirrors the Drupal taxonomyTerm resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/taxonomyTerm*|<mirror>|POST|Content-Type
 * 
**/
TaxonomyTermResourceModules.service('TaxonomyTermResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'TaxonomyTermResourceConfig', 'TaxonomyTermResourceChannel', '$http', '$q', 
                                                      function($rootScope,  drupalApiConfig,   BaseResource,   TaxonomyTermResourceConfig,   TaxonomyTermResourceChannel,   $http,   $q) {
	
	// define a new internal private method for this object
    function prepareIndexGetParams(options) {

    	var type = undefined;
		//prepare and set optional params
		angular.forEach(options, function(value , key) {
			if(key === 'parameters') { type = 'array_key_value'; }
			else if(key === 'fields') { type = 'array'; }
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
	 * "api_endpoint/taxonomyTerm/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieve a term
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/taxonomy_term/{TID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} tid The tid of the taxonomy term to get, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(tid){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath + '/' + tid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!tid) { errors.push('Param tid is required.'); }
		
		if(errors.length != 0) {
			TaxonomyTermResourceChannel.publishTaxonomyTermRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				TaxonomyTermResourceChannel.publishTaxonomyTermRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				TaxonomyTermResourceChannel.publishTaxonomyTermRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Create a term
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/taxonomyTerm
	 * Headers: Content-Type: multipart/form-data 
	 * 
	 * @param 	{Array} term The taxonomy term object to create, required:true, source:post body

	 * @return 	{Promise}
	 * 
	 */
	var create = function( term ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : {
				term : term
			}
		},
		errors = [];
		//if not given
		if( !term ) { errors.push('Param term is required.'); }
		//if is not an array
		if( term instanceof Array ) { errors.push('Param term has to be an array.'); }
		//if is not given
		if( !term.name ) { errors.push("Param term['name'] is required."); }
			
		if(errors.length != 0) {
			TaxonomyTermResourceChannel.publishTaxonomyTermCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data){
			TaxonomyTermResourceChannel.publishTaxonomyTermCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(err){
			TaxonomyTermResourceChannel.publishTaxonomyTermCreateFailed(data);
			defer.reject(data);
		});
			
		return defer.promise;
	};
	
	/*
	 * update
	 * 
	 * Update a term
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/taxonomyTerm/{TID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} tid The unique identifier for this taxonomy term., required:true, source:path
	 * @param 	{Array} term The taxonomy term data to update, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( tid, term ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath + '/' + tid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : createPath,
			data : {
				term : term
			}
		},
		errors = [];
		
		//if not given
		if(!tid) { errors.push('Param tid is required.'); }
		//if not given
		if(!term) { errors.push('Param term is required.'); }
		//if is not an array
		if( term instanceof Array ) { errors.push('Param term has to be an array.');}
		//if is not given
		if( !term.name ) { errors.push("Param term['name'] is required."); }
		if( !term.vid ) { errors.push("Param term['vid'] is required."); }
		
		if(errors.length != 0) {
			TaxonomyTermResourceChannel.publishTaxonomyTermUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};


	/*
	 * _delete
	 * 
	 * Delete the term
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/taxonomyTerm/{TID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} tid The id of the taxonomyTerm to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( tid ) {
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath + '/' + tid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!tid) { errors.push('Param tid is required.');}

		if(errors.length != 0) {
			TaxonomyTermResourceChannel.publishTaxonomyTermDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/taxonomyTerm*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all terms
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/taxonomyTerm
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} page The zero-based index of the page to get, defaults to 0., required:false, source:param
	 * @param {Array} fields The fields to get. Shouls be a comma seperated string. defaults to 0., required:false, source:param
	 * @param {Array} parameters Parameters array, required:false, source:param
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function(options) {
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			TaxonomyTermResourceChannel.publishTaxonomyTermIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * SelectNodes
	 * Drupal CORS settings api_endpoint/taxonomyTerm/selectNodes*|<mirror>|POST|Content-Type
	 * 
	 * Returns all nodes with provided taxonomy id.
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/taxonomyTerm/selectNodes
	 * 
	 * @param {String} tid The vocabulary ids to retrieve, separated by comma., required:true, source:post body
	 * @param {Integer} pager Whether the nodes are to be used with a pager (the case on most Drupal pages) or not (in an XML feed, for example)., required:false, source:post body
	 * @param {Integer} limit Maximum number of nodes to find., required:false, source:post body
	 * @param {Integer} order The order clause for the query that retrieve the nodes., required:false, source:post body

	 * 
	 * @return 	{Promise}
	 * 
	 */
	var selectNodes = function(tid, pager, limit, order) {
		var selectNodesPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyTermResourceConfig.resourcePath + '/' + TaxonomyTermResourceConfig.actions.selectNodes,
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : selectNodesPath,
				data : {
					tid 	: tid,
					pager 	: pager,
					limit	: limit,
					order 	: order
				}
			};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermSelectNodesConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyTermResourceChannel.publishTaxonomyTermSelectNodesFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	//public methods	
	return {
		//CRUD operations
		retrieve 	: retrieve,
		create 		: create,
		update 		: update,
		_delete 	: _delete,
		index	 	: index,
		selectNodes : selectNodes,
	};
	
}]);