/**
 * EntityTaxonomyTerm Resource Modules
 */
var EntityTaxonomyTermResourceModules = angular.module('EntityTaxonomyTermResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for EntityTaxonomyTermResourceModules 
 */
EntityTaxonomyTermResourceModules.constant("EntityTaxonomyTermResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'entity_taxonomy_term',
	//actions of taxonomyTerm resource
	actions : {
		//retrieve 		: 'retrieve',
		//create		: 'create',
		//delete		: 'delete',
		//index 		: 'index',
		selectNodes  	: 'selectNodes'
	},
	  
	//
	// Constants for EntityTaxonomyTermResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	entityTaxonomyTerm_retrieveConfirmed		: 'event:drupal-entityTaxonomyTerm-retrieveConfirmed',
	entityTaxonomyTerm_retrieveFailed  			: 'event:drupal-entityTaxonomyTerm-retrieveFailed',
	// Create action
	entityTaxonomyTerm_createConfirmed			: 'event:drupal-entityTaxonomyTerm-createConfirmed',
	entityTaxonomyTerm_createFailed  			: 'event:drupal-entityTaxonomyTerm-createFailed',
	// Update action
	entityTaxonomyTerm_updateConfirmed			: 'event:drupal-entityTaxonomyTerm-updateConfirmed',
	entityTaxonomyTerm_updateFailed  			: 'event:drupal-entityTaxonomyTerm-updateFailed',
	// Delete action
	entityTaxonomyTerm_deleteConfirmed			: 'event:drupal-entityTaxonomyTerm-deleteConfirmed',
	entityTaxonomyTerm_deleteFailed  			: 'event:drupal-entityTaxonomyTerm-deleteFailed',
	// Index action
	entityTaxonomyTerm_indexConfirmed			: 'event:drupal-entityTaxonomyTerm-indexConfirmed',
	entityTaxonomyTerm_indexFailed  			: 'event:drupal-entityTaxonomyTerm-indexFailed',
	// Select Nodes action
	entityTaxonomyTerm_selectNodesConfirmed		: 'event:drupal-entityTaxonomyTerm-selectNodesConfirmed',
	entityTaxonomyTerm_selectNodesFailed  		: 'event:drupal-entityTaxonomyTerm-selectNodesFailed',
	
});

/*Notification channel for the taxonomyTerm resource */
EntityTaxonomyTermResourceModules.service('EntityTaxonomyTermResourceChannel', ['$rootScope', 'EntityTaxonomyTermResourceConfig',
                                                           function ($rootScope,   EntityTaxonomyTermResourceConfig) {	
	
	// Retrieve Action
	
	// Publish taxonomyTerm retrieve confirmed event
    var publishEntityTaxonomyTermRetrieveConfirmed = function (term) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_retrieveConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm retrieve confirmed event
    var onEntityTaxonomyTermRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_retrieveConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm retrieve failed event
    var publishEntityTaxonomyTermRetrieveFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_retrieveFailed, {error: error});
    };
    // Subscribe to taxonomyTerm retrieve failed event
    var onEntityTaxonomyTermRetrieveFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish taxonomyTerm create confirmed event
    var publishEntityTaxonomyTermCreateConfirmed = function (term) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_createConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm create confirmed event
    var onEntityTaxonomyTermCreateConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_createConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
  
	// Publish create create failed event
    var publishEntityTaxonomyTermCreateFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_createFailed, {error: error});
    };
    // Subscribe to taxonomyTerm create failed event
    var onEntityTaxonomyTermCreateFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
   // Update action
    
	// Publish node update confirmed event
    var publishEntityTaxonomyTermUpdateConfirmed = function (term) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_updateConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm update confirmed event
    var onEntityTaxonomyTermUpdateConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_updateConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm update failed event
    var publishEntityTaxonomyTermUpdateFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_updateFailed, {error: error});
    };
    // Subscribe to taxonomyTerm update failed event
    var onEntityTaxonomyTermUpdateFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish taxonomyTerm delete confirmed event
    var publishEntityTaxonomyTermDeleteConfirmed = function (term) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_deleteConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm delete confirmed event
    var onEntityTaxonomyTermDeleteConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_deleteConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm delete failed event
    var publishEntityTaxonomyTermDeleteFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_deleteFailed, {error: error});
    };
    // Subscribe to taxonomyTerm delete failed event
    var onEntityTaxonomyTermDeleteFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish taxonomyTerm index confirmed event
    var publishEntityTaxonomyTermIndexConfirmed = function (data) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_indexConfirmed, {data: data});
    };
    // Subscribe to taxonomyTerm index confirmed event
    var onEntityTaxonomyTermIndexConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_indexConfirmed, function(event, args) {
	    handler(args.data);
	   });	
    };
    
	// Publish taxonomyTerm index failed event
    var publishEntityTaxonomyTermIndexFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_indexFailed, {error: error});
    };
    // Subscribe to taxonomyTerm index failed event
    var onEntityTaxonomyTermIndexFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Select Nodes action
 
	// Publish taxonomyTerm selectNodes confirmed event
    var publishEntityTaxonomyTermSelectNodesConfirmed = function (term) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_selectNodesConfirmed, {term: term});
    };
    // Subscribe to taxonomyTerm selectNodes confirmed event
    var onEntityTaxonomyTermSelectNodesConfirmed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_selectNodesConfirmed, function(event, args) {
	    handler(args.term);
	   });	
    };
    
	// Publish taxonomyTerm selectNodes failed event
    var publishEntityTaxonomyTermSelectNodesFailed = function (error) {
        $rootScope.$broadcast(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_selectNodesFailed, {error: error});
    };
    // Subscribe to taxonomyTerm selectNodes failed event
    var onEntityTaxonomyTermSelectNodesFailed = function($scope, handler) {
    	$scope.$on(EntityTaxonomyTermResourceConfig.entityTaxonomyTerm_selectNodesFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

 // public methods
 return {	   
	   //Retrieve event
	   publishEntityTaxonomyTermRetrieveConfirmed		: publishEntityTaxonomyTermRetrieveConfirmed,
	   onEntityTaxonomyTermRetrieveConfirmed			: onEntityTaxonomyTermRetrieveConfirmed,
	   publishEntityTaxonomyTermRetrieveFailed		: publishEntityTaxonomyTermRetrieveFailed,
	   onEntityTaxonomyTermRetrieveFailed 			: onEntityTaxonomyTermRetrieveFailed,
	  // Create action
	   publishEntityTaxonomyTermCreateConfirmed		: publishEntityTaxonomyTermCreateConfirmed,
	   onEntityTaxonomyTermCreateConfirmed			: onEntityTaxonomyTermCreateConfirmed,
	   publishEntityTaxonomyTermCreateFailed			: publishEntityTaxonomyTermCreateFailed,
	   onEntityTaxonomyTermCreateFailed 				: onEntityTaxonomyTermCreateFailed,
	   // Update action
	   publishEntityTaxonomyTermUpdateConfirmed		: publishEntityTaxonomyTermUpdateConfirmed,
	   onEntityTaxonomyTermUpdateConfirmed			: onEntityTaxonomyTermUpdateConfirmed,
	   publishEntityTaxonomyTermUpdateFailed			: publishEntityTaxonomyTermUpdateFailed,
	   onEntityTaxonomyTermUpdateFailed 				: onEntityTaxonomyTermUpdateFailed,
	   // Delete action
	   publishEntityTaxonomyTermDeleteConfirmed		: publishEntityTaxonomyTermDeleteConfirmed,
	   onEntityTaxonomyTermDeleteConfirmed			: onEntityTaxonomyTermDeleteConfirmed,
	   publishEntityTaxonomyTermDeleteFailed			: publishEntityTaxonomyTermDeleteFailed,
	   onEntityTaxonomyTermDeleteFailed 				: onEntityTaxonomyTermDeleteFailed,
	   // Index action
	   publishEntityTaxonomyTermIndexConfirmed		: publishEntityTaxonomyTermIndexConfirmed,
	   onEntityTaxonomyTermIndexConfirmed				: onEntityTaxonomyTermIndexConfirmed,
	   publishEntityTaxonomyTermIndexFailed			: publishEntityTaxonomyTermIndexFailed,
	   onEntityTaxonomyTermIndexFailed 				: onEntityTaxonomyTermIndexFailed,
	   // selectNode action
	   publishEntityTaxonomyTermSelectNodesConfirmed	: publishEntityTaxonomyTermSelectNodesConfirmed,
	   onEntityTaxonomyTermSelectNodesConfirmed		: onEntityTaxonomyTermSelectNodesConfirmed,
	   publishEntityTaxonomyTermSelectNodesFailed		: publishEntityTaxonomyTermSelectNodesFailed,
	   onEntityTaxonomyTermSelectNodesFailed 			: onEntityTaxonomyTermSelectNodesFailed,
 	};
 	
}]);

/**
 * EntityTaxonomyTermResource
 * 
 * This service mirrors the Drupal taxonomyTerm resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/taxonomyTerm*|<mirror>|POST|Content-Type
 * 
**/
EntityTaxonomyTermResourceModules.service('EntityTaxonomyTermResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'EntityTaxonomyTermResourceConfig', 'EntityTaxonomyTermResourceChannel', '$http', '$q', 
                                                      function($rootScope,  drupalApiConfig,   BaseResource,   EntityTaxonomyTermResourceConfig,   EntityTaxonomyTermResourceChannel,   $http,   $q) {
	
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

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath + '/' + tid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!tid) { errors.push('Param tid is required.'); }
		
		if(errors.length != 0) {
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermRetrieveFailed(data);
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
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : term
			
		},
		errors = [];
		//if not given
		if( !term ) { errors.push('Param term is required.'); }
		//if is not an array
		if( term instanceof Array ) { errors.push('Param term has to be an array.'); }
		//if is not given
		if( !term.name ) { errors.push("Param term['name'] is required."); }
			
		if(errors.length != 0) {
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermCreateFailed(data);
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
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath + '/' + tid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : createPath,
			data :  term
			
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
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermUpdateFailed(data);
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
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath + '/' + tid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!tid) { errors.push('Param tid is required.');}

		if(errors.length != 0) {
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermDeleteFailed(data);
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
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * SelectNodes
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
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var selectNodes = function(tid, pager, limit, order) {
		var selectNodesPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityTaxonomyTermResourceConfig.resourcePath + '/' + EntityTaxonomyTermResourceConfig.actions.selectNodes,
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
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermSelectNodesConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityTaxonomyTermResourceChannel.publishEntityTaxonomyTermSelectNodesFailed(data);
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