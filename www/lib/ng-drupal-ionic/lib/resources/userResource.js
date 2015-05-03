/**
 * User Resource Modules
 */
var UserResourceModules = angular.module('UserResourceModules', ['drupal.configurations', 'drupalBaseModules']);


//@TODO config provider

/**
 *  Constants for UserResourceModules 
 */
UserResourceModules.constant("UserResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'user',
	//actions of user resource
	actions : {
		//retrieve 				: 'retrieve',
		//create 				: 'create',
		//update 				: 'update',
		//delete 				: 'delete',
	    //index 				: 'index',
		login 					: 'login',
		logout 					: 'logout',
		token 					: 'token',
		request_new_password 	: 'request_new_password',
		register 				: 'register',
		cancel 					: 'cancel',
		password_reset 			: 'password_reset',
		resend_welcome_email 	: 'resend_welcome_email',

	},
	  
	//
	// Constants for UserResourceChannel
	//
	// Actions:
	// Retrieve action
	user_retrieveConfirmed 				 : 'event:drupal-user-retrieveConfirmed',
	user_retrieveFailed  				: 'event:drupal-user-retrieveFailed',
	// Create action
	user_createConfirmed				: 'event:drupal-user-createConfirmed',
	user_createFailed  					: 'event:drupal-user-createFailed',
	// Update action
	user_updateConfirmed				: 'event:drupal-user-updateConfirmed',
	user_updateFailed  					: 'event:drupal-user-updateFailed',
	// Delete action	
	user_deleteConfirmed				: 'event:drupal-user-deleteConfirmed',
	user_deleteFailed  					: 'event:drupal-user-deleteFailed',
	// Index action
	user_indexConfirmed  				: 'event:drupal-user-indexConfirmed',
	user_indexFailed  					: 'event:drupal-user-indexFailed',
	//Request new password action
	user_requestNewPasswordConfirmed  	: 'event:drupal-user-requestNewPasswordConfirmed',
	user_requestNewPasswordFailed  		: 'event:drupal-user-requestNewPasswordFailed',
	//Cancel action
	user_cancelConfirmed  				: 'event:drupal-user-cancelConfirmed',
	user_cancelFailed  					: 'event:drupal-user-cancelFailed',
	//Password Reset
	user_passwordResetConfirmed  		: 'event:drupal-user-passwordResetConfirmed',
	user_passwordResetFailed  			: 'event:drupal-user-passwordResetFailed',
	//Resend Welcome Email
	user_resendWelcomeEmailConfirmed  	: 'event:drupal-user-resendWelcomeEmailConfirmed',
	user_resendWelcomeEmailFailed  		: 'event:drupal-user-resendWelcomeEmailFailed',
	// Token action
	user_tokenConfirmed  				: 'event:drupal-user-tokenConfirmed',
	user_tokenFailed  					: 'event:drupal-user-tokenFailed',
	// Register action
	user_registerConfirmed  			: 'event:drupal-user-registerConfirmed',
	user_registerFailed  				: 'event:drupal-user-registerFailed',
	// Login action
	user_loginConfirmed  				: 'event:drupal-user-loginConfirmed',
	user_loginFailed  					: 'event:drupal-user-loginFailed',
	// Logout action
	user_logoutConfirmed  				: 'event:drupal-user-logoutConfirmed',
	user_logoutFailed  					: 'event:drupal-user-logoutFailed'
});

/**
 * Notification channel for the user resource 
 * 
 */
UserResourceModules.service('UserResourceChannel', ['$rootScope', 'UserResourceConfig',
                                           function ($rootScope,   UserResourceConfig) {	
	
	// Retrieve action

	// Publish retrieve token confirmed event
    var publishUserRetrieveConfirmed = function (user) {
        $rootScope.$broadcast(UserResourceConfig.user_retrieveConfirmed, {user: user});
    };
    // Subscribe to user token confirmed event
    var onUserRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_retrieveConfirmed, function(event, args) {
    		handler(args.user);
	   });	
    };
    
    // Publish user recieve failed event
    var publishUserRetrieveFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_retrieveFailed, {error: error});
    };
    // Subscribe to user token failed event
    var onUserRetrieveFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
// Create action
	
	// Publish user create confirmed event
    var publishUserCreateConfirmed = function (user) {
        $rootScope.$broadcast(UserResourceConfig.user_createConfirmed, {user: user});
    };
    // Subscribe to user create confirmed event
    var onUserCreateConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_createConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
  
	// Publish create create failed event
    var publishUserCreateFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_createFailed, {error: error});
    };
    // Subscribe to user create failed event
    var onUserCreateFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Update action
    
	// Publish user update confirmed event
    var publishUserUpdateConfirmed = function (user) {
        $rootScope.$broadcast(UserResourceConfig.user_updateConfirmed, {user: user});
    };
    // Subscribe to user update confirmed event
    var onUserUpdateConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_updateConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
    
	// Publish user update failed event
    var publishUserUpdateFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_updateFailed, {error: error});
    };
    // Subscribe to user update failed event
    var onUserUpdateFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish user delete confirmed event
    var publishUserDeleteConfirmed = function (user) {
        $rootScope.$broadcast(UserResourceConfig.user_deleteConfirmed, {user: user});
    };
    // Subscribe to user delete confirmed event
    var onUserDeleteConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_deleteConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
    
	// Publish user delete failed event
    var publishUserDeleteFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_deleteFailed, {error: error});
    };
    // Subscribe to user delete failed event
    var onUserDeleteFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    
    // Index action

	// Publish retrieve index confirmed event
    var publishUserIndexConfirmed = function (data) {
        $rootScope.$broadcast(UserResourceConfig.user_indexConfirmed, {data: data});
    };
    // Subscribe to user index confirmed event
    var onUserIndexConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_indexConfirmed, function(event, args) {
    		handler(args.data);
	   });	
    };
    // Publish user index failed event
    var publishUserIndexFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_indexFailed, {error: error});
    };
    // Subscribe to user token failed event
    var onUserIndexFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
	
    // Token action

	// Publish user token confirmed event
    var publishUserTokenConfirmed = function (token) {
        $rootScope.$broadcast(UserResourceConfig.user_tokenConfirmed, {token: token});
    };
    // Subscribe to user token confirmed event
    var onUserTokenConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_tokenConfirmed, function(event, args) {
    		handler(args.token);
	   });	
    };
    
    // Publish user token failed event
    var publishUserTokenFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_tokenFailed, {error: error});
    };
    // Subscribe to user token failed event
    var onUserTokenFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_tokenFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Register action

	// Publish user register confirmed event
    var publishUserRegisterConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_registerConfirmed, {respons: respons});
    };
    // Subscribe to user register confirmed event
    var onUserRegisterConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_registerConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user register failed event
    var publishUserRegisterFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_registerFailed, {error: error});
    };
    // Subscribe to user register failed event
    var onUserRegisterFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_registerFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Login action
    
	// Publish user login confirmed event
    var publishUserLoginConfirmed = function (data) {
        $rootScope.$broadcast(UserResourceConfig.user_loginConfirmed, {data: data});
    };
    // Subscribe to user login confirmed event
    var onUserLoginConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_loginConfirmed, function(event, args) {
	    handler(args.data);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLoginFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_loginFailed, {error: error});
    };
    // Subscribe to user login failed event
    var onUserLoginFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_loginFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Logout action
    
	// Publish user login confirmed event
    var publishUserLogoutConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_logoutConfirmed, {respons: respons});
    };
    // Subscribe to user login confirmed event
    var onUserLogoutConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_logoutConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLogoutFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_logoutFailed, {error: error});
    };
    // Subscribe to user login failed event
    var onUserLogoutFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_logoutFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Request new password action
        
	// Publish user requestNewPassword confirmed event
    var publishUserRequestNewPasswordConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_requestNewPasswordConfirmed, {respons: respons});
    };
    // Subscribe to user requestNewPassword confirmed event
    var onUserRequestNewPasswordConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_requestNewPasswordConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user requestNewPassword failed event
    var publishUserRequestNewPasswordFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_requestNewPasswordFailed, {error: error});
    };
    // Subscribe to user requestNewPassword failed event
    var onUserRequestNewPasswordFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_requestNewPasswordFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Cancel action

	// Publish user cancel confirmed event
    var publishUserCancelConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_cancelConfirmed, {respons: respons});
    };
    // Subscribe to user cancel confirmed event
    var onUserCancelConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_cancelConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user cancel failed event
    var publishUserCancelFailed = function (error) { 
        $rootScope.$broadcast(UserResourceConfig.user_cancelFailed, {error: error});
    };
    // Subscribe to user cancel failed event
    var onUserCancelFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_cancelFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Password Reset action 
    
    // Publish user login failed event
    var publishUserPasswordResetFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_passwordResetFailed, {error: error});
    };
    // Subscribe to user login failed event
    var onUserPasswordResetFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_passwordResetFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
	// Publish user password_reset confirmed event
    var publishUserPasswordResetConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_passwordResetConfirmed, {respons: respons});
    };
    // Subscribe to user password_reset confirmed event
    var onUserPasswordResetConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_passwordResetConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    
	//Resend Welcome Email
    
    // Publish user ResendWelcomeEmail failed event
    var publishUserResendWelcomeEmailFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_resendWelcomeEmailFailed, {error: error});
    };
    // Subscribe to user ResendWelcomeEmail failed event
    var onUserResendWelcomeEmailFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_resendWelcomeEmailFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
	// Publish user ResendWelcomeEmail confirmed event
    var publishUserResendWelcomeEmailConfirmed = function (respons) {
        $rootScope.$broadcast(UserResourceConfig.user_resendWelcomeEmailConfirmed, {respons: respons});
    };
    // Subscribe to user ResendWelcomeEmail confirmed event
    var onUserResendWelcomeEmailConfirmed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_resendWelcomeEmailConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };	

 // public methods
 return {	   
	   // Retrieve events
	   publishUserRetrieveConfirmed 				: publishUserRetrieveConfirmed,
	   onUserRetrieveConfirmed						: onUserRetrieveConfirmed,
	   publishUserRetrieveFailed					: publishUserRetrieveFailed,
	   onUserRetrieveFailed							: onUserRetrieveFailed,
	   // Create action
	   publishUserCreateConfirmed					: publishUserCreateConfirmed,
	   onUserCreateConfirmed						: onUserCreateConfirmed,
	   publishUserCreateFailed						: publishUserCreateFailed,
	   onUserCreateFailed 							: onUserCreateFailed,
	   // Update action
	   publishUserUpdateConfirmed					: publishUserUpdateConfirmed,
	   onUserUpdateConfirmed						: onUserUpdateConfirmed,
	   publishUserUpdateFailed						: publishUserUpdateFailed,
	   onUserUpdateFailed 							: onUserUpdateFailed,
	   // Delete action
	   publishUserDeleteConfirmed					: publishUserDeleteConfirmed,
	   onUserDeleteConfirmed						: onUserDeleteConfirmed,
	   publishUserDeleteFailed						: publishUserDeleteFailed,
	   onUserDeleteFailed 							: onUserDeleteFailed,
	   // Index events
	   publishUserIndexConfirmed 					: publishUserIndexConfirmed,
	   onUserIndexConfirmed							: onUserIndexConfirmed,
	   publishUserIndexFailed						: publishUserIndexFailed,
	   onUserIndexFailed							: onUserIndexFailed,
	   // Request new password
	   publishUserRequestNewPasswordConfirmed 		: publishUserRequestNewPasswordConfirmed,
	   onUserRequestNewPasswordConfirmed			: onUserRequestNewPasswordConfirmed,
	   publishUserRequestNewPasswordFailed			: publishUserRequestNewPasswordFailed,
	   onUserRequestNewPasswordFailed				: onUserRequestNewPasswordFailed,
	   // Cancel
	   publishUserCancelConfirmed 					: publishUserCancelConfirmed,
	   onUserCancelConfirmed						: onUserCancelConfirmed,
	   publishUserCancelFailed						: publishUserCancelFailed,
	   onUserCancelFailed							: onUserCancelFailed,
	   // Password reset
	   publishUserPasswordResetConfirmed 			: publishUserPasswordResetConfirmed,
	   onUserPasswordResetConfirmed					: onUserPasswordResetConfirmed,
	   publishUserPasswordResetFailed				: publishUserPasswordResetFailed,
	   onUserPasswordResetFailed					: onUserPasswordResetFailed,
	   // Resend welcome email
	   publishUserResendWelcomeEmailConfirmed 		: publishUserResendWelcomeEmailConfirmed,
	   onUserResendWelcomeEmailConfirmed			: onUserResendWelcomeEmailConfirmed,
	   publishUserResendWelcomeEmailFailed			: publishUserResendWelcomeEmailFailed,
	   onUserResendWelcomeEmailFailed				: onUserResendWelcomeEmailFailed,
	   // Token events
	   publishUserTokenConfirmed 					: publishUserTokenConfirmed,
	   onUserTokenConfirmed							: onUserTokenConfirmed,
	   publishUserTokenFailed						: publishUserTokenFailed,
	   onUserTokenFailed							: onUserTokenFailed,
	   // Register events
	   publishUserRegisterConfirmed 				: publishUserRegisterConfirmed,
	   onUserRegisterConfirmed						: onUserRegisterConfirmed,
	   publishUserRegisterFailed					: publishUserRegisterFailed,
	   onUserRegisterFailed							: onUserRegisterFailed,
	   // Login events
	   publishUserLoginConfirmed					: publishUserLoginConfirmed,
	   onUserLoginConfirmed							: onUserLoginConfirmed,
	   publishUserLoginFailed						: publishUserLoginFailed,
	   onUserLoginFailed							: onUserLoginFailed,
	   // Logout events
	   publishUserLogoutConfirmed 					: publishUserLogoutConfirmed,
	   onUserLogoutConfirmed						: onUserLogoutConfirmed,
	   publishUserLogoutFailed						: publishUserLogoutFailed,
	   onUserLogoutFailed							: onUserLogoutFailed
 	};
}]);


/**
 * UserResource
 *
 * This service mirrors the Drupal system resource of the services 3.x module.
 * to use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/user/*|<mirror>|GET, PUT, POST, DELETE|Content-Type,Authorization
 * 
**/
UserResourceModules.service('UserResource', [ 'drupalApiConfig', 'BaseResource', 'UserResourceConfig', 'UserResourceChannel', '$http', '$q', 
                                      function(drupalApiConfig,   BaseResource,   UserResourceConfig,   UserResourceChannel,   $http,   $q) {
	
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
	 * retrieve
	 * 
	 * Retrieve a user
	 * Method: GET
	 * Url: http://drupal_instance/api_endpoint/user/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} uid The uid of the user to retrieve., required:true, source:path
	 * 
	 * @return 	{Promise} 
	 * 
	 */
	var retrieve = function( uid ) {
		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/'+uid,
		defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : retrievePath
		},
		errors = [];
		
	//if not given
	if(!uid) { errors.push('Param uid is required.'); }
	
	if(errors.length != 0) {
		UserResourceChannel.publishUserRetrieveFailed(errors);
		defer.reject(errors); 
		return defer.promise;
	};
	
	$http(requestConfig)
	.success(function(user, status, headers, config){
		UserResourceChannel.publishUserRetrieveConfirmed(user);
		defer.resolve(user);
	})
	.error(function(data, status, headers, config){
		UserResourceChannel.publishUserRetrieveFailed(data);
		defer.reject(data);
	});

	return defer.promise;
	};
	
	/*
	 * create
	 * 
	 * Create a user
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Array} account The user object, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var create = function( account ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath,
		defer = $q.defer(),
		requestConfig = {
			method :'POST',
			url : createPath,
			data : {
				account : account,
				
			}
		},
		errors = [];
		
		//if not given
		if(!account) { errors.push('Param account is required.'); }
		//if is not an array
		if( account instanceof Array ) { errors.push('Param account has to be an array.'); }
		
		if(errors.length != 0) {
			UserResourceChannel.publishUserCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			UserResourceChannel.publishUserCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			UserResourceChannel.publishUserCreateFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};

	/*
	 * update
	 * 
	 * Update a user
	 * Method: PUT
	 * Url: http://drupal_instance/api_endpoint/user/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} uid Unique identifier for this user, required:true, source:path
	 * @param 	{Array} data The user object with updated information, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var update = function( uid, data ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + uid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : createPath,
			data : {
				data : data
			}
		},
		errors = [];
		
		//if not given
		if(!uid) { errors.push('Param uid is required.'); }
		//if not given
		if(!data) { errors.push('Param data is required.'); }
		//if is not an array
		if( data instanceof Array ) { errors.push('Param data has to be an array.');}
		
		if(errors.length != 0) {
			UserResourceChannel.publishUserUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			UserResourceChannel.publishUserUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			UserResourceChannel.publishUserUpdateFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};

	/*
	 * _delete
	 * 
	 * Delete a user
	 * Method: DELETE
	 * Url: http://drupal_instance/api_endpoint/user/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} uid The id of the user to delete, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var _delete = function( uid ) {
		var createPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + uid,
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : createPath
		},
		errors = [];
	
		//if not given
		if(!uid) { errors.push('Param uid is required.');}

		if(errors.length != 0) {
			UserResourceChannel.publishUserDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			UserResourceChannel.publishUserDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			UserResourceChannel.publishUserDeleteFailed(data);
			defer.reject(data);
		});
	
		return defer.promise;
	};
	
	/*
	 * index
	 * 
	 * List all users
	 * Method: GET
	 * Url: http://drupal_instance/api_endpoint/user
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Integer} page The zero-based index of the page to get. defaults to 0., required:false, source:param
	 * @param 	{String} fields The fields to get., required:false, source:param
	 * uid,name,mail,theme,signature,signature_format,created,access,login,status,timezone,language,picture,init,data
	 * @param 	{Array} parameters Parameters, required:false, source:param
	 * @param 	{Integer} pagesize Number of records to get per page., required:false, source:param
	 * 
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function( options ) {
		
		var indexPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath;
		if(options) {
			indexPath += (Object.getOwnPropertyNames(options).length > 0)?'?':'';
			indexPath += prepareIndexGetParams(options);
		}
		 
		var defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : indexPath,
		},
		errors = [];

		$http(requestConfig)
		.success(function(data, status, headers, config){
			UserResourceChannel.publishUserIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			UserResourceChannel.publishUserIndexFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
			
	/*
	 * login
	 * 
	 * Login a user for a new session
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/login
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} username A valid username, required:true, source:post body
	 * @param 	{String} password A valid password, required:true, source:post body
	 * 
	 * @return 	{Promise} 
	 * 
	 */	
	 var login = function( username, password ) {
					
		var pathToLogin = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.login;
			requestConfig = {
					method :'POST',
					url : pathToLogin,
					 headers: {
						//@TODO use the format of drupalApiConfig
						"Accept" 		: "application/json",
						"Content-Type"	: "application/json",
					 },
					 data : {
							"username" : username,
							"password" : password
					},
			},
			defer = $q.defer();
			
		$http(requestConfig)
		.success(function (data, status, headers, config) {
			 UserResourceChannel.publishUserLoginConfirmed(data);
             defer.resolve(data);
         })
         .error(function (data, status, headers, config) {
        	 UserResourceChannel.publishUserLoginFailed(data);
        	 defer.reject(data);
         });
		
		return defer.promise;
	};
	
	/*
	 * logout
	 * 
	 * Logout a user session
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/logout
	 * Headers: Content-Type:application/json
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var logout = function() {
		 var pathToLogout = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.logout;
		 	 requestConfig = {
		 			method: 'POST',
					url : pathToLogout,
					headers: {
						//@TODO use the format of drupalApiConfig
						"Accept" 		: "application/json",
						"Content-Type"	: "application/json",
					},
					withCredentials: true,
			},
			defer = $q.defer();
		 
		 $http(requestConfig)
         .success(function (data, status, headers, config) {
           UserResourceChannel.publishUserLogoutConfirmed(data);
           defer.resolve(data);
         })
         .error(function (data, status, headers, config) {
           UserResourceChannel.publishUserLogoutFailed(data);
           defer.reject(data);
         });
         
         return defer.promise;
	};

	
	/*
	 * token
	 * 
	 * Returns the CSRF token.
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/token
	 * Headers: Content-Type:application/json
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var token = function() {
		 var defer = $q.defer(),
         pathToToken = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.token,
		 requestConfig = {
			       url: pathToToken,
			       method: 'POST'
		};
			
	     $http(requestConfig)
         .success(function (data) {
           UserResourceChannel.publishUserTokenConfirmed(data.token);
           defer.resolve(data.token);
         })
         .error(function (data) {
           UserResourceChannel.publishUserTokenFailed(data);
           defer.reject(data);
         });

	     return defer.promise;
	};
	
	/*
	 * request_new_password
	 * 
	 * Request a new password, given a user name or e-mail address.
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/request_new_password
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} name A valid user name or e-mail address, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var request_new_password = function(name) {
		var defer = $q.defer(),
        pathToRequestNewPassword = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.request_new_password,
        requestConfig = {
			       url: pathToRequestNewPassword,
			       method: 'POST',
			       data : { name: name }
		},
		errors = [];
	
		//if not given
		if(!name) { errors.push('Param name is required.');}

		if(errors.length != 0) {
			UserResourceChannel.publishUserRequestNewPasswordFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
	     $http(requestConfig)
        .success(function (data) {
          UserResourceChannel.publishUserRequestNewPasswordConfirmed(data);
          defer.resolve(data);
        })
        .error(function (data) {
          UserResourceChannel.publishUserRequestNewPasswordFailed(data);
          defer.reject(data);
        });

	     return defer.promise;
	};
		
	/*
	 * register
	 * 
	 * Register a user
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/register
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Array} account The user object, required:true, source:post body
	 * 
	 * @return {Promise}
	 * 
	 */
	var register = function(account){
		
		 var pathToRegister = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.register;
	 	 	 requestConfig = {
	 			method: 'POST',
				url : pathToRegister,
				headers: {
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data : account
	 	 	  },
	 	 	  defer = $q.defer();
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			UserResourceChannel.publishUserRegisterConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			UserResourceChannel.publishUserRegisterFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};
	
	/*
	 * cancel
	 * 
	 * Cancel a user
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/{UID}/cancel
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The user object, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var cancel = function(uid) {
		var defer = $q.defer(),
        pathToCancel = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + uid + '/' + UserResourceConfig.actions.cancel,
        requestConfig = {
			       url: pathToCancel,
			       method: 'POST'
		},
		errors = [];
		
		//if not given
		if(!uid) { errors.push('Param uid is required.');}

		if(errors.length != 0) {
			UserResourceChannel.publishUserCancelFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
	    $http(requestConfig)
        .success(function (data) {
          UserResourceChannel.publishUserCancelConfirmed(data);
          defer.resolve(data);
        })
        .error(function (data) {
          UserResourceChannel.publishUserCancelFailed(data);
          defer.reject(data);
        });

	     return defer.promise;
	};
		
	/*
	 * password_reset
	 * 
	 * 
	 * resets the password
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/{UID}/password_reset
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The id of the user whose password to reset., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var password_reset = function(uid) {
		var defer = $q.defer(),
        pathToPasswordReset = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + uid + '/' + UserResourceConfig.actions.password_reset,
        requestConfig = {
			       url: pathToPasswordReset,
			       method: 'POST'
		},
		errors = [];
		
		//if not given
		if(!uid) { errors.push('Param uid is required.');}

		if(errors.length != 0) {
			UserResourceChannel.publishUserPasswordResetFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
	     $http(requestConfig)
        .success(function (data) {
          UserResourceChannel.publishUserPasswordResetConfirmed(data);
          defer.resolve(data);
        })
        .error(function (data) {
          UserResourceChannel.publishUserPasswordResetFailed(data);
          defer.reject(data);
        });

	     return defer.promise;
	};
		
	/*
	 * resend_welcome_email
	 * 
	 * 
	 * resets the password
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/{UID}/resend_welcome_email
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The id of the user whose welcome email to resend., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var resend_welcome_email = function(uid) {
		var defer = $q.defer(),
        pathToResendWelcomeEmail = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + uid + '/' + UserResourceConfig.actions.resend_welcome_email,
        requestConfig = {
			       url: pathToResendWelcomeEmail,
			       method: 'POST'
		},
		errors = [];
		
		//if not given
		if(!uid) { errors.push('Param uid is required.');}

		if(errors.length != 0) {
			UserResourceChannel.publishUserResendWelcomeEmailFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
	     $http(requestConfig)
        .success(function (data) {
          UserResourceChannel.publishUserResendWelcomeEmailConfirmed(data);
          defer.resolve(data);
        })
        .error(function (data) {
          UserResourceChannel.publishUserResendWelcomeEmailFailed(data);
          defer.reject(data);
        });

	     return defer.promise;
	};

	//public methods	
	return {
		retrieve : retrieve,
		create : create,
		update : update,
		_delete : _delete,
		index : index,
		login : login,
		logout : logout,
		token : token,
		request_new_password : request_new_password,
		register : register,
		cancel : cancel,
		password_reset : password_reset,
		resend_welcome_email : resend_welcome_email,
	};
	
}]);