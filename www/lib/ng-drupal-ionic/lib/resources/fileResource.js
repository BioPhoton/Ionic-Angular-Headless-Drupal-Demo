/**
 * File Resource Modules
 */
var FileResourceModules = angular.module('FileResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for FileResourceModules 
 */
FileResourceModules.constant("FileResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'file',
	//actions of file resource
	actions : {
		//retrieve 	: 'retrieve',
		//create		: 'create',
		//delete		: 'delete',
		//index 		: 'index',
		createRaw  : 'create_raw'
	},
	  
	//
	// Constants for FileResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	file_retrieveConfirmed		: 'event:drupal-file-retrieveConfirmed',
	file_retrieveFailed  		: 'event:drupal-file-retrieveFailed',
	// Create action
	file_createConfirmed		: 'event:drupal-file-createConfirmed',
	file_createFailed  			: 'event:drupal-file-createFailed',
	// Delete action
	file_deleteConfirmed		: 'event:drupal-file-deleteConfirmed',
	file_deleteFailed  			: 'event:drupal-file-deleteFailed',
	// Index action
	file_indexConfirmed			: 'event:drupal-file-indexConfirmed',
	file_indexFailed  			: 'event:drupal-file-indexFailed',
	// Files action
	file_filesConfirmed			: 'event:drupal-file-filesConfirmed',
	file_filesFailed  			: 'event:drupal-file-filesFailed',
	// Comments action
	file_commentsConfirmed		: 'event:drupal-file-commentsConfirmed',
	file_commentsFailed  		: 'event:drupal-file-commentsFailed',
	// Create raw action
	file_createRawConfirmed		: 'event:drupal-file-createRawConfirmed',
	file_createRawFailed  		: 'event:drupal-file-createRawFailed',
	
});

/*Notification channel for the file resource */
FileResourceModules.service('FileResourceChannel', ['$rootScope', 'FileResourceConfig',
                                           function ($rootScope,   FileResourceConfig) {	
	
	// Retrieve Action
	
	// Publish file retrieve confirmed event
    var publishFileRetrieveConfirmed = function (file) {
        $rootScope.$broadcast(FileResourceConfig.file_retrieveConfirmed, {file: file});
    };
    // Subscribe to file retrieve confirmed event
    var onFileRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_retrieveConfirmed, function(event, args) {
	    handler(args.file);
	   });	
    };
    
	// Publish file retrieve failed event
    var publishFileRetrieveFailed = function (error) {
        $rootScope.$broadcast(FileResourceConfig.file_retrieveFailed, {error: error});
    };
    // Subscribe to file retrieve failed event
    var onFileRetrieveFailed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
    // Create action
	
	// Publish file create confirmed event
    var publishFileCreateConfirmed = function (file) {
        $rootScope.$broadcast(FileResourceConfig.file_createConfirmed, {file: file});
    };
    // Subscribe to file create confirmed event
    var onFileCreateConfirmed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_createConfirmed, function(event, args) {
	    handler(args.file);
	   });	
    };
  
	// Publish create create failed event
    var publishFileCreateFailed = function (error) {
        $rootScope.$broadcast(FileResourceConfig.file_createFailed, {error: error});
    };
    // Subscribe to file create failed event
    var onFileCreateFailed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish file delete confirmed event
    var publishFileDeleteConfirmed = function (file) {
        $rootScope.$broadcast(FileResourceConfig.file_deleteConfirmed, {file: file});
    };
    // Subscribe to file delete confirmed event
    var onFileDeleteConfirmed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_deleteConfirmed, function(event, args) {
	    handler(args.file);
	   });	
    };
    
	// Publish file delete failed event
    var publishFileDeleteFailed = function (error) {
        $rootScope.$broadcast(FileResourceConfig.file_deleteFailed, {error: error});
    };
    // Subscribe to file delete failed event
    var onFileDeleteFailed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish file index confirmed event
    var publishFileIndexConfirmed = function (file) {
        $rootScope.$broadcast(FileResourceConfig.file_indexConfirmed, {file: file});
    };
    // Subscribe to file index confirmed event
    var onFileIndexConfirmed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_indexConfirmed, function(event, args) {
	    handler(args.file);
	   });	
    };
    
	// Publish file index failed event
    var publishFileIndexFailed = function (error) {
        $rootScope.$broadcast(FileResourceConfig.file_indexFailed, {error: error});
    };
    // Subscribe to file index failed event
    var onFileIndexFailed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Create raw action
 
	// Publish file createRaw confirmed event
    var publishCreateRawFileConfirmed = function (file) {
        $rootScope.$broadcast(FileResourceConfig.file_createRawConfirmed, {file: file});
    };
    // Subscribe to file createRaw confirmed event
    var onCreateRawFileConfirmed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_createRawConfirmed, function(event, args) {
	    handler(args.file);
	   });	
    };
    
	// Publish file createRaw failed event
    var publishCreateRawFileFailed = function (error) {
        $rootScope.$broadcast(FileResourceConfig.file_createRawFailed, {error: error});
    };
    // Subscribe to file createRaw failed event
    var onCreateRawFileFailed = function($scope, handler) {
    	$scope.$on(FileResourceConfig.file_createRawFailed, function(event, args) {
	    handler(args.error);
	   });	
    };


 // public methods
 return {	   
	   //Retrieve event
	   publishFileRetrieveConfirmed		: publishFileRetrieveConfirmed,
	   onFileRetrieveConfirmed			: onFileRetrieveConfirmed,
	   publishFileRetrieveFailed		: publishFileRetrieveFailed,
	   onFileRetrieveFailed 			: onFileRetrieveFailed,
	  // Create action
	   publishFileCreateConfirmed		: publishFileCreateConfirmed,
	   onFileCreateConfirmed			: onFileCreateConfirmed,
	   publishFileCreateFailed			: publishFileCreateFailed,
	   onFileCreateFailed 				: onFileCreateFailed,
	   // Delete action
	   publishFileDeleteConfirmed		: publishFileDeleteConfirmed,
	   onFileDeleteConfirmed			: onFileDeleteConfirmed,
	   publishFileDeleteFailed			: publishFileDeleteFailed,
	   onFileDeleteFailed 				: onFileDeleteFailed,
	   // Index action
	   publishFileIndexConfirmed		: publishFileIndexConfirmed,
	   onFileIndexConfirmed				: onFileIndexConfirmed,
	   publishFileIndexFailed			: publishFileIndexFailed,
	   onFileIndexFailed 				: onFileIndexFailed,
	   // Attachfile action
	   publishCreateRawFileConfirmed	: publishCreateRawFileConfirmed,
	   onCreateRawFileConfirmed		: onCreateRawFileConfirmed,
	   publishCreateRawFileFailed		: publishCreateRawFileFailed,
	   onCreateRawFileFailed 			: onCreateRawFileFailed
 	};
}]);

/**
 * FileResource
 * 
 * This service mirrors the Drupal file resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/file*|<mirror>|POST|Content-Type
 * 
**/
FileResourceModules.service('FileResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'FileResourceConfig', 'FileResourceChannel', '$http', '$q', 
                                      function($rootScope,  drupalApiConfig,   BaseResource,   FileResourceConfig,   FileResourceChannel,   $http,   $q) {
	
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
	 * "api_endpoint/file/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieves a single file.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/file/{FID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} fid The fid of the file to retrieve., required:true, source:path
	 * @param {Integer} file_contents To return file contents or not., required:false, source:param
	 * @param {Integer} image_styles To return image styles or not., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(fid, file_contents, image_styles){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + FileResourceConfig.resourcePath + '/' + fid,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!fid) { errors.push('Param fid is required.'); }
		
		if(errors.length != 0) {
			FileResourceChannel.publishFileRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				FileResourceChannel.publishFileRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				FileResourceChannel.publishFileRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	/*
	 * create
	 * 
	 * Create a file with base64 encoded data
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/file
	 * Headers: Content-Type: multipart/form-data 
	 * 
	 * @param 	{Array} file An array representing a file., required:true, source:post body
	 * file = {
	 *		file:base64data,
     *	    filename:filename,
	 *		filesize:filesize {String}
	 *		}
	 * @return 	{Promise}
	 * 
	 */
	var create = function( file ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + FileResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined},
		},
		errors = [];
		
		//if not given
		if(!file) { errors.push('Param file is required.'); }
		//if is not an array
		if( file instanceof Array ) { errors.push('Param file has to be an array.'); }
		//if is not given
		if( !file.file ) { errors.push("Param file['file'] is required."); }
		if( !file.filename ) { errors.push("Param file['filename'] is required."); }
		
		if(errors.length != 0) {
			FileResourceChannel.publishFileCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		var newForm = new FormData();
		if(file.filename) {newForm.append('filename', file.filename);}
		if(file.file) {newForm.append('file', file.file);}
		if(file.filesize) {newForm.append('filesize', "" + file.filesize);}
		if(file.image_file_name) {newForm.append('filepath', 'public://' + file.image_file_name); }
		
		$http.post(createPath, newForm, requestConfig)
		.success(function(data){
			FileResourceChannel.publishFileCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data){
			FileResourceChannel.publishFileCreateFailed(data);
			defer.reject(data);
		});
			
		return defer.promise;
	};

	/*
	 * _delete
	 * 
	 * Delete a file
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/file/{CID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} cid The id of the file to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( cid ) {
		
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + FileResourceConfig.resourcePath + '/' + cid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : createPath
		},
		errors = [];
	
		//if not given
		if(!cid) { errors.push('Param cid is required.');}

		if(errors.length != 0) {
			FileResourceChannel.publishFileDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			FileResourceChannel.publishFileDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			FileResourceChannel.publishFileDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/file*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all files. 
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/file
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
	
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + FileResourceConfig.resourcePath;
		indexPath +=  (Object.getOwnPropertyNames(options).length > 0)?'?':'';
		indexPath += prepareIndexGetParams(options);
		
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];		
		
		if(errors.length != 0) {
			FileResourceChannel.publishFileIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			FileResourceChannel.publishFileIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			FileResourceChannel.publishFileIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * @TODO find documentation
	 * Create Raw
	 * Drupal CORS settings api_endpoint/file/create_raw*|<mirror>|GET|Content-Type
	 * 
	 * Create a file with raw data.
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/file/create_raw
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var create_raw = function() {
		var createRawPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + FileResourceConfig.resourcePath + '/' + FileResourceConfig.actions.createRaw,
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : createRawPath,
				headers : {
					//"Content-Type"	: "?????????",
				}
			};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			FileResourceChannel.publishCreateRawFileConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			FileResourceChannel.publishCreateRawFileFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	//public methods	
	return {
		//CRUD operations
		retrieve 	: retrieve,
		create 		: create,
		_delete 	: _delete,
		index	 	: index,
		create_raw : create_raw,
	};
	
}]);