/**
 * 
 */
var drupalApiService = angular.module('systemRecourceModules', ['drupal.configurations']);


/* Constants for drupalApiService */
drupalApiService.constant("systemResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'system',
	//actions of system resource
	actions : {
		connect 	 : 'connect',
		get_variable : 'get_variable',
		set_variable : 'set_variable',
		del_variable : 'del_variable',
	},
	  
	//
	// Constants for systemResourceChannel
	//
  	// System resource
	//
	// Actions:
	// Connect action
	system_connectConfirmed	: 'event:drupal-system-connectConfirmed',
	system_connectFailed  	: 'event:drupal-system-connectFailed',
	// Get variable action
	system_getVariableConfirmed	: 'event:drupal-system-getVariableConfirmed',
	system_getVariableFailed  	: 'event:drupal-system-getVariableFailed',
	// Set variable action
	system_setVariableConfirmed	: 'event:drupal-system-setVariableConfirmed',
	system_setVariableFailed  	: 'event:drupal-system-setVariableFailed',
	// Del variable action
	system_delVariableConfirmed	: 'event:drupal-system-delVariableConfirmed',
	system_delVariableFailed  	: 'event:drupal-system-delVariableFailed',
	
});

/*Notification channel for asystem resource */
drupalApiService.service('systemResourceChannel', ['$rootScope', 'systemResourceConfig', 'drupalApiConfig',
                                          function ($rootScope,   systemResourceConfig,   drupalApiConfig) {	
  // Connect Action
  // Publish system connect confirmed event
  var publishSystemConnectConfirmed = function (user) {
      $rootScope.$broadcast(drupalApiConfig.system_connectConfirmed, {user: user});
  };
  // Subscribe to system connect confirmed event
  var onSystemConnectConfirmed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_connectConfirmed, function(event, args) {
	    handler(args.user);
	   });	
  };
  
  // Publish system connect failed event
  var publishSystemConnectFailed = function (error) {
      $rootScope.$broadcast(drupalApiConfig.system_connectFailed, {error: error});
  };
  // Subscribe to system connect failed event
  var onSystemConnectFailed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_connectFailed, function(event, args) {
	    handler(args.error);
	   });	
  };
  
  // Get Variable Action
  // Publish system get variable confirmed event
  var publishSystemGetVariableConfirmed = function (variable) {
      $rootScope.$broadcast(drupalApiConfig.system_getVariableConfirmed, {variable: variable});
  };
  // Subscribe to system get variable confirmed event
  var onSystemGetVariableConfirmed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_getVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system get variable failed event
  var publishSystemGetVariableFailed = function (error) {
      $rootScope.$broadcast(drupalApiConfig.system_getVariableFailed, {error: error});
  };
  // Subscribe to system get variable failed event
  var onSystemGetVariableFailed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_getVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };
  
  // Set Variable Action
	
	// Publish system set variable confirmed event
  var publishSystemSetVariableConfirmed = function (variable) {
      $rootScope.$broadcast(drupalApiConfig.system_setVariableConfirmed, {variable: variable});
  };
  // Subscribe to system connect set variable event
  var onSystemSetVariableConfirmed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_setVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system set variable failed event
  var publishSystemSetVariableFailed = function (error) {
      $rootScope.$broadcast(drupalApiConfig.system_setVariableFailed, {error: error});
  };
  // Subscribe to system set variable failed event
  var onSystemSetVariableFailed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_setVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };
  
  // Del Variable Action
	
	// Publish system del variable confirmed event
  var publishSystemDelVariableConfirmed = function (variable) {
      $rootScope.$broadcast(drupalApiConfig.system_delVariableConfirmed, {variable: variable});
  };
  // Subscribe to system connect set variable event
  var onSystemDelVariableConfirmed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_delVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system del variable failed event
  var publishSystemDelVariableFailed = function (error) {
      $rootScope.$broadcast(drupalApiConfig.system_delVariableFailed, {error: error});
  };
  // Subscribe to system set variable failed event
  var onSystemDelVariableFailed = function($scope, handler) {
  	$scope.$on(drupalApiConfig.system_delVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };

 // Return the publicly accessible methods
 return {	   
	   // System events
	   // Connect events
	   publishSystemConnectConfirmed 		: publishSystemConnectConfirmed,
	   onSystemConnectConfirmed				: onSystemConnectConfirmed,
	   publishSystemConnectFailed 			: publishSystemConnectFailed,
	   onSystemConnectFailed 				: onSystemConnectFailed,
	   // Get varaible events
	   publishSystemGetVariableConfirmed 	: publishSystemGetVariableConfirmed,
	   onSystemGetVariableConfirmed			: onSystemGetVariableConfirmed,
	   publishSystemGetVariableFailed 		: publishSystemGetVariableFailed,
	   onSystemGetVariableFailed 			: onSystemGetVariableFailed,
	   // Set varaible events
	   publishSystemSetVariableConfirmed 	: publishSystemSetVariableConfirmed,
	   onSystemSetVariableConfirmed			: onSystemSetVariableConfirmed,
	   publishSystemSetVariableFailed 		: publishSystemSetVariableFailed,
	   onSystemSetVariableFailed 			: onSystemSetVariableFailed,
	   // Del varaible events
	   publishSystemDelVariableConfirmed 	: publishSystemDelVariableConfirmed,
	   onSystemDelVariableConfirmed			: onSystemDelVariableConfirmed,
	   publishSystemDelVariableFailed 		: publishSystemDelVariableFailed,
	   onSystemDelVariableFailed 			: onSystemDelVariableFailed,
 	};
}]);

/**
 * SystemResource
 * 
 * This service mirrors the Drupal system resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/system/*|<mirror>|POST|Content-Type,Authorization|true
 * 
**/
drupalAPI.service('SystemResource', [ 'drupalApiConfig', 'systemResourceConfig', 'systemResourceChannel', '$http', '$q', 
                              function(drupalApiConfig,   systemResourceConfig,   systemResourceChannel,   $http,   $q) {
	
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
	*/
	var connect = function(token) {
		
		var connectPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + systemResourceConfig.resourcePath + '/' + systemResourceConfig.actions.connect,
		defer = $q.defer(),
		requestConfig = {
				method :'POST',
				url : connectPath,
				headers : {
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				}
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			systemResourceChannel.publishSystemConnectConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			systemResourceChannel.publishSystemConnectFailed(data);
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
	 */
	var get_variable = function(name, _default){
		
		var getVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + systemResourceConfig.resourcePath + '/' + systemResourceConfig.actions.get_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: getVariablePath,
				headers : {
					"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data 	: {
					name : name
				}
		},
		errors = [];
		
		if(!name) { 
			errors.push('Param name is required.');
		}
		
		if(errors.length != 0) {
			systemResourceChannel.publishSystemGetVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(value, status, headers, config){
			systemResourceChannel.publishSystemGetVariableConfirmed(value);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			systemResourceChannel.publishSystemGetVariableFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
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
	 */
	var set_variable = function(name, value){
		var setVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + systemResourceConfig.resourcePath + '/' + systemResourceConfig.actions.set_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: setVariablePath,
				headers : {
					//"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data 	: {
					name 	: name,
					value 	: value
				}
		},
		errors = [];

		if(!value) { errors.push('Param value is required.');}
		if(!name) { errors.push('Param name is required.'); }
		
		if(errors.length != 0) {
			systemResourceChannel.publishSystemSetVariableFailed({data: errors});
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			systemResourceChannel.publishSystemSetVariableConfirmed({name: name, value: value});
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			systemResourceChannel.publishSystemSetVariableFailed({name: name, value: value});
			defer.reject(data);
		});
		
		return defer.promise;
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
	 */
	var del_variable = function(name){
		var delVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoints.default.path + systemResourceConfig.resourcePath + '/' + systemResourceConfig.actions.del_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: delVariablePath,
				headers : {
					//"Accept" 		: "application/json",
					"Content-Type"	: "application/json",
				},
				data 	: {
					name : name
				}
		},
		errors = [];
		
		if(!name) { 
			errors.push('Param name is required.');
		}
		
		if(errors.length != 0) {
			systemResourceChannel.publishSystemDelVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			systemResourceChannel.publishSystemDelVariableConfirmed(name);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			systemResourceChannel.publishSystemDelVariableFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;
	};

	//public methods	
	return {
		connect 		: connect,
		get_variable 	: get_variable,
		set_variable 	: set_variable,
		del_variable 	: del_variable
	};

}]);