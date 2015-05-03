/**
 * EntityNode Resource Modules
 */
var EntityNodeResourceModules = angular.module('EntityNodeResourceModules', ['drupal.configurations', 'drupalBaseModules']);


//@TODO config provider

/**
 *  Constants for EntityNodeResourceModules 
 */
EntityNodeResourceModules.constant("EntityNodeResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'entity_node',
	//actions of entity_node resource
	actions : {
		//retrieve 	: 'retrieve',
		create		: 'create',
		//update 		: 'update',
		//delete		: 'delete',
		//index 		: 'index',
		files 		: 'files',
		comments	: 'comments',
		attachFile  : 'attach_file'
	},
	  
	//
	// Constants for EntityNodeResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	entity_node_retrieveConfirmed		: 'event:drupal-entity-node-retrieveConfirmed',
	entity_node_retrieveFailed  		: 'event:drupal-entity-node-retrieveFailed',
	// Create action
	entity_node_createConfirmed		: 'event:drupal--entity-node--createConfirmed',
	entity_node_createFailed  			: 'event:drupal-entity-node-createFailed',
	// Update action
	entity_node_updateConfirmed		: 'event:drupal-entity-node-updateConfirmed',
	entity_node_updateFailed  			: 'event:drupal-entity-node-updateFailed',
	// Delete action
	entity_node_deleteConfirmed		: 'event:drupal-entity-node-deleteConfirmed',
	entity_node_deleteFailed  			: 'event:drupal-entity-node-deleteFailed',
	// Index action
	entity_node_indexConfirmed			: 'event:drupal-entity-node-indexConfirmed',
	entity_node_indexFailed  			: 'event:drupal-entity-node-indexFailed',
	// Files action
	entity_node_filesConfirmed			: 'event:drupal-entity-node-filesConfirmed',
	entity_node_filesFailed  			: 'event:drupal-entity-node-filesFailed',
	// Comments action
	entity_node_commentsConfirmed		: 'event:drupal-entity-node-commentsConfirmed',
	entity_node_commentsFailed  		: 'event:drupal-entity-node-commentsFailed',
	// Attach file action
	entity_node_attachFileConfirmed	: 'event:drupal-entity-node-attachFileConfirmed',
	entity_node_attachFileFailed  		: 'event:drupal-entity-node-attachFileFailed',
	

});

/*Notification channel for the entity_node resource */
EntityNodeResourceModules.service('EntityNodeResourceChannel', ['$rootScope', 'EntityNodeResourceConfig',
                                           function ($rootScope,   EntityNodeResourceConfig) {	
	
	// Retrieve Action
	
	// Publish entity_node retrieve confirmed event
    var publishEntityNodeRetrieveConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_retrieveConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node retrieve confirmed event
    var onEntityNodeRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_retrieveConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node retrieve failed event
    var publishEntityNodeRetrieveFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_retrieveFailed, {error: error});
    };
    // Subscribe to entity_node retrieve failed event
    var onEntityNodeRetrieveFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish entity_node create confirmed event
    var publishEntityNodeCreateConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_createConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node create confirmed event
    var onEntityNodeCreateConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_createConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
  
	// Publish create create failed event
    var publishEntityNodeCreateFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_createFailed, {error: error});
    };
    // Subscribe to entity_node create failed event
    var onEntityNodeCreateFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Update action
    
	// Publish entity_node update confirmed event
    var publishEntityNodeUpdateConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_updateConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node update confirmed event
    var onEntityNodeUpdateConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_updateConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node update failed event
    var publishEntityNodeUpdateFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_updateFailed, {error: error});
    };
    // Subscribe to entity_node update failed event
    var onEntityNodeUpdateFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish entity_node delete confirmed event
    var publishEntityNodeDeleteConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_deleteConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node delete confirmed event
    var onEntityNodeDeleteConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_deleteConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node delete failed event
    var publishEntityNodeDeleteFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_deleteFailed, {error: error});
    };
    // Subscribe to entity_node delete failed event
    var onEntityNodeDeleteFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish entity_node index confirmed event
    var publishEntityNodeIndexConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_indexConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node index confirmed event
    var onEntityNodeIndexConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_indexConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node index failed event
    var publishEntityNodeIndexFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_indexFailed, {error: error});
    };
    // Subscribe to entity_node index failed event
    var onEntityNodeIndexFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
  
    // Files action
    
	// Publish entity_node files confirmed event
    var publishEntityNodeFilesConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_filesConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node files confirmed event
    var onEntityNodeFilesConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_filesConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node files failed event
    var publishEntityNodeFilesFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_filesFailed, {error: error});
    };
    // Subscribe to entity_node files failed event
    var onEntityNodeFilesFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_filesFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

    // Comments action
    
	// Publish entity_node comments confirmed event
    var publishEntityNodeCommentsConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_commentsConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node comments confirmed event
    var onEntityNodeCommentsConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_commentsConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node comments failed event
    var publishEntityNodeCommentsFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_commentsFailed, {error: error});
    };
    // Subscribe to entity_node comments failed event
    var onEntityNodeCommentsFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_commentsFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Attach file action
 
	// Publish entity_node attachFile confirmed event
    var publishEntityNodeAttachFileConfirmed = function (entity_node) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_attachFileConfirmed, {entity_node: entity_node});
    };
    // Subscribe to entity_node attachFile confirmed event
    var onEntityNodeAttachFileConfirmed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_attachFileConfirmed, function(event, args) {
	    handler(args.entity_node);
	   });	
    };
    
	// Publish entity_node attachFile failed event
    var publishEntityNodeAttachFileFailed = function (error) {
        $rootScope.$broadcast(EntityNodeResourceConfig.entity_node_attachFileFailed, {error: error});
    };
    // Subscribe to entity_node attachFile failed event
    var onEntityNodeAttachFileFailed = function($scope, handler) {
    	$scope.$on(EntityNodeResourceConfig.entity_node_attachFileFailed, function(event, args) {
	    handler(args.error);
	   });	
    };


 // public methods
 return {	   
	   //Retrieve event
	   publishEntityNodeRetrieveConfirmed		: publishEntityNodeRetrieveConfirmed,
	   onEntityNodeRetrieveConfirmed			: onEntityNodeRetrieveConfirmed,
	   publishEntityNodeRetrieveFailed		: publishEntityNodeRetrieveFailed,
	   onEntityNodeRetrieveFailed 			: onEntityNodeRetrieveFailed,
	  // Create action
	   publishEntityNodeCreateConfirmed		: publishEntityNodeCreateConfirmed,
	   onEntityNodeCreateConfirmed			: onEntityNodeCreateConfirmed,
	   publishEntityNodeCreateFailed			: publishEntityNodeCreateFailed,
	   onEntityNodeCreateFailed 				: onEntityNodeCreateFailed,
	   // Update action
	   publishEntityNodeUpdateConfirmed		: publishEntityNodeUpdateConfirmed,
	   onEntityNodeUpdateConfirmed			: onEntityNodeUpdateConfirmed,
	   publishEntityNodeUpdateFailed			: publishEntityNodeUpdateFailed,
	   onEntityNodeUpdateFailed 				: onEntityNodeUpdateFailed,
	   // Delete action
	   publishEntityNodeDeleteConfirmed		: publishEntityNodeDeleteConfirmed,
	   onEntityNodeDeleteConfirmed			: onEntityNodeDeleteConfirmed,
	   publishEntityNodeDeleteFailed			: publishEntityNodeDeleteFailed,
	   onEntityNodeDeleteFailed 				: onEntityNodeDeleteFailed,
	   // Index action
	   publishEntityNodeIndexConfirmed		: publishEntityNodeIndexConfirmed,
	   onEntityNodeIndexConfirmed				: onEntityNodeIndexConfirmed,
	   publishEntityNodeIndexFailed			: publishEntityNodeIndexFailed,
	   onEntityNodeIndexFailed 				: onEntityNodeIndexFailed,
	   // Files action
	   publishEntityNodeFilesConfirmed		: publishEntityNodeFilesConfirmed,
	   onEntityNodeFilesConfirmed				: onEntityNodeFilesConfirmed,
	   publishEntityNodeFilesFailed			: publishEntityNodeFilesFailed,
	   onEntityNodeFilesFailed 				: onEntityNodeFilesFailed,
	   // Comments action
	   publishEntityNodeCommentsConfirmed		: publishEntityNodeCommentsConfirmed,
	   onEntityNodeCommentsConfirmed			: onEntityNodeCommentsConfirmed,
	   publishEntityNodeCommentsFailed		: publishEntityNodeCommentsFailed,
	   onEntityNodeCommentsFailed 			: onEntityNodeCommentsFailed,
	   // Attachfile action
	   publishEntityNodeAttachFileConfirmed	: publishEntityNodeAttachFileConfirmed,
	   onEntityNodeAttachFileConfirmed		: onEntityNodeAttachFileConfirmed,
	   publishEntityNodeAttachFileFailed		: publishEntityNodeAttachFileFailed,
	   onEntityNodeAttachFileFailed 			: onEntityNodeAttachFileFailed
 	};
}]);

/**
 * EntityNodeResource
 * 
 * This service mirrors the Drupal entity_node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/entity_node*|<mirror>|POST|Content-Type
 * 
**/
EntityNodeResourceModules.service('EntityNodeResource', [ 'drupalApiConfig', 'BaseResource', 'EntityNodeResourceConfig', 'EntityNodeResourceChannel', '$http', '$q', 
                                      function(drupalApiConfig,   BaseResource,   EntityNodeResourceConfig,   EntityNodeResourceChannel,   $http,   $q) {
	
	// define a new internal private method for this object
    function prepareIndexGetParams(options) {
    	if(!options)  { return; }
    	
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
	 * "api_endpoint/entity_node/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieves an entity of type Node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/entity_node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} method Internal use only: the method to invoke., required:false, source:post body
	 * @param {String} entity_type Internal use only: the type of entity., required:false, source:post body
	 * @param {Integer} node_id The nid., required:true, source:path
	 * @param {String} fields A comma separated list of fields to get., required:false, source:param
	 * @param {Integer} revision The specific revision to retrieve., required:false, source:param
	 *  
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(nid, options){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath + '/' + nid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				EntityNodeResourceChannel.publishEntityNodeRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				EntityNodeResourceChannel.publishEntityNodeRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Creates an entity of type Node.
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/entity_node
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} method Internal use only: the method to invoke., required:false, source:param
	 * @param 	{String} entity_type Internal use only: the type of entity., required:false, source:param
	 * @param 	{Array} values A representation of the node, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var create = function( values, options ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : values
		},
		errors = [];
		console.log(values); 
		//if not given
		if(!values) { errors.push('Param values is required.'); }
		//if is not an array
		if( values instanceof Array ) { errors.push('Param values has to be an array.'); }
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeCreateFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};

	/*
	 * update
	 * 
	 * Updates an entity of type Node.
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/entity_node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} method Internal use only: the method to invoke., required:false, source:param
	 * @param {String} entity_type Internal use only: the type of entity., required:false, source:param
	 * @param {Integer} node_id The uid., required:true, source:path
	 * @param {Array} values A representation of the node, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( nid, values, options ) {
		var updatePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath + '/' + nid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : updatePath,
			data :  values
		},
		errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		//if not given
		if(!values) { errors.push('Param values is required.'); }
		//if is not an array
		if( values instanceof Array ) { errors.push('Param values has to be an array.');}
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};

	/*
	 * _delete
	 * 
	 * Deletes an entity of type Node.
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/entity_node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} method Internal use only: the method to invoke., required:false, source:param
	 * @param {String} entity_type Internal use only: the type of entity., required:false, source:param
	 * @param {Integer} node_id The uid., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( nid, options ) {
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath + '/' + nid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!nid) { errors.push('Param nid is required.');}

		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * 
	 * Retrieves a list of entities of type Node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/entity_node
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} method Internal use only: the method to invoke., required:false, source:param
	 * @param {String} entity_type Internal use only: the type of entity., required:false, source:param
	 * @param {Array} fields The fields to get. Shouls be a comma seperated string., defaults to 0., required:false, source:param
	 * @param {Array} parameters Parameters array, required:false, source:param
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * @param {Integer} page The zero-based index of the page to get, defaults to 0., required:false, source:param
	 * @param {String} sort Field to sort by., required:false, source:param
	 * @param {String} direction Direction of the sort. ASC or DESC., required:false, source:param
	 * 
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function(options) {
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath;
		
		if(options) {
			indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
			indexPath += prepareIndexGetParams(options);
		}
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	

	
	/*
	 * Files
	 * This method returns files associated with a node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/entity_node/{NID}/files/{FILE_CONTENTS}/{IMAGE_STYLES}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The nid of the entity_node whose files we are getting, required:true, source:path
	 * @param {Integer} file_contents To return file contents or not., required:false, source:path
	 * @param {Integer} image_styles To return image styles or not., required:false, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var files = function(nid, file_contents, image_styles) {
		var attachFilePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath + '/' + nid + '/' + EntityNodeResourceConfig.actions.files + ((file_contents)?('/'+file_contents):'')+((image_styles)?('/'+image_styles):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeFilesFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeFilesConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeFilesFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * Comments
	 * Drupal CORS settings api_endpoint/entity_node/comments/*|<mirror>|GET|Content-Type
	 * 
	 * This method returns the number of new comments on a given node.
	 * 
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/entity_node/{NID}/comments/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The entity_node id to load comments for., required:true, source:path
	 * @param {Integer} count Number of comments to load., required:false, source:param
	 * @param {Integer} offset If count is set to non-zero value, you can pass also non-zero value for start. For example to get comments from 5 to 15, pass count=10 and start=5., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var comments = function(nid, count, offset) {
		
		var attachFilePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + EntityNodeResourceConfig.resourcePath + '/' + nid +'/' + EntityNodeResourceConfig.actions.comments + '/' + ((count != undefined ||  offset != undefined)?'?':'')+ ((count != undefined)?('count='+count+','):'') + ((offset != undefined)?('offset=' + offset):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			EntityNodeResourceChannel.publishEntityNodeCommentsFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeCommentsConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			EntityNodeResourceChannel.publishEntityNodeCommentsFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	

	/*
	 * Attach files
	 * Upload and attach file(s) to a node. POST multipart/form-data to node/123/attach_file
	 * 
	 * Method: POST 
	 * Url: http://www.drupalionic.org/drupal_test/api/v1/entity_node/{NID}/attach_file
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The nid of the node to attach a file to, required:true, source:path
	 * @param {Sting} field_name The file field name, required:true, source:post body
	 * @param {Integer} attach Attach the file(s) to the node. If FALSE, this clears ALL files attached, and attaches the files, required:false, source:post body
	 * @param {Array} field_values The extra field values, required:false, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var attach_file = function(nid, field_name, attach, field_values) {
		var attachFilePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid + '/' + NodeResourceConfig.actions.attachFile,
			defer = $q.defer(),
			requestConfig = {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined},
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		if(!field_name) { errors.push('Param field_name is required.'); }
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeAttachFileFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		var newForm = new FormData();
		if(field_name) {newForm.append('field_name', field_name);}
		if(attach) {newForm.append('attach', attach.attach);}
		if(field_values) {newForm.append('field_values', field_values);}
		
		
		$http.post(attachFilePath, newForm, requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeAttachFileConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeAttachFileFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	//public methods	
	return {
		//CRUD operations
		retrieve 	: retrieve,
		create 		: create,
		update		: update,
		_delete 	: _delete,
		index	 	: index,
		//Relationships
		files		: files,
		comments 	: comments,
		//Targeted actions
		attach_file : attach_file,
	};
	
}]);