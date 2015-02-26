/* Drupals api depending services*/
//______________________________________________
var drupalApiService = angular.module('common.drupal.api-services', ['ngCookies']);

/*localStorage helper*/
drupalApiService.factory('$localstorage', ['$window', function ($window) {
    return {
      setItem: function (key, value) {
        $window.localStorage[key] = value;
      },
      getItem: function (key, emptyValue) {
        emptyValue = (emptyValue) ? emptyValue : undefined;
        return $window.localStorage[key] || emptyValue;
      },
      removeItem: function (key) {
        delete $window.localStorage[key];
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, emptyValue) {
        emptyValue = (emptyValue) ? emptyValue : '{}';
        if(!$window.localStorage[key]) { return emptyValue; }
        return JSON.parse($window.localStorage[key] || emptyValue);
      },
      removeObject: function (key) {
        delete $window.localStorage[key];
      },
      clearAll: function (key) {
        delete $window.localStorage[key];
        $window.localStorage = [];
      },
    }
  }])


/* Constants for drupalApiService */
drupalApiService.constant("drupalApiServiceConfig", {
   //					   
   // Drupal depending settings
   //
	
	  // Your sites domain
	  drupal_instance	: 'http://www.hladky.at/headless/',
	 
	  // Your service endpoints
	 
	  api_endpoints		:  {
		  // Endpoint api/v1/
		  // Machine-readable name of the endpoint
		  api_v1 : {
			  path: 'api/v1/',
			  // Resources of your endpoint
			  // Resources: defualt or alias
			  // NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/api/resources change value here
			  defaut_resources	: { 
				  //comment 				: 'comment/', 	
				  //file					: 'file/', 	
				  node	 				: 'node',
				  system				: 'system/',
				  //taxonomy_term	 		: 'taxonomy_term/',	
				  //taxonomy_vocabulary 	: 'taxonomy_vocabulary/', 	
				  user 					: 'user/',	
				  views 				: 'views/', 					
			  },
			  //resources enabled through a custom drupal module
			  custom_resources	: { 
				  customResource 	: 'customResource',
			  },
			  // available formats of your service
			  // drupal settings under [your.domain.org]/admin/structure/services/list/api/resources/[]
			  formats : {
				  json 	: '.json',
				  xml 	: '.xml'
			  }
		  },
		  // other endpoint [path/to/endpoint]
	  },
	

	//
	// Constants for drupalApiNotificationChannel
	//
	// Node resource
	//
	// Actions:
	// Retrieve action
	node_retrieveConfirmed	: 'event:drupal-node-retrieveConfirmed',
	node_retrieveFailed  	: 'event:drupal-node-retrieveFailed',
	
	// System resource
	//
	// Actions:
	// Connect action
	system_connectConfirmed	: 'event:drupal-system-connectConfirmed',
	system_connectFailed  	: 'event:drupal-system-connectFailed',

	// User resource
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
	
	// Views resource
	//
	// Actions:
	// Retrieve action
	views_retrieveConfirmed	: 'event:drupal-views-retrieveConfirmed',
	views_retrieveFailed  	: 'event:drupal-views-retrieveFailed',

});

/*Notification service for spi events*/
//http://codingsmackdown.tv/blog/2013/04/29/hailing-all-frequencies-communicating-in-angularjs-with-the-pubsub-design-pattern/
drupalApiService.factory('drupalApiNotificationChannel', ['$rootScope', 'drupalApiServiceConfig', 
                                                 function ($rootScope,   drupalApiServiceConfig) {
   
	//
	// Node resource
	//
	
	// Retrieve Action
	
	// Publish node retrieve confirmed event
    var publishNodeRetrieveConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_retrieveConfirmed, {node: node});
    };
    // Subscribe to node retrieve confirmed event
    var onNodeRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_retrieveConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node retrieve failed event
    var publishNodeRetrieveFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_retrieveFailed, {error: error});
    };
    // Subscribe to node retrieve failed event
    var onNodeRetrieveFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
	
	//
	// System resource
	//
	
	// Connect Action
	
	// Publish system connect confirmed event
    var publishSystemConnectConfirmed = function (user) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_connectConfirmed, {user: user});
    };
    // Subscribe to system connect confirmed event
    var onSystemConnectConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_connectConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
    
    // Publish system connect failed event
    var publishSystemConnectFailed = function (response) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_connectConfirmed, {error: error});
    };
    // Subscribe to system connect failed event
    var onSystemConnectFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_connectConfirmed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //
	// User resource
	//
    
    // Token action

	// Publish user token confirmed event
    var publishUserTokenConfirmed = function (respons) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_registerConfirmed, {token: token});
    };
    // Subscribe to user token confirmed event
    var onUserTokenConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_registerConfirmed, function(event, args) {
	    handler(args.token);
	   });	
    };
    
    // Publish user token failed event
    var publishUserTokenFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_registerFailed, {error: error});
    };
    // Subscribe to user token failed event
    var onUserTokenFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_registerFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Register action

	// Publish user register confirmed event
    var publishUserRegisterConfirmed = function (respons) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_registerConfirmed, {respons: respons});
    };
    // Subscribe to user register confirmed event
    var onUserRegisterConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_registerConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user register failed event
    var publishUserRegisterFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_registerFailed, {error: error});
    };
    // Subscribe to user register failed event
    var onUserRegisterFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_registerFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Login action
    
	// Publish user login confirmed event
    var publishUserLoginConfirmed = function (user) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_loginConfirmed, {user: user});
    };
    // Subscribe to user login confirmed event
    var onUserLoginConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_loginConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLoginFailed = function (respons) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_loginFailed, {error: error});
    };
    // Subscribe to user login failed event
    var onUserLoginFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_loginFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //Logout action
    
	// Publish user login confirmed event
    var publishUserLogoutConfirmed = function (user) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_logoutConfirmed, {user: user});
    };
    // Subscribe to user login confirmed event
    var onUserLogoutConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_logoutConfirmed, function(event, args) {
	    handler(args.user);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLogoutFailed = function (respons) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_logoutFailed, {error: error});
    };
    // Subscribe to user login failed event
    var onUserLogoutFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_logoutFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //
	// Views resource
	//
	
	// Retrieve Action
	
	// Publish views retrieve confirmed event
    var publishViewsRetrieveConfirmed = function (viewData) {
        $rootScope.$broadcast(drupalApiServiceConfig.views_retrieveConfirmed, {viewData: viewData});
    };
    // Subscribe to views retrieve confirmed event
    var onViewsRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.views_retrieveConfirmed, function(event, args) {
	    handler(args.viewData);
	   });	
    };
    
	// Publish views retrieve failed event
    var publishViewsRetrieveFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.views_retrieveFailed, {error: error});
    };
    // Subscribe to views retrieve failed event
    var onViewsRetrieveFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.views_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
        
   // Return the publicly accessible methods
   return {
	   //Node events
	   //Retrieve event
	   publishNodeRetrieveConfirmed		: publishNodeRetrieveConfirmed,
	   onNodeRetrieveConfirmed			: onNodeRetrieveConfirmed,
	   publishNodeRetrieveFailed		: publishNodeRetrieveFailed,
	   onNodeRetrieveFailed 			: onNodeRetrieveFailed,
	   
	   // System events
	   // Connect events
	   publishSystemConnectConfirmed 	: publishSystemConnectConfirmed,
	   onSystemConnectConfirmed			: onSystemConnectConfirmed,
	   publishSystemConnectFailed 		: publishSystemConnectFailed,
	   onSystemConnectFailed 			: onSystemConnectFailed,
	  
	   // User events
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
	   onUserLogoutConfirmed				: onUserLogoutConfirmed,
	   publishUserLogoutFailed			: publishUserLogoutFailed,
	   onUserLogoutFailed				: onUserLogoutFailed,
	   
	   //Views events
	   //Retrieve event
	   publishViewsRetrieveConfirmed 	: publishViewsRetrieveConfirmed,
	   onViewsRetrieveConfirmed 		: onViewsRetrieveConfirmed,
	   publishViewsRetrieveFailed		: publishViewsRetrieveFailed,
	   onViewsRetrieveFailed			: onViewsRetrieveFailed,
   	};
}]);

/**
* Drupal services module
*/
var drupalAPI = angular.module('drupalApi', []);


/**
 * AuthenticationService
 * 
 * groups actions for auth (headers ... )
 * 
 */
drupalAPI.factory('DrupalAuthenticationService', function($rootScope, $http, $q, drupalApiServiceConfig, drupalApiNotificationChannel, $localstorage, $cookieStore) {
	 //needed to use the $on method in the bleNotoficationChannel
	//http://stackoverflow.com/questions/16477123/how-do-i-use-on-in-a-service-in-angular
	var scope = $rootScope.$new(); // or $new(true) if you want an isolate scope
	
	
	var initToken = function () {
		var token = $localstorage.getItem('token') || '';
		
		if (token) {
			$http.defaults.headers.common.Authorization = token;
			$http.defaults.headers.post['X-CSRF-TOKEN'] = token;
		}
	}
	
	var storeAuthData = function (data, password) {
	
		$localstorage.setItem('uid', data.user.uid);
		$localstorage.setObject('user', data.user);
		$localstorage.setItem('username', data.user.name);
		$localstorage.setItem('password', password);
		$localstorage.setItem('token', data.token);
		$localstorage.setItem('sessid', data.sessid);
		$localstorage.setItem('session_name', data.session_name);
		//store session cookies
		$cookieStore.put(data.session_name, data.sessid);
		//@TODO replace this with custom directive for hide show menu itme over acl
		$rootScope.isAuthed = true;
	};
	
	var deleteAuthData = function (data, password) {
		//delete token
		//@TODO check if this is needed
		delete $http.defaults.headers.common.Authorization;
		//delete session cookies
		$cookieStore.remove($localstorage.getItem('session_name'));
		//delete local storage data
		$localstorage.removeItem('uid');
		$localstorage.removeObject('user');
		$localstorage.removeItem('username');
		$localstorage.removeItem('password');
		$localstorage.removeItem('token');
		$localstorage.removeItem('sessid');
		$localstorage.removeItem('session_name');
		//@TODO replace this with custom directive for hide show menu itme over acl
		$rootScope.isAuthed = false;
	};
	
	//public methods
	return {
		initToken 		: initToken,
		storeAuthData 	: storeAuthData,
		deleteAuthData 	: deleteAuthData,
	}
})
.run(
function($rootScope, SystemResource, DrupalAuthenticationService, drupalApiNotificationChannel, $http) {
	console.log('AuthenticationService run'); 	
	
	//on token request confirmed
	var onUserTokenConfirmedHandler = function(data) { 
      $localstorage.setItem('token', data.token);
	  $http.defaults.headers.common.Authorization = data.token;
	  $http.defaults.headers.post['X-CSRF-TOKEN'] = data.token;
	};
	drupalApiNotificationChannel.onUserTokenConfirmed($rootScope, onUserTokenConfirmedHandler);
	
	//on register request confirmed
	var onUserRegisterConfirmedHandler = function(data) {
		console.log(data); 
	};
	
	drupalApiNotificationChannel.onUserRegisterConfirmed($rootScope, onUserRegisterConfirmedHandler);
	
	//on login request confirmed
	var onUserLoginConfirmedHandler = function(data) {
		$http.defaults.headers.common.Authorization = data.token;
		$http.defaults.headers.post['X-CSRF-TOKEN'] = data.token;
		$http.defaults.withCredentials = true;
		DrupalAuthenticationService.storeAuthData(data);
	};
	drupalApiNotificationChannel.onUserLoginConfirmed($rootScope, onUserLoginConfirmedHandler);
	
	//on logout request confirmed
	var onUserLogoutConfirmedHandler = function(data) {
		DrupalAuthenticationService.deleteAuthData();
	};
	drupalApiNotificationChannel.onUserLogoutConfirmed($rootScope, onUserLogoutConfirmedHandler);
	
	DrupalAuthenticationService.initToken();
	
	SystemResource.connect().then(
            function (data) {
              var user_id = data.user.uid;
              if (user_id == 0) {
                $rootScope.isAuthed = false;
              }
              else {
              	 $rootScope.isAuthed = true;
              }

    });
});

/**
 * Session
 * 
 */
 drupalAPI.factory('SessionResource', function($http, $q, drupalApiServiceConfig, drupalApiNotificationChannel) {
		
		/*
		 * 
		 * Token
		 * 
		 * Drupal CORS settings: 
		 * "services/session/token|<mirror>|POST, GET|Content-Type,Authorization,X-CSRF-TOKEN|true
		*/
		var token = function(nid){

			var tokenPath = drupalApiServiceConfig.drupal_instance + 'services/session/token',
				defer = $q.defer(),
				requestConfig = {
					method :'GET',
					url : tokenPath,
	                withCredentials: true
				};
			
			$http(requestConfig)
			.success(function(data, status, headers, config){
				defer.resolve(data);
			})
			.error(function(data, status, headers, config){
				defer.reject(data);
			});
	
			return defer.promise;

		};

		//public methods	
		return {
			token : token,
		};
});


/**
 * NodeResource
 * 
 * This service mirrors the Drupal node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * @TODO check
 * your_api_endpoint/node/*|<mirror>|POST|Content-Type
 * 
**/
drupalAPI.factory('NodeResource', function($http, $q, drupalApiServiceConfig, drupalApiNotificationChannel) {
	
	/*
	 * getPreparedIndexParams
	 * */
	var getPreparedIndexParams = function(page, fields, parameters, pagesize) {
		
		var preparedIndexParams = '',
			colon = '&';
		
		//Prepare page param
		page = (page)?page:false;
		if(page !== false) { page = (parseInt(page) != NaN)?parseInt(page):false; }
		if(page !== false) { preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?colon:'') +  "page="+page; }
		
		
		//Prepare fields param
		fields = (fields)?fields:false;
		if(fields !== false) {
			//parse array
			//@TODO parse array to get params or set false
		}
		if(fields !== false) { 
			preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?colon:'') + fields;
		}
		
		//Prepare parameters param
		parameters = (parameters)?parameters:false;
		if(parameters !== false) {
			//parse array
			//@TODO parse array to get params or set false
		}
		if(parameters !== false) { 
			preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?colon:'') + parameters;
		}
		
		//Prepare pagesize param
		pagesize = (pagesize)?pagesize:false;
		if(pagesize !== false) { pagesize = (parseInt(pagesize) != NaN)?parseInt(pagesize):false; }
		if(pagesize !== false) { preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?colon:'') +  "pagesize="+pagesize; }
		
		return preparedIndexParams;
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
	 * useage: NodeResource.retrieve().success(yourSuccessCallback).error(yourErrorCallback);
	 */
	var retrieve = function(nid){

		var retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + (nid?'/'+nid:''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath,
			};
		
		if(!nid) { defer.reject(['Param nid is required.']); }
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
	 *@TODO find link to drupal docs of possible values 
	 * @param {Array} fields The fields to get., defaults to 0., required:false, source:param
	 *@TODO find link to drupal docs of possible values 
	 * @param {Array} parameters Parameters array, required:false, source:param
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: NodeResource.index().success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var index = function(page, fields, parameters, pagesize) {
		
		var IndexParams = getPreparedIndexParams(page, fields, parameters, pagesize),
			retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + (IndexParams?'?'+IndexParams:''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath,
			};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			defer.reject(data);
		});
		
		return defer.promise;

	};

	//public methods	
	return {
		retrieve : retrieve,
		index	 : index
	};

});

/**
 * SystemResource
 * 
 * This service mirrors the Drupal system resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/system/*|<mirror>|POST|Content-Type,Authorization|true
 * 
**/
drupalAPI.factory('SystemResource', function($http, $q, drupalApiServiceConfig, UserResource) {
	
	/*
	 * connect
	 * 
	 * Returns the details of currently logged in user.
	 * 
	 * Method: POST 
	 * Url: http://drupal_instance/api_endpoint/system/connect
	 * Headers: Content-Type:application/json
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: SystemResource.connect().success(yourSuccessCallback).error(yourErrorCallback);
	*/
	var connect = function(token){
		var connectPath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.system + 'connect';
		var defer = $q.defer();
		
		$http({
			method :'POST',
			url : connectPath,
			headers : {
				//"Accept" 		: "application/json",
				"Content-Type"	: "application/json",
			}
		})
		.success(function(data, status, headers, config){
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			defer.reject(data);
		});
		
		return defer.promise;

	};
	
	/*
	 * get_variable
	 * 
	 * Returns the value of a system variable using variable_get().
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/system/get_variable
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} name The name of the variable to return, required:true, source:post body
	 * @param 	{String} _default The default value to use if this variable has never been set, required:false, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 *  useage: SystemResource.get_variable().then(yourSuccessCallback,yourErrorCallback);
	 */
	var get_variable = function(name, _default){
		return;
	};
	
	/*
	 * set_variable
	 * 
	 * Returns the value of a system variable using variable_get().
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/system/get_variable
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} name The name of the variable to set, required:true, source:post body
	 * @param 	{String} value The value to set, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 *  useage: SystemResource.set_variable().success(yourSuccessCallback).error(yourErrorCallback);
	 */
	var set_variable = function(name, value){
		return;
	};
	
	/*
	 * del_variable
	 * 
	 * Deletes a system variable using variable_del().
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/system/get_variable
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{String} name The name of the variable to delete, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 *  useage: SystemResource.del_variable().then(yourSuccessCallback,yourErrorCallback);
	 */
	var del_variable = function(name){
		return;
	};

	//public methods	
	return {
		connect : connect,
		//get_variable : get_variable,
		//set_variable : set_variable,
		//del_variable : del_variable
	};

});

/**
 * UserResource
 *
 * This service mirrors the Drupal system resource of the services 3.x module.
 * to use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/user/*|<mirror>|GET, PUT, POST, DELETE|Content-Type,Authorization
 * 
**/
drupalAPI.factory('UserResource', function($http, $q, drupalApiServiceConfig, $localstorage, drupalApiNotificationChannel) {

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
	 * useage: UserResource.retrieve(username, password).then(yourSuccessCallback,yourErrorCallback);
	 */
	var retrieve = function( uid ) {
		return;
	};
	
	/*
	 * create
	 * 
	 * Retrieve a user
	 * Method: POST
	 * Url: http://drupal_instance/api_endpoint/user
	 * Headers: Content-Type:application/json
	 * 
	 * @param 	{Array} uid The user object, required:true, source:post body
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: UserResource.create(uid).then(yourSuccessCallback,yourErrorCallback);
	 */
	var create = function( uid ) {
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
	 * useage: UserResource.update(uid, data).then(yourSuccessCallback,yourErrorCallback);
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
	 * useage: UserResource._delete(uid).then(yourSuccessCallback,yourErrorCallback);
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
	 * useage: UserResource.index(page, fields, parameters, pagesize).then(yourSuccessCallback,yourErrorCallback);
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
	 * 			The revolve functions have a json obj. 
	 * 				obj.sessid {String} The session id of the current authenticated user 
	 * 				obj.session_name  {String} The session id of the current authenticated user 
	 * 				obj.token {String} The X-CSRF-TOKEN @TODO 
	 * 				obj.user: Object The user obj
	 * 			The reject functions have a json obj. 
	 * 
	 * useage: UserResource.login(username, password).then(yourSuccessCallback,yourErrorCallback);
	 */	
	 var login = function( username, password ) {
					
		var pathToLogin = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + 'login';
			requestConfig = {
					method :'POST',
					url : pathToLogin,
					 headers: {
						//@TODO use the format of drupalApiServiceConfig
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
			 //persist token in header
			 $http.defaults.headers.common.Authorization = data.token;
             $http.defaults.headers.post['X-CSRF-TOKEN'] = data.token;
             $http.defaults.withCredentials = true;
                         
			 drupalApiNotificationChannel.publishUserLoginConfirmed(data);
            defer.resolve(data);
         })
         .error(function (data, status, headers, config) {
        	 drupalApiNotificationChannel.publishUserLoginFailed(data);
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
	 * useage: UserResource.logout(username, password).then(yourSuccessCallback,yourErrorCallback);
	 */
	var logout = function() {
		 var pathToLogout = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + 'logout';
		 	 requestConfig = {
		 			method: 'POST',
					url : pathToLogout,
					headers: {
						//@TODO use the format of drupalApiServiceConfig
						"Accept" 		: "application/json",
						"Content-Type"	: "application/json",
					},
					withCredentials: true,
			},
			defer = $q.defer();
		 
		 $http(requestConfig)
         .success(function (data, status, headers, config) {
           drupalApiNotificationChannel.publishUserLogoutConfirmed(data);
           defer.resolve(data);
         })
         .error(function (data, status, headers, config) {
           drupalApiNotificationChannel.publishUserLogoutFailed(data);
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
	 * useage: UserResource.token().then(yourSuccessCallback,yourErrorCallback);
	 */
	var token = function() {
		 var defer = $q.defer(),
         pathToToken = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + 'token';

	     $http({
	       url: pathToToken,
	       method: 'GET',
	       withCredentials: true
	     })
         .success(function (token) {
           drupalApiNotificationChannel.publishUserTokenConfirmed(token);
           defer.resolve(data);
         })
         .error(function (data) {
           drupalApiNotificationChannel.publishUserTokenFailed(data);
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
	 * useage: UserResource.request_new_password(name).then(yourSuccessCallback,yourErrorCallback);
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
	 * useage: UserResource.login(account).then(yourSuccessCallback,yourErrorCallback);
	 */
	var register = function(account){
		
		 var pathToRegister = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api + drupalApiServiceConfig.defaut_resources.register;
	 	 	 requestConfig = {
	 			method: 'POST',
				url : pathToRegister,
				headers: {
					//@TODO use the format of drupalApiServiceConfig
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data : {
					name : username,
					pass : password,
					mail : email
				}
	 	 	  },
	 	 	  defer = $q.defer();
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishUserRegisterConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishUserRegisterFailed(data);
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
	 * useage: UserResource.cancel(name).then(yourSuccessCallback,yourErrorCallback);
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
	 * useage: UserResource.password_reset(uid).then(yourSuccessCallback,yourErrorCallback);
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
	 * useage: UserResource.resend_welcome_email(uid).then(yourSuccessCallback,yourErrorCallback);
	 */
	var resend_welcome_email = function(uid) {
		return;
	};
		
	//public methods	
	return {
		//retrieve : retrieve,
		//create : create,
		//update : update,
		//_delete : _delete,
		//index : index,
		login : login,
		logout : logout,
		token : token,
		//request_new_password : request_new_password,
		register : register,
		//cancel : cancel,
		//password_reset : password_reset,
		//resend_welcome_email : resend_welcome_email,
	};

});

/**
 * ViewsResource
 * 
 * This service mirrors the Drupal views resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * @TODO check
 * your_api_endpoint/views/*|<mirror>|POST|Content-Type
 * 
**/
drupalAPI.factory('ViewsResource', function($http, $q, drupalApiServiceConfig, UserResource) {
	
	/*
	 * Retrieve
	 * 
	 * Retrieves a view.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/views/{VIEW_NAME}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {String} view_name The name of the view to get., required:true, source:path
	 * @param {String} display_id The display ID of the view to get., required:false, source:param
	 * @param {Array} args A list of arguments to pass to the view., required:false, source:param
	 * @param {Integer} offset The number of the entry for the page begin with., required:false, source:param
	 * @param {Integer} limit The total number of entries to list., required:false, source:param
	 * @param {Boolean} format_output Whether to return the raw data results or style the results., required:false, source:param
	 * @param {Array} filters A list of filters to pass to the view. These are defined by the exposed filters on your view. Example call: /views/your_view?filters[nid]=12345, required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: ViewsResource.retrieve().success(yourSuccessCallback).error(yourErrorCallback);
	*/
	var retrieve = function(view_name, display_id, args, offset, limit, format_output, filters){
		
		var retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.views + view_name;
		var defer = $q.defer();
		
		$http({
			method :'POST',
			url : retrievePath,
			headers : {
				"Accept" 		: "application/json",
				"Content-Type"	: "application/json",
			}
		})
		.success(function(data, status, headers, config){
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			defer.reject(data);
		});
		
		return defer.promise;

	};

	//public methods	
	return {
		retrieve : retrieve
	};

});





