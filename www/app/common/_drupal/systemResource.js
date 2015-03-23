/**
 * System Resource Modules
 */
var SystemResourceModules = angular.module('SystemResourceModules', ['drupal.configurations']);


//@TODO config provider

/**
 *  Constants for SystemResourceModules 
 */
SystemResourceModules.constant("SystemResourceConfig", {
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
	// Constants for SystemResourceChannel
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
SystemResourceModules.service('SystemResourceChannel', ['$rootScope', 'SystemResourceConfig',
                                               function ($rootScope,   SystemResourceConfig) {	
  // Connect Action
  // Publish system connect confirmed event
  var publishSystemConnectConfirmed = function (user) { 
      $rootScope.$broadcast(SystemResourceConfig.system_connectConfirmed, {user: user});
  };
  // Subscribe to system connect confirmed event
  var onSystemConnectConfirmed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_connectConfirmed, function(event, args) {
  		handler(args.user);
	   });	
  };
  
  // Publish system connect failed event
  var publishSystemConnectFailed = function (error) {
	  $rootScope.$broadcast(SystemResourceConfig.system_connectFailed, {error: error});
  };
  // Subscribe to system connect failed event
  var onSystemConnectFailed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_connectFailed, function(event, args) {
  		handler(args.error);
	   });	
  };
  
  // Get Variable Action
  // Publish system get variable confirmed event
  var publishSystemGetVariableConfirmed = function (variable) {
      $rootScope.$broadcast(SystemResourceConfig.system_getVariableConfirmed, {variable: variable});
  };
  // Subscribe to system get variable confirmed event
  var onSystemGetVariableConfirmed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_getVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system get variable failed event
  var publishSystemGetVariableFailed = function (error) {
      $rootScope.$broadcast(SystemResourceConfig.system_getVariableFailed, {error: error});
  };
  // Subscribe to system get variable failed event
  var onSystemGetVariableFailed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_getVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };
  
  // Set Variable Action
	
	// Publish system set variable confirmed event
  var publishSystemSetVariableConfirmed = function (variable) {
      $rootScope.$broadcast(SystemResourceConfig.system_setVariableConfirmed, {variable: variable});
  };
  // Subscribe to system connect set variable event
  var onSystemSetVariableConfirmed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_setVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system set variable failed event
  var publishSystemSetVariableFailed = function (error) {
      $rootScope.$broadcast(SystemResourceConfig.system_setVariableFailed, {error: error});
  };
  // Subscribe to system set variable failed event
  var onSystemSetVariableFailed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_setVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };
  
  // Del Variable Action
	
	// Publish system del variable confirmed event
  var publishSystemDelVariableConfirmed = function (variable) {
      $rootScope.$broadcast(SystemResourceConfig.system_delVariableConfirmed, {variable: variable});
  };
  // Subscribe to system connect set variable event
  var onSystemDelVariableConfirmed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_delVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
  };
  
  // Publish system del variable failed event
  var publishSystemDelVariableFailed = function (error) {
      $rootScope.$broadcast(SystemResourceConfig.system_delVariableFailed, {error: error});
  };
  // Subscribe to system set variable failed event
  var onSystemDelVariableFailed = function($scope, handler) {
  	$scope.$on(SystemResourceConfig.system_delVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
  };

 // public methods
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
SystemResourceModules.service('SystemResource', [ 'drupalApiConfig', 'SystemResourceConfig', 'SystemResourceChannel', '$http', '$q', 
                              function(drupalApiConfig,   SystemResourceConfig,   SystemResourceChannel,   $http,   $q) {
	
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
	var connect = function() {
		
		var connectPath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + SystemResourceConfig.resourcePath + '/' + SystemResourceConfig.actions.connect,
		defer = $q.defer(),
		requestConfig = {
				method :'POST',
				url : connectPath,
				headers : {
					"Content-Type"	: "application/json",
				}
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			SystemResourceChannel.publishSystemConnectConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			SystemResourceChannel.publishSystemConnectFailed(data);
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
		
		var getVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + SystemResourceConfig.resourcePath + '/' + SystemResourceConfig.actions.get_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: getVariablePath,
				headers : {
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
			SystemResourceChannel.publishSystemGetVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(value, status, headers, config){
			SystemResourceChannel.publishSystemGetVariableConfirmed(value);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			SystemResourceChannel.publishSystemGetVariableFailed(data);
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
		var setVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + SystemResourceConfig.resourcePath + '/' + SystemResourceConfig.actions.set_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: setVariablePath,
				headers : {
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
			SystemResourceChannel.publishSystemSetVariableFailed({data: errors});
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			SystemResourceChannel.publishSystemSetVariableConfirmed({name: name, value: value});
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			SystemResourceChannel.publishSystemSetVariableFailed({name: name, value: value});
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
		var delVariablePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + SystemResourceConfig.resourcePath + '/' + SystemResourceConfig.actions.del_variable,
		defer = $q.defer(),
		requestConfig = {
				method 	:'POST',
				url 	: delVariablePath,
				headers : {
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
			SystemResourceChannel.publishSystemDelVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			SystemResourceChannel.publishSystemDelVariableConfirmed(name);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			SystemResourceChannel.publishSystemDelVariableFailed(data);
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