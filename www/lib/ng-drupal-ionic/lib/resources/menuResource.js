/**
 * Menu Resource Modules
 */
var MenuResourceModules = angular.module('MenuResourceModules', ['drupal.configurations', 'drupalBaseModules']);

/**
 *  Constants for MenuResourceModules 
 */
MenuResourceModules.constant("MenuResourceConfig", {
   //					   
   // Drupal depending settings
   //
	
	// NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
	resourcePath : 'menu',
	//actions of menu resource
	actions : {
		//retrieve 	: 'retrieve',
	},
	  
	//
	// Constants for MenuResourceChannel
	//
	// Actions:
	//
	// Retrieve action
	menu_retrieveConfirmed		: 'event:drupal-menu-retrieveConfirmed',
	menu_retrieveFailed  		: 'event:drupal-menu-retrieveFailed'
	
});

/*Notification channel for the menu resource */
MenuResourceModules.service('MenuResourceChannel', ['$rootScope', 'MenuResourceConfig',
                                           function ($rootScope,   MenuResourceConfig) {	
	
	// Retrieve Action
	
	// Publish menu retrieve confirmed event
    var publishMenuRetrieveConfirmed = function (menu) {
        $rootScope.$broadcast(MenuResourceConfig.menu_retrieveConfirmed, {menu: menu});
    };
    // Subscribe to menu retrieve confirmed event
    var onMenuRetrieveConfirmed = function($scope, handler) {
    	$scope.$on(MenuResourceConfig.menu_retrieveConfirmed, function(event, args) {
	    handler(args.menu);
	   });	
    };
    
	// Publish menu retrieve failed event
    var publishMenuRetrieveFailed = function (error) {
        $rootScope.$broadcast(MenuResourceConfig.menu_retrieveFailed, {error: error});
    };
    // Subscribe to menu retrieve failed event
    var onMenuRetrieveFailed = function($scope, handler) {
    	$scope.$on(MenuResourceConfig.menu_retrieveFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
   
 // public methods
 return {	   
	   //Retrieve event
	   publishMenuRetrieveConfirmed		: publishMenuRetrieveConfirmed,
	   onMenuRetrieveConfirmed			: onMenuRetrieveConfirmed,
	   publishMenuRetrieveFailed		: publishMenuRetrieveFailed,
	   onMenuRetrieveFailed 			: onMenuRetrieveFailed
 	};
}]);

/**
 * MenuResource
 * 
 * This service mirrors the Drupal menu resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/menu*|<mirror>|POST|Content-Type
 * 
**/
MenuResourceModules.service('MenuResource', [ '$rootScope','drupalApiConfig', 'BaseResource', 'MenuResourceConfig', 'MenuResourceChannel', '$http', '$q', 
                                      function($rootScope,  drupalApiConfig,   BaseResource,   MenuResourceConfig,   MenuResourceChannel,   $http,   $q) {
	
	/*
	 * 
	 * Retrieve
	 * 
	 * Drupal CORS settings: 
	 * "api_endpoint/menu/*|<mirror>|GET|Content-Type"
	 * 
	 * Retrieves a menu
	 * 
	 * Method: GET 
	 * Url: http://dev-drupal-headless-ionic.pantheon.io/api/v1/menu/{MENU_NAME}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} menu_name The name of the menu to get, required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 */
	var retrieve = function(menu_name){

		var retrievePath = drupalApiConfig.drupal_instance + drupalApiConfig.api_endpoint + MenuResourceConfig.resourcePath + '/' + menu_name,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath
			},
			errors = [];
		
		if(!menu_name) { errors.push('Param menu_name is required.'); }
		
		if(errors.length != 0) {
			MenuResourceChannel.publishMenuRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				MenuResourceChannel.publishMenuRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				MenuResourceChannel.publishMenuRetrieveFailed(data);
				defer.reject(data);
		});
	
		return defer.promise;

	};
	
	//public methods	
	return {
		retrieve 	: retrieve,
	};
	
}]);