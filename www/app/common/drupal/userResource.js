/**
 * User Resource Modules
 */
var UserResourceModules = angular.module('UserResourceModules', ['drupal.configurations']);


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
		create 					: 'create',
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
	// Token action
	user_tokenConfirmed  	: 'event:drupal-user-tokenConfirmed',
	user_tokenFailed  		: 'event:drupal-user-tokenFailed',
	// Register action
	user_registerConfirmed  : 'event:drupal-user-registerConfirmed',
	user_registerFailed  	: 'event:drupal-user-registerFailed',
	// Login action
	user_loginConfirmed  	: 'event:drupal-user-loginConfirmed',
	user_loginFailed  		: 'event:drupal-user-loginFailed',
	// Logout action
	user_logoutConfirmed  	: 'event:drupal-user-logoutConfirmed',
	user_logoutFailed  		: 'event:drupal-user-logoutFailed',
	
});

/**
 * Notification channel for the user resource 
 * 
 */
UserResourceModules.service('UserResourceChannel', ['$rootScope', 'UserResourceConfig',
                                           function ($rootScope,   UserResourceConfig) {	
	
    // Token action

	// Publish user token confirmed event
    var publishUserTokenConfirmed = function (token) {
    	console.log(token, UserResourceConfig.user_registerConfirmed); 
        $rootScope.$broadcast(UserResourceConfig.user_registerConfirmed, {token: token});
    };
    // Subscribe to user token confirmed event
    var onUserTokenConfirmed = function($scope, handler) {
    	
    	$scope.$on(UserResourceConfig.user_registerConfirmed, function(event, args) {
    		console.log(args); 
    		handler(args.token);
	   });	
    };
    
    // Publish user token failed event
    var publishUserTokenFailed = function (error) {
        $rootScope.$broadcast(UserResourceConfig.user_registerFailed, {error: error});
    };
    // Subscribe to user token failed event
    var onUserTokenFailed = function($scope, handler) {
    	$scope.$on(UserResourceConfig.user_registerFailed, function(event, args) {
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
    	console.log(data); 
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


 // public methods
 return {	   
	   // Token events
	   publishUserTokenConfirmed 		: publishUserTokenConfirmed,
	   onUserTokenConfirmed				: onUserTokenConfirmed,
	   publishUserTokenFailed			: publishUserTokenFailed,
	   onUserTokenFailed				: onUserTokenFailed,
	   // Register events
	   publishUserRegisterConfirmed 	: publishUserRegisterConfirmed,
	   onUserRegisterConfirmed			: onUserRegisterConfirmed,
	   publishUserRegisterFailed		: publishUserRegisterFailed,
	   onUserRegisterFailed				: onUserRegisterFailed,
	   // Login events
	   publishUserLoginConfirmed		: publishUserLoginConfirmed,
	   onUserLoginConfirmed				: onUserLoginConfirmed,
	   publishUserLoginFailed			: publishUserLoginFailed,
	   onUserLoginFailed				: onUserLoginFailed,
	   // Logout events
	   publishUserLogoutConfirmed 		: publishUserLogoutConfirmed,
	   onUserLogoutConfirmed			: onUserLogoutConfirmed,
	   publishUserLogoutFailed			: publishUserLogoutFailed,
	   onUserLogoutFailed				: onUserLogoutFailed
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
UserResourceModules.service('UserResource', [ 'drupalApiConfig', 'UserResourceConfig', 'UserResourceChannel', '$http', '$q', 
                            function(drupalApiConfig,   UserResourceConfig,   UserResourceChannel,   $http,   $q) {
	

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
		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + UserResourceConfig.resourcePath + '/'+uid,
		defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : retrievePath
		};
	
	if(!uid) { defer.reject(['Param uid is required.']); }
	else {
		$http(requestConfig)
		.success(function(data, status, headers, config){
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			defer.reject(data);
		});
	}
	return defer.promise;
	};
	
	/*
	 * create
	 * 
	 * Retrieve a user
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
		return;
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
		return;
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
		return;
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
	 * @param 	{Array} parameters Parameters, required:false, source:param
	 * @param 	{Integer} pagesize Number of records to get per page., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function( page, fields, parameters, pagesize ) {
		return;
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
					
		var pathToLogin = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.login;
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
		 var pathToLogout = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.logout;
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
         pathToToken = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.token;

	     $http({
	       url: pathToToken,
	       method: 'POST',
	       withCredentials: true
	     })
         .success(function (data) {
        	 console.log(data); 
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
		return;
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
		
		 var pathToRegister = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.register;
	 	 	 requestConfig = {
	 			method: 'POST',
				url : pathToRegister,
				headers: {
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data : {
					name : account.username,
					pass : account.password,
					mail : account.email
				}
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
	 * Url: http://drupal_instance/api_endpoint/user/cancel/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The user object, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var cancel = function(name) {
		return;
	};
		
	/*
	 * password_reset
	 * 
	 * NOTE the docs in services definitions is not uop to date 
	 * 
	 * resets the password
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/password_reset/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The id of the user whose password to reset., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var password_reset = function(uid) {
		return;
	};
		
	/*
	 * resend_welcome_email
	 * 
	 * NOTE the docs in services definitions is not uop to date 
	 * 
	 * resets the password
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user/resend_welcome_email/{UID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} uid The id of the user whose welcome email to resend., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var resend_welcome_email = function(uid) {
		return;
	};

	//public methods	
	return {
		retrieve : retrieve,
		//create : create,
		//update : update,
		//_delete : _delete,
		index : index,
		login : login,
		logout : logout,
		token : token,
		//request_new_password : request_new_password,
		register : register,
		//cancel : cancel,
		//password_reset : password_reset,
		//resend_welcome_email : resend_welcome_email,
	};
	
}]);