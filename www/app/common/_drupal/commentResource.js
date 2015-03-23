/**
 * Comment Resource Modules
 */
var CommentResourceModules = angular.module('CommentResourceModules', ['drupal.configurations', 'drupalBaseModules']);


//@TODO config provider

/**
 *  Constants for CommentResourceModules 
 */
CommentResourceModules.constant("CommentResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'comment',
	//actions of comment resource
	actions : {
		//retrieve 		: 'retrieve',
		//create		: 'create',
		//update 		: 'update',
		//delete		: 'delete',
		//index 		: 'index',
		countAll 		: 'countAll',
		countNew		: 'countNew',
	},
	  
	//
	// Constants for CommentResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	comment_retrieveConfirmed		: 'event:drupal-comment-retrieveConfirmed',
	comment_retrieveFailed  		: 'event:drupal-comment-retrieveFailed',
	// Create action
	comment_createConfirmed			: 'event:drupal-comment-createConfirmed',
	comment_createFailed  			: 'event:drupal-comment-createFailed',
	// Update action
	comment_updateConfirmed			: 'event:drupal-comment-updateConfirmed',
	comment_updateFailed  			: 'event:drupal-comment-updateFailed',
	// Delete action
	comment_deleteConfirmed			: 'event:drupal-comment-deleteConfirmed',
	comment_deleteFailed  			: 'event:drupal-comment-deleteFailed',
	// Index action
	comment_indexConfirmed			: 'event:drupal-comment-indexConfirmed',
	comment_indexFailed  			: 'event:drupal-comment-indexFailed',
	// CountAll action
	comment_countAllConfirmed		: 'event:drupal-comment-countAllConfirmed',
	comment_countAllFailed  		: 'event:drupal-comment-countAllFailed',
	// CountNew action
	comment_countNewConfirmed		: 'event:drupal-comment-countNewConfirmed',
	comment_countNewFailed  		: 'event:drupal-comment-countNewFailed',
	

});

/*Notification channel for the comment resource */
CommentResourceModules.service('CommentResourceChannel', ['$rootScope', 'CommentResourceConfig',
                                                 function ($rootScope,   CommentResourceConfig) {	
	
	// Retrieve Action
	
	// Publish comment retrieve confirmed event
    var publishCommentRetrieveConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_retrieveConfirmed, {comment: comment});
    };
    // Subscribe to comment retrieve confirmed event
    var onCommentRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_retrieveConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment retrieve failed event
    var publishCommentRetrieveFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_retrieveFailed, {error: error});
    };
    // Subscribe to comment retrieve failed event
    var onCommentRetrieveFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish comment create confirmed event
    var publishCommentCreateConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_createConfirmed, {comment: comment});
    };
    // Subscribe to comment create confirmed event
    var onCommentCreateConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_createConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
  
	// Publish create create failed event
    var publishCommentCreateFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_createFailed, {error: error});
    };
    // Subscribe to comment create failed event
    var onCommentCreateFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Update action
    
	// Publish comment update confirmed event
    var publishCommentUpdateConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_updateConfirmed, {comment: comment});
    };
    // Subscribe to comment update confirmed event
    var onCommentUpdateConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_updateConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment update failed event
    var publishCommentUpdateFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_updateFailed, {error: error});
    };
    // Subscribe to comment update failed event
    var onCommentUpdateFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish comment delete confirmed event
    var publishCommentDeleteConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_deleteConfirmed, {comment: comment});
    };
    // Subscribe to comment delete confirmed event
    var onCommentDeleteConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_deleteConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment delete failed event
    var publishCommentDeleteFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_deleteFailed, {error: error});
    };
    // Subscribe to comment delete failed event
    var onCommentDeleteFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish comment index confirmed event
    var publishCommentIndexConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_indexConfirmed, {comment: comment});
    };
    // Subscribe to comment index confirmed event
    var onCommentIndexConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_indexConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment index failed event
    var publishCommentIndexFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_indexFailed, {error: error});
    };
    // Subscribe to comment index failed event
    var onCommentIndexFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
  
    // CountAll action
    
	// Publish comment countAll confirmed event
    var publishCommentCountAllConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_countAllConfirmed, {comment: comment});
    };
    // Subscribe to comment countAll confirmed event
    var onCommentCountAllConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_countAllConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment countAll failed event
    var publishCommentCountAllFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_countAllFailed, {error: error});
    };
    // Subscribe to comment countAll failed event
    var onCommentCountAllFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_countAllFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

    // CountNew action
    
	// Publish comment countNew confirmed event
    var publishCommentCountNewConfirmed = function (comment) {
        $rootScope.$broadcast(CommentResourceConfig.comment_countNewConfirmed, {comment: comment});
    };
    // Subscribe to comment countNew confirmed event
    var onCommentCountNewConfirmed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_countNewConfirmed, function(event, args) {
	    handler(args.comment);
	   });	
    };
    
	// Publish comment countNew failed event
    var publishCommentCountNewFailed = function (error) {
        $rootScope.$broadcast(CommentResourceConfig.comment_countNewFailed, {error: error});
    };
    // Subscribe to comment countNew failed event
    var onCommentCountNewFailed = function($scope, handler) {
    	$scope.$on(CommentResourceConfig.comment_countNewFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

 // public methods
 return {	   
	   //Retrieve event
	   publishCommentRetrieveConfirmed		: publishCommentRetrieveConfirmed,
	   onCommentRetrieveConfirmed			: onCommentRetrieveConfirmed,
	   publishCommentRetrieveFailed		: publishCommentRetrieveFailed,
	   onCommentRetrieveFailed 			: onCommentRetrieveFailed,
	  // Create action
	   publishCommentCreateConfirmed		: publishCommentCreateConfirmed,
	   onCommentCreateConfirmed			: onCommentCreateConfirmed,
	   publishCommentCreateFailed			: publishCommentCreateFailed,
	   onCommentCreateFailed 				: onCommentCreateFailed,
	   // Update action
	   publishCommentUpdateConfirmed		: publishCommentUpdateConfirmed,
	   onCommentUpdateConfirmed			: onCommentUpdateConfirmed,
	   publishCommentUpdateFailed			: publishCommentUpdateFailed,
	   onCommentUpdateFailed 				: onCommentUpdateFailed,
	   // Delete action
	   publishCommentDeleteConfirmed		: publishCommentDeleteConfirmed,
	   onCommentDeleteConfirmed			: onCommentDeleteConfirmed,
	   publishCommentDeleteFailed			: publishCommentDeleteFailed,
	   onCommentDeleteFailed 				: onCommentDeleteFailed,
	   // Index action
	   publishCommentIndexConfirmed		: publishCommentIndexConfirmed,
	   onCommentIndexConfirmed				: onCommentIndexConfirmed,
	   publishCommentIndexFailed			: publishCommentIndexFailed,
	   onCommentIndexFailed 				: onCommentIndexFailed,
	   // CountAll action
	   publishCommentCountAllConfirmed		: publishCommentCountAllConfirmed,
	   onCommentCountAllConfirmed				: onCommentCountAllConfirmed,
	   publishCommentCountAllFailed			: publishCommentCountAllFailed,
	   onCommentCountAllFailed 				: onCommentCountAllFailed,
	   // CountNew action
	   publishCommentCountNewConfirmed		: publishCommentCountNewConfirmed,
	   onCommentCountNewConfirmed			: onCommentCountNewConfirmed,
	   publishCommentCountNewFailed		: publishCommentCountNewFailed,
	   onCommentCountNewFailed 			: onCommentCountNewFailed,

 	};
}]);

/**
 * CommentResource
 * 
 * This service mirrors the Drupal comment resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/comment*|<mirror>|POST|Content-Type
 * 
**/
CommentResourceModules.service('CommentResource', [ 'drupalApiConfig', 'BaseResource', 'CommentResourceConfig', 'CommentResourceChannel', '$http', '$q', 
                                      function(drupalApiConfig,   BaseResource,   CommentResourceConfig,   CommentResourceChannel,   $http,   $q) {
	
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
	 * "api_endpoint/comment/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieve a comment
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/comment/{CID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} cid The cid of the comment to retrieve., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(cid){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath + '/' + cid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!cid) { errors.push('Param cid is required.'); }
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				CommentResourceChannel.publishCommentRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				CommentResourceChannel.publishCommentRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Create a comment
	 * 
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/comment
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Array} comment The comment object, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var create = function( comment ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : {
				comment : comment
			}
		},
		errors = [];
		
		//if not given
		if(!comment) { errors.push('Param comment is required.'); }
		//if is not an array
		if( comment instanceof Array ) { errors.push('Param comment has to be an array.'); }
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCreateFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};

	/*
	 * update
	 * 
	 * Update a comment
	 * 
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/comment/{CID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} cid The unique identifier for this comment., required:true, source:path
	 * @param 	{Array} data The comment object with updated information, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( cid, comment ) {
		var updatePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath + '/' + cid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : updatePath,
			data : {
				comment : comment
			}
		},
		errors = [];

		//if not given
		if(!cid) { errors.push('Param cid is required.'); }
		//if not given
		if(!comment) { errors.push('Param comment is required.'); }
		//if is not an array
		if( comment instanceof Array ) { errors.push('Param comment has to be an array.');}
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};

	/*
	 * _delete
	 * 
	 * Delete a comment
	 * 
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/comment/{CID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} cid The id of the comment to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( cid ) {
		
		var deletePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath + '/' + cid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : deletePath
		},
		errors = [];
	
		//if not given
		if(!cid) { errors.push('Param cid is required.');}

		if(errors.length != 0) {
			CommentResourceChannel.publishCommentDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/comment*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all comments. 
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/comment
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} page The zero-based index of the page to get, defaults to 0., required:false, source:param
	 * @param {Array} fields The fields to get. Shouls be a comma seperated string., defaults to 0., required:false, source:param
	 * @param {Array} parameters Parameters array, required:false, source:param
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function(options) {
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * CountAll
	 * Drupal CORS settings api_endpoint/comment/countAll/*|<mirror>|GET|Content-Type
	 * 
	 * Return number of comments on a given node.
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/comment/countAll/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The node id to count all comments., required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var countAll = function(nid) {
		var countAllPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath + '/' + CommentResourceConfig.actions.countAll,
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : countAllPath,
				data : {
					nid : nid
				}
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentCountAllFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCountAllConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCountAllFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * CountNew
	 * Drupal CORS settings api_endpoint/comment/countNew/*|<mirror>|GET|Content-Type
	 * 
	 * Returns number of new comments on a given node since a given timestamp.
	 * 
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/comment/countNew/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The node id to load comments for., required:true, source:post body
	 * @param {Integer} since 	Timestamp to count from (defaults to time of last user acces to node)., required:false, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var countNew = function(nid, since) {
		
		var countNewPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + CommentResourceConfig.resourcePath + '/' + CommentResourceConfig.actions.countNew,
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : countNewPath,
				data : {
					nid : nid,
					since : since
				}
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			CommentResourceChannel.publishCommentCountNewFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCountNewConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			CommentResourceChannel.publishCommentCountNewFailed(data);
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
		//Actions
		countAll	: countAll,
		countNew 	: countNew
	};
	
}]);