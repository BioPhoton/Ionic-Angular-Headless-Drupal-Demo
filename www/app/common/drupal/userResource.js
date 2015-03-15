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
	user_retrieveConfirmed  : 'event:drupal-user-retrieveConfirmed',
	user_retrieveFailed  	: 'event:drupal-user-retrieveFailed',
	// Create action
	user_createConfirmed	: 'event:drupal-user-createConfirmed',
	user_createFailed  		: 'event:drupal-user-createFailed',
	// Update action
	user_updateConfirmed	: 'event:drupal-user-updateConfirmed',
	user_updateFailed  		: 'event:drupal-user-updateFailed',
	// Delete action
	user_deleteConfirmed	: 'event:drupal-user-deleteConfirmed',
	user_deleteFailed  		: 'event:drupal-user-deleteFailed',
	// Index action
	user_indexConfirmed  	: 'event:drupal-user-indexConfirmed',
	user_indexFailed  		: 'event:drupal-user-indexFailed',
	
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
    		console.log(args); 
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
	   // Retrieve events
	   publishUserRetrieveConfirmed 	: publishUserRetrieveConfirmed,
	   onUserRetrieveConfirmed			: onUserRetrieveConfirmed,
	   publishUserRetrieveFailed		: publishUserRetrieveFailed,
	   onUserRetrieveFailed				: onUserRetrieveFailed,
	   // Create action
	   publishUserCreateConfirmed		: publishUserCreateConfirmed,
	   onUserCreateConfirmed			: onUserCreateConfirmed,
	   publishUserCreateFailed			: publishUserCreateFailed,
	   onUserCreateFailed 				: onUserCreateFailed,
	   // Update action
	   publishUserUpdateConfirmed		: publishUserUpdateConfirmed,
	   onUserUpdateConfirmed			: onUserUpdateConfirmed,
	   publishUserUpdateFailed			: publishUserUpdateFailed,
	   onUserUpdateFailed 				: onUserUpdateFailed,
	   // Delete action
	   publishUserDeleteConfirmed		: publishUserDeleteConfirmed,
	   onUserDeleteConfirmed			: onUserDeleteConfirmed,
	   publishUserDeleteFailed			: publishUserDeleteFailed,
	   onUserDeleteFailed 				: onUserDeleteFailed,
	   // Index events
	   publishUserIndexConfirmed 		: publishUserIndexConfirmed,
	   onUserIndexConfirmed				: onUserIndexConfirmed,
	   publishUserIndexFailed			: publishUserIndexFailed,
	   onUserIndexFailed				: onUserIndexFailed,
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
	 * getPreparedIndexParams
	 * */
	var getPreparedIndexParams = function(page, fields, parameters, pagesize) {
		
		var preparedIndexParams = [],
			ampersand = '&';
		
		//Prepare page param
		page = (page || page === 0)?page:false;
		if(page !== false) {page = (parseInt(page) != NaN)?parseInt(page):false; }
		if(page !== false && page !== NaN) { 
			page = "page="+page;
			preparedIndexParams += (preparedIndexParams != '')?ampersand+page:page; 
			}
			
		//Prepare pagesize param
		pagesize = (pagesize)?pagesize:false;
		if(pagesize !== false) { pagesize = (parseInt(pagesize) != NaN)?parseInt(pagesize):false; }
		if(pagesize !== false) { 
			pagesize = "pagesize="+pagesize;
			preparedIndexParams += (preparedIndexParams != '')?ampersand+pagesize:pagesize; 
			}
		
		//Prepare fields param
		fields = (fields)?fields:false;
		if(fields !== false) {
			//parse array
			fields = fields.split(',');
			var newFields = [];
			
			angular.forEach(fields, function(value, key) {
			
				if(value.trim() != '') {
					this.push(value.trim()+ (fields.length >= key?'':','));
				}
			},newFields);
			fields = newFields;
		}
		if(fields !== false) { 
			fields = "fields="+fields;
			preparedIndexParams += (preparedIndexParams != '')?ampersand+fields:fields; 
		}
		
		//Prepare parameters param
		parameters = (parameters)?parameters:false;
		if(parameters !== false) {

			parameters = parameters.split(',');
			var newParameters = '',
				param = '';
			angular.forEach(parameters, function(value, key) {
				if(value.trim() != '' ) {
					value = value.split('=');
					if(value[0].trim() != '' && value[1].trim()) {
						param = "parameters['"+value[0].trim() + "']="+ value[1];
						newParameters += (newParameters != '')?ampersand+param:param;
					}
				}
			});
			parameters = newParameters;
		}
		if(parameters !== false) { 
			preparedIndexParams += (preparedIndexParams != '')?ampersand+parameters:parameters; 
		}
		
		return preparedIndexParams;
	};
	
	
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
				account : account
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
	 * uid,name,mail,theme,signature,signature_format,created,access,login,status,timezone,language,picture,init,data
	 * @param 	{Array} parameters Parameters, required:false, source:param
	 * @param 	{Integer} pagesize Number of records to get per page., required:false, source:param
	 * 
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var index = function( page, fields, parameters, pagesize ) {
		var IndexParams = getPreparedIndexParams(page, fields, parameters, pagesize),
		retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + (IndexParams?'?'+IndexParams:''),
		defer = $q.defer(),
		requestConfig = {
			method :'GET',
			url : retrievePath,
		},
		errors = [];
	
	if(errors.length != 0) {
		UserResourceChannel.publishUserIndexFailed(errors);
		defer.reject(errors); 
		return defer.promise;
	};
	
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
         pathToToken = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.token;

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
		
		 var pathToRegister = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + UserResourceConfig.resourcePath + '/' + UserResourceConfig.actions.register;
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