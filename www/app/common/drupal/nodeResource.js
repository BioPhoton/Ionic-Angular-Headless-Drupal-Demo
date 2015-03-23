/**
 * Node Resource Modules
 */
var NodeResourceModules = angular.module('NodeResourceModules', ['drupal.configurations', 'drupalBaseModules']);


//@TODO config provider

/**
 *  Constants for NodeResourceModules 
 */
NodeResourceModules.constant("NodeResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'node',
	//actions of node resource
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
	// Constants for NodeResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	node_retrieveConfirmed		: 'event:drupal-node-retrieveConfirmed',
	node_retrieveFailed  		: 'event:drupal-node-retrieveFailed',
	// Create action
	node_createConfirmed		: 'event:drupal-node-createConfirmed',
	node_createFailed  			: 'event:drupal-node-createFailed',
	// Update action
	node_updateConfirmed		: 'event:drupal-node-updateConfirmed',
	node_updateFailed  			: 'event:drupal-node-updateFailed',
	// Delete action
	node_deleteConfirmed		: 'event:drupal-node-deleteConfirmed',
	node_deleteFailed  			: 'event:drupal-node-deleteFailed',
	// Index action
	node_indexConfirmed			: 'event:drupal-node-indexConfirmed',
	node_indexFailed  			: 'event:drupal-node-indexFailed',
	// Files action
	node_filesConfirmed			: 'event:drupal-node-filesConfirmed',
	node_filesFailed  			: 'event:drupal-node-filesFailed',
	// Comments action
	node_commentsConfirmed		: 'event:drupal-node-commentsConfirmed',
	node_commentsFailed  		: 'event:drupal-node-commentsFailed',
	// Attach file action
	node_attachFileConfirmed	: 'event:drupal-node-attachFileConfirmed',
	node_attachFileFailed  		: 'event:drupal-node-attachFileFailed',
	

});

/*Notification channel for the node resource */
NodeResourceModules.service('NodeResourceChannel', ['$rootScope', 'NodeResourceConfig',
                                           function ($rootScope,   NodeResourceConfig) {	
	
	// Retrieve Action
	
	// Publish node retrieve confirmed event
    var publishNodeRetrieveConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_retrieveConfirmed, {node: node});
    };
    // Subscribe to node retrieve confirmed event
    var onNodeRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_retrieveConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node retrieve failed event
    var publishNodeRetrieveFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_retrieveFailed, {error: error});
    };
    // Subscribe to node retrieve failed event
    var onNodeRetrieveFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish node create confirmed event
    var publishNodeCreateConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_createConfirmed, {node: node});
    };
    // Subscribe to node create confirmed event
    var onNodeCreateConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_createConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
  
	// Publish create create failed event
    var publishNodeCreateFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_createFailed, {error: error});
    };
    // Subscribe to node create failed event
    var onNodeCreateFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Update action
    
	// Publish node update confirmed event
    var publishNodeUpdateConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_updateConfirmed, {node: node});
    };
    // Subscribe to node update confirmed event
    var onNodeUpdateConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_updateConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node update failed event
    var publishNodeUpdateFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_updateFailed, {error: error});
    };
    // Subscribe to node update failed event
    var onNodeUpdateFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish node delete confirmed event
    var publishNodeDeleteConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_deleteConfirmed, {node: node});
    };
    // Subscribe to node delete confirmed event
    var onNodeDeleteConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_deleteConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node delete failed event
    var publishNodeDeleteFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_deleteFailed, {error: error});
    };
    // Subscribe to node delete failed event
    var onNodeDeleteFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish node index confirmed event
    var publishNodeIndexConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_indexConfirmed, {node: node});
    };
    // Subscribe to node index confirmed event
    var onNodeIndexConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_indexConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node index failed event
    var publishNodeIndexFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_indexFailed, {error: error});
    };
    // Subscribe to node index failed event
    var onNodeIndexFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
  
    // Files action
    
	// Publish node files confirmed event
    var publishNodeFilesConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_filesConfirmed, {node: node});
    };
    // Subscribe to node files confirmed event
    var onNodeFilesConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_filesConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node files failed event
    var publishNodeFilesFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_filesFailed, {error: error});
    };
    // Subscribe to node files failed event
    var onNodeFilesFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_filesFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

    // Comments action
    
	// Publish node comments confirmed event
    var publishNodeCommentsConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_commentsConfirmed, {node: node});
    };
    // Subscribe to node comments confirmed event
    var onNodeCommentsConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_commentsConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node comments failed event
    var publishNodeCommentsFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_commentsFailed, {error: error});
    };
    // Subscribe to node comments failed event
    var onNodeCommentsFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_commentsFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Attach file action
 
	// Publish node attachFile confirmed event
    var publishNodeAttachFileConfirmed = function (node) {
        $rootScope.$broadcast(NodeResourceConfig.node_attachFileConfirmed, {node: node});
    };
    // Subscribe to node attachFile confirmed event
    var onNodeAttachFileConfirmed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_attachFileConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node attachFile failed event
    var publishNodeAttachFileFailed = function (error) {
        $rootScope.$broadcast(NodeResourceConfig.node_attachFileFailed, {error: error});
    };
    // Subscribe to node attachFile failed event
    var onNodeAttachFileFailed = function($scope, handler) {
    	$scope.$on(NodeResourceConfig.node_attachFileFailed, function(event, args) {
	    handler(args.error);
	   });	
    };


 // public methods
 return {	   
	   //Retrieve event
	   publishNodeRetrieveConfirmed		: publishNodeRetrieveConfirmed,
	   onNodeRetrieveConfirmed			: onNodeRetrieveConfirmed,
	   publishNodeRetrieveFailed		: publishNodeRetrieveFailed,
	   onNodeRetrieveFailed 			: onNodeRetrieveFailed,
	  // Create action
	   publishNodeCreateConfirmed		: publishNodeCreateConfirmed,
	   onNodeCreateConfirmed			: onNodeCreateConfirmed,
	   publishNodeCreateFailed			: publishNodeCreateFailed,
	   onNodeCreateFailed 				: onNodeCreateFailed,
	   // Update action
	   publishNodeUpdateConfirmed		: publishNodeUpdateConfirmed,
	   onNodeUpdateConfirmed			: onNodeUpdateConfirmed,
	   publishNodeUpdateFailed			: publishNodeUpdateFailed,
	   onNodeUpdateFailed 				: onNodeUpdateFailed,
	   // Delete action
	   publishNodeDeleteConfirmed		: publishNodeDeleteConfirmed,
	   onNodeDeleteConfirmed			: onNodeDeleteConfirmed,
	   publishNodeDeleteFailed			: publishNodeDeleteFailed,
	   onNodeDeleteFailed 				: onNodeDeleteFailed,
	   // Index action
	   publishNodeIndexConfirmed		: publishNodeIndexConfirmed,
	   onNodeIndexConfirmed				: onNodeIndexConfirmed,
	   publishNodeIndexFailed			: publishNodeIndexFailed,
	   onNodeIndexFailed 				: onNodeIndexFailed,
	   // Files action
	   publishNodeFilesConfirmed		: publishNodeFilesConfirmed,
	   onNodeFilesConfirmed				: onNodeFilesConfirmed,
	   publishNodeFilesFailed			: publishNodeFilesFailed,
	   onNodeFilesFailed 				: onNodeFilesFailed,
	   // Comments action
	   publishNodeCommentsConfirmed		: publishNodeCommentsConfirmed,
	   onNodeCommentsConfirmed			: onNodeCommentsConfirmed,
	   publishNodeCommentsFailed		: publishNodeCommentsFailed,
	   onNodeCommentsFailed 			: onNodeCommentsFailed,
	   // Attachfile action
	   publishNodeAttachFileConfirmed	: publishNodeAttachFileConfirmed,
	   onNodeAttachFileConfirmed		: onNodeAttachFileConfirmed,
	   publishNodeAttachFileFailed		: publishNodeAttachFileFailed,
	   onNodeAttachFileFailed 			: onNodeAttachFileFailed
 	};
}]);

/**
 * NodeResource
 * 
 * This service mirrors the Drupal node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/node*|<mirror>|POST|Content-Type
 * 
**/
NodeResourceModules.service('NodeResource', [ 'drupalApiConfig', 'BaseResource', 'NodeResourceConfig', 'NodeResourceChannel', '$http', '$q', 
                                      function(drupalApiConfig,   BaseResource,   NodeResourceConfig,   NodeResourceChannel,   $http,   $q) {
	
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
		console.log(BaseResource); 
		var getParamsString = BaseResource.getParams.join('&');
		BaseResource.getParams = [];
		
		return getParamsString;
    }
	
	
	/*
	 * 
	 * Retrieve
	 * 
	 * Drupal CORS settings: 
	 * "api_endpoint/node/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieves a single node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The nid of the node to retrieve., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(nid){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				NodeResourceChannel.publishNodeRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				NodeResourceChannel.publishNodeRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Retrieve a node
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/node
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Array} node The node data to create, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var create = function( node ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : {
				node : node
			}
		},
		errors = [];
		
		//if not given
		if(!node) { errors.push('Param node is required.'); }
		//if is not an array
		if( node instanceof Array ) { errors.push('Param node has to be an array.'); }
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeCreateFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};

	/*
	 * update
	 * 
	 * Update a user
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} uid The nid of the node to update, required:true, source:path
	 * @param 	{Array} data The node data to update, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( nid, node ) {
		var updatePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : updatePath,
			data : {
				node : node
			}
		},
		errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		//if not given
		if(!node) { errors.push('Param node is required.'); }
		//if is not an array
		if( node instanceof Array ) { errors.push('Param node has to be an array.');}
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};

	/*
	 * _delete
	 * 
	 * Delete a node
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} nid The nid of the node to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( nid ) {
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!nid) { errors.push('Param nid is required.');}

		if(errors.length != 0) {
			NodeResourceChannel.publishNodeDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/node*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all nodes. 
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/node
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} page The zero-based index of the page to get, defaults to 0., required:false, source:param
	 * @param {Array} fields The fields to get. Shouls be a comma seperated string., defaults to 0., required:false, source:param
	 *     valide fields: vid, uid, title, status, comment, promote, sticky,nid, type, language, created, changed, tnid, translate,
	 *     invalide fields: revision_timestamp, revision_uid, body, rdf_mapping, cid, last_comment_timestamp, last_comment_name, last_comment_uid, comment_count, name, picture, data, path
	 * @param {Array} parameters Parameters array, required:false, source:param
	 *     invalide and valide param names are same as in fields
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function(options) {
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * Files
	 * Drupal CORS settings api_endpoint/node/files/*|<mirror>|GET|Content-Type
	 * 
	 * This method returns files associated with a node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/node/{NID}/files/{FILE_CONTENTS}/{IMAGE_STYLES}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The nid of the node whose files we are getting, required:true, source:path
	 * @param {Integer} file_contents To return file contents or not., required:false, source:path
	 * @param {Integer} image_styles To return image styles or not., required:false, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var files = function(nid, file_contents, image_styles) {
		console.log(nid, file_contents, image_styles); 
		var attachFilePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid + '/' + NodeResourceConfig.actions.files + ((file_contents)?('/'+file_contents):'')+((image_styles)?('/'+image_styles):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeFilesFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeFilesConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeFilesFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * Comments
	 * Drupal CORS settings api_endpoint/node/comments/*|<mirror>|GET|Content-Type
	 * 
	 * This method returns the number of new comments on a given node.
	 * 
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/node/{NID}/comments/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The node id to load comments for., required:true, source:path
	 * @param {Integer} count Number of comments to load., required:false, source:param
	 * @param {Integer} offset If count is set to non-zero value, you can pass also non-zero value for start. For example to get comments from 5 to 15, pass count=10 and start=5., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var comments = function(nid, count, offset) {
		
		var attachFilePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + NodeResourceConfig.resourcePath + '/' + nid +'/' + NodeResourceConfig.actions.comments + '/' + ((count != undefined ||  offset != undefined)?'?':'')+ ((count != undefined)?('count='+count+','):'') + ((offset != undefined)?('offset=' + offset):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			NodeResourceChannel.publishNodeCommentsFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			NodeResourceChannel.publishNodeCommentsConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			NodeResourceChannel.publishNodeCommentsFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * Attach files
	 * Drupal CORS settings api_endpoint/node/attach_file*|<mirror>|GET|Content-Type
	 * 
	 * Upload and attach file(s) to a node. POST multipart/form-data to node/123/attach_file
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/node/{NID}/attach_file/
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
		console.log(nid, field_name, attach, field_values);
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