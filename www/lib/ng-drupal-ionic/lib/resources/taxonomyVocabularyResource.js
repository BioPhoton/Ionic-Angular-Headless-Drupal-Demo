/**
 * TaxonomyVocabulary Resource Modules
 */
var TaxonomyVocabularyResourceModules = angular.module('TaxonomyVocabularyResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for TaxonomyVocabularyResourceModules 
 */
TaxonomyVocabularyResourceModules.constant("TaxonomyVocabularyResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'taxonomy_vocabulary',
	//actions of taxonomyVocabulary resource
	actions : {
		//retrieve 		: 'retrieve',
		//create		: 'create',
		//delete		: 'delete',
		//index 		: 'index',
		getTree  	: 'getTree'
	},
	  
	//
	// Constants for TaxonomyVocabularyResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	taxonomyVocabulary_retrieveConfirmed		: 'event:drupal-taxonomyVocabulary-retrieveConfirmed',
	taxonomyVocabulary_retrieveFailed  		: 'event:drupal-taxonomyVocabulary-retrieveFailed',
	// Create action
	taxonomyVocabulary_createConfirmed		: 'event:drupal-taxonomyVocabulary-createConfirmed',
	taxonomyVocabulary_createFailed  			: 'event:drupal-taxonomyVocabulary-createFailed',
	// Update action
	taxonomyVocabulary_updateConfirmed		: 'event:drupal-taxonomyVocabulary-updateConfirmed',
	taxonomyVocabulary_updateFailed  			: 'event:drupal-taxonomyVocabulary-updateFailed',
	// Delete action
	taxonomyVocabulary_deleteConfirmed		: 'event:drupal-taxonomyVocabulary-deleteConfirmed',
	taxonomyVocabulary_deleteFailed  			: 'event:drupal-taxonomyVocabulary-deleteFailed',
	// Index action
	taxonomyVocabulary_indexConfirmed			: 'event:drupal-taxonomyVocabulary-indexConfirmed',
	taxonomyVocabulary_indexFailed  			: 'event:drupal-taxonomyVocabulary-indexFailed',
	// Create raw action
	taxonomyVocabulary_getTreeConfirmed	: 'event:drupal-taxonomyVocabulary-getTreeConfirmed',
	taxonomyVocabulary_getTreeFailed  	: 'event:drupal-taxonomyVocabulary-getTreeFailed',
	
});

/*Notification channel for the taxonomyVocabulary resource */
TaxonomyVocabularyResourceModules.service('TaxonomyVocabularyResourceChannel', ['$rootScope', 'TaxonomyVocabularyResourceConfig',
                                                           function ($rootScope,   TaxonomyVocabularyResourceConfig) {	
	
	// Retrieve Action
	
	// Publish taxonomyVocabulary retrieve confirmed event
    var publishTaxonomyVocabularyRetrieveConfirmed = function (vocabulary) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_retrieveConfirmed, {vocabulary: vocabulary});
    };
    // Subscribe to taxonomyVocabulary retrieve confirmed event
    var onTaxonomyVocabularyRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_retrieveConfirmed, function(event, args) {
	    handler(args.vocabulary);
	   });	
    };
    
	// Publish taxonomyVocabulary retrieve failed event
    var publishTaxonomyVocabularyRetrieveFailed = function (error) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_retrieveFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary retrieve failed event
    var onTaxonomyVocabularyRetrieveFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish taxonomyVocabulary create confirmed event
    var publishTaxonomyVocabularyCreateConfirmed = function (vocabulary) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_createConfirmed, {vocabulary: vocabulary});
    };
    // Subscribe to taxonomyVocabulary create confirmed event
    var onTaxonomyVocabularyCreateConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_createConfirmed, function(event, args) {
	    handler(args.vocabulary);
	   });	
    };
  
	// Publish create create failed event
    var publishTaxonomyVocabularyCreateFailed = function (error) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_createFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary create failed event
    var onTaxonomyVocabularyCreateFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
   // Update action
    
	// Publish node update confirmed event
    var publishTaxonomyVocabularyUpdateConfirmed = function (vocabulary) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_updateConfirmed, {vocabulary: vocabulary});
    };
    // Subscribe to taxonomyVocabulary update confirmed event
    var onTaxonomyVocabularyUpdateConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_updateConfirmed, function(event, args) {
	    handler(args.vocabulary);
	   });	
    };
    
	// Publish taxonomyVocabulary update failed event
    var publishTaxonomyVocabularyUpdateFailed = function (error) {
    	console.log(error); 
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_updateFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary update failed event
    var onTaxonomyVocabularyUpdateFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish taxonomyVocabulary delete confirmed event
    var publishTaxonomyVocabularyDeleteConfirmed = function (vocabulary) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_deleteConfirmed, {vocabulary: vocabulary});
    };
    // Subscribe to taxonomyVocabulary delete confirmed event
    var onTaxonomyVocabularyDeleteConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_deleteConfirmed, function(event, args) {
	    handler(args.vocabulary);
	   });	
    };
    
	// Publish taxonomyVocabulary delete failed event
    var publishTaxonomyVocabularyDeleteFailed = function (error) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_deleteFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary delete failed event
    var onTaxonomyVocabularyDeleteFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish taxonomyVocabulary index confirmed event
    var publishTaxonomyVocabularyIndexConfirmed = function (data) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_indexConfirmed, {data: data});
    };
    // Subscribe to taxonomyVocabulary index confirmed event
    var onTaxonomyVocabularyIndexConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_indexConfirmed, function(event, args) {
	    handler(args.data);
	   });	
    };
    
	// Publish taxonomyVocabulary index failed event
    var publishTaxonomyVocabularyIndexFailed = function (error) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_indexFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary index failed event
    var onTaxonomyVocabularyIndexFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Get Tree action
 
	// Publish taxonomyVocabulary getTree confirmed event
    var publishTaxonomyVocabularyGetTreeConfirmed = function (vocabulary) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_getTreeConfirmed, {vocabulary: vocabulary});
    };
    // Subscribe to taxonomyVocabulary getTree confirmed event
    var onTaxonomyVocabularyGetTreeConfirmed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_getTreeConfirmed, function(event, args) {
	    handler(args.vocabulary);
	   });	
    };
    
	// Publish taxonomyVocabulary getTree failed event
    var publishTaxonomyVocabularyGetTreeFailed = function (error) {
        $rootScope.$broadcast(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_getTreeFailed, {error: error});
    };
    // Subscribe to taxonomyVocabulary getTree failed event
    var onTaxonomyVocabularyGetTreeFailed = function($scope, handler) {
    	$scope.$on(TaxonomyVocabularyResourceConfig.taxonomyVocabulary_getTreeFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

 // public methods
 return {	   
	   //Retrieve event
	   publishTaxonomyVocabularyRetrieveConfirmed		: publishTaxonomyVocabularyRetrieveConfirmed,
	   onTaxonomyVocabularyRetrieveConfirmed			: onTaxonomyVocabularyRetrieveConfirmed,
	   publishTaxonomyVocabularyRetrieveFailed		: publishTaxonomyVocabularyRetrieveFailed,
	   onTaxonomyVocabularyRetrieveFailed 			: onTaxonomyVocabularyRetrieveFailed,
	  // Create action
	   publishTaxonomyVocabularyCreateConfirmed		: publishTaxonomyVocabularyCreateConfirmed,
	   onTaxonomyVocabularyCreateConfirmed			: onTaxonomyVocabularyCreateConfirmed,
	   publishTaxonomyVocabularyCreateFailed			: publishTaxonomyVocabularyCreateFailed,
	   onTaxonomyVocabularyCreateFailed 				: onTaxonomyVocabularyCreateFailed,
	   // Update action
	   publishTaxonomyVocabularyUpdateConfirmed		: publishTaxonomyVocabularyUpdateConfirmed,
	   onTaxonomyVocabularyUpdateConfirmed			: onTaxonomyVocabularyUpdateConfirmed,
	   publishTaxonomyVocabularyUpdateFailed			: publishTaxonomyVocabularyUpdateFailed,
	   onTaxonomyVocabularyUpdateFailed 				: onTaxonomyVocabularyUpdateFailed,
	   // Delete action
	   publishTaxonomyVocabularyDeleteConfirmed		: publishTaxonomyVocabularyDeleteConfirmed,
	   onTaxonomyVocabularyDeleteConfirmed			: onTaxonomyVocabularyDeleteConfirmed,
	   publishTaxonomyVocabularyDeleteFailed			: publishTaxonomyVocabularyDeleteFailed,
	   onTaxonomyVocabularyDeleteFailed 				: onTaxonomyVocabularyDeleteFailed,
	   // Index action
	   publishTaxonomyVocabularyIndexConfirmed		: publishTaxonomyVocabularyIndexConfirmed,
	   onTaxonomyVocabularyIndexConfirmed				: onTaxonomyVocabularyIndexConfirmed,
	   publishTaxonomyVocabularyIndexFailed			: publishTaxonomyVocabularyIndexFailed,
	   onTaxonomyVocabularyIndexFailed 				: onTaxonomyVocabularyIndexFailed,
	   // selectNode action
	   publishTaxonomyVocabularyGetTreeConfirmed	: publishTaxonomyVocabularyGetTreeConfirmed,
	   onTaxonomyVocabularyGetTreeConfirmed		: onTaxonomyVocabularyGetTreeConfirmed,
	   publishTaxonomyVocabularyGetTreeFailed		: publishTaxonomyVocabularyGetTreeFailed,
	   onTaxonomyVocabularyGetTreeFailed 			: onTaxonomyVocabularyGetTreeFailed,
 	};
 	
}]);

/**
 * TaxonomyVocabularyResource
 * 
 * This service mirrors the Drupal taxonomyVocabulary resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/taxonomyVocabulary*|<mirror>|POST|Content-Type
 * 
**/
TaxonomyVocabularyResourceModules.service('TaxonomyVocabularyResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'TaxonomyVocabularyResourceConfig', 'TaxonomyVocabularyResourceChannel', '$http', '$q', 
                                                      function($rootScope,  drupalApiConfig,   BaseResource,   TaxonomyVocabularyResourceConfig,   TaxonomyVocabularyResourceChannel,   $http,   $q) {
	
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
	 * "api_endpoint/taxonomy_vocabulary/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieve a taxonomy vocabulary
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary/{VID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} vid The vid of the taxonomy vocabulary to get, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(vid){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath + '/' + vid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!vid) { errors.push('Param vid is required.'); }
		
		if(errors.length != 0) {
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Create a taxonomy vocabulary
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary
	 * Headers: Content-Type: multipart/form-data 
	 * 
	 * @param 	{Array} vocabulary The taxonomy vocabulary object to create, required:true, source:post body

	 * @return 	{Promise}
	 * 
	 */
	var create = function( vocabulary ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : {
				vocabulary : vocabulary
			}
		},
		errors = [];
		console.log(vocabulary); 
		//if not given
		if( !vocabulary ) { errors.push('Param vocabulary is required.'); }
		//if is not an array
		if( vocabulary instanceof Array ) { errors.push('Param vocabulary has to be an array.'); }
		//if is not given
		if( !vocabulary.name ) { errors.push("Param vocabulary['name'] is required."); }
			
		if(errors.length != 0) {
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(err){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyCreateFailed(data);
			defer.reject(data);
		});
			
		return defer.promise;
	};
	
	/*
	 * update
	 * 
	 * Update a taxonomy vocabulary
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary/{VID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} vid The unique identifier for this taxonomy vocabulary., required:true, source:path
	 * @param 	{Array} vocabulary The taxonomy vocabulary data to update, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( vid, vocabulary ) {

		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath + '/' + vid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : createPath,
			data : {
				vocabulary : vocabulary
			}
		},
		errors = [];
		
		//if not given
		if(!vid) { errors.push('Param vid is required.'); }
		//if not given
		if(!vocabulary) { errors.push('Param vocabulary is required.'); }
		//if is not an array
		if( vocabulary instanceof Array ) { errors.push('Param vocabulary has to be an array.');}
		
		if(errors.length != 0) {
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};


	/*
	 * _delete
	 * 
	 * Delete a taxonomy vocabulary
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary/{VID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} vid The id of the taxonomy vocabulary to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( vid ) {
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath + '/' + vid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!vid) { errors.push('Param vid is required.');}

		if(errors.length != 0) {
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/taxonomy_vocabulary*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all taxonomy vocabularies
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary
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
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * GetTree
	 * Drupal CORS settings api_endpoint/taxonomy_vocabulary/getTree*|<mirror>|POST|Content-Type
	 * 
	 * Returns a full list of taxonomy terms.
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/taxonomy_vocabulary/getTree
	 * 
	 * @param {Integer} vid The vocabulary id to retrieve., required:true, source:post body
	 * @param {Integer} parent The term ID under which to generate the tree. If 0, generate the tree for the entire vocabulary., required:false, source:post body
	 * @param {Integer} maxdepth The number of levels of the tree to return. Leave NULL to return all levels., required:false, source:post body
	 * @param {Integer} load_entities Whether the tree of terms should contain full term entity objects. If 1 (TRUE), a full entity load will occur on the term objects. Otherwise they are partial objects to save execution time and memory consumption. Defaults to 0 (FALSE)., required:false, source:post body

	 * 
	 * @return 	{Promise}
	 * 
	 */
	var getTree = function(vid, parent, maxdepth, load_entities) {
		var getTreePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + TaxonomyVocabularyResourceConfig.resourcePath + '/' + TaxonomyVocabularyResourceConfig.actions.getTree,
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : getTreePath,
				data : {
					vid 			: vid,
					parent 			: parent,
					maxdepth		: maxdepth,
					load_entities 	: load_entities
				}
			};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyGetTreeConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			TaxonomyVocabularyResourceChannel.publishTaxonomyVocabularyGetTreeFailed(data);
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
		getTree 	: getTree,
	};
	
}]);