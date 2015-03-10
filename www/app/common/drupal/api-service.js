
//______________________________________________
var drupalApiService = angular.module('common.drupal.api-services', ['ipCookie']);
//@TODO mace servise configurable
drupalApiService.provider('drupalApiServiceConfiguration', function () {
    // default values
    var defaults = {
    	// Your sites domain
    	drupal_instance	: 'http://dev-drupal-headless-ionic.pantheon.io/',
    };
    return {
      set: function (constants) {
        angular.extend(defaults, constants);
      },
      $get: function () { 
        return defaults;
      }
    };
});

/* Constants for drupalApiService */
drupalApiService.constant("drupalApiServiceConfig", {
   //					   
   // Drupal depending settings
   //
	
	  // Your sites domain
	  drupal_instance	: 'http://dev-drupal-headless-ionic.pantheon.io/',
	 
	  // By default, Drupal ships with a session expiration time of 2000000 seconds which is 23 day 3 hr. 33 min. 20 sec
	  // To customize this install the session expire module => https://www.drupal.org/project/session_expire
	  // and also set same value here
	  session_expiration_time : 10000, //2000000,
	  
	  // Your service endpoints  
	  api_endpoints		:  {
		  // Endpoint api/v1/
		  // Machine-readable name of the endpoint
		  api_v1 : {
			  path: 'api/v1/',
			  // Resources of your endpoint
			  // Resources: defualt or alias
			  // NOTE: if you set custom aliases for your recources in [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/resources change value here
			  defaut_resources	: { 
				  //comment 			: 'comment', 	
				  //file				: 'file', 	
				  node	 				: 'node',
				  system				: 'system',
				  //taxonomy_term	 	: 'taxonomy_term',	
				  //taxonomy_vocabulary : 'taxonomy_vocabulary', 	
				  user 					: 'user',	
				  views 				: 'views', 					
			  },
			  //resources enabled through a custom drupal module
			  custom_resources	: { 
				  customResource 	: 'customResource',
			  },
			  // available formats of your service
			  // drupal settings under [your.domain.org]/admin/structure/services/list/[machinereadable_name_of_endpoint]/server
			  formats : {
				  json 	: '.json',
				  xml 	: '.xml'
			  }
		  },
		  // other endpoint [path/to/endpoint]
	  },
	 //the drupals guest user obj
	 anonymousUser : {"uid":0,"hostname":"2a02:8388:15c0:ce80:11d3:d8c2:7c96:cf29","roles":{"1":"anonymous user"},"cache":0,"timestamp":1425233400},
	  
	//
	// Constants for drupalApiNotificationChannel
	//
  
	// Session resource
	//
	// Actions:
	// Token action
	session_tokenConfirmed	: 'event:drupal-session-TokenConfirmed',
	session_tokenFailed		: 'event:drupal-session-TokenFailed',
	  
	// Comment resource
	//
	// Actions:
	//@TODO
	
	// File resource
	//
	// Actions:	
	//@TODO
	
	// Node resource
	//
	// Actions:
	// Retrieve action
	node_retrieveConfirmed	: 'event:drupal-node-retrieveConfirmed',
	node_retrieveFailed  	: 'event:drupal-node-retrieveFailed',
	// Create action
	node_createConfirmed	: 'event:drupal-node-createConfirmed',
	node_createFailed  		: 'event:drupal-node-createFailed',
	// Update action
	node_updateConfirmed	: 'event:drupal-node-updateConfirmed',
	node_updateFailed  		: 'event:drupal-node-updateFailed',
	// Delete action
	node_deleteConfirmed	: 'event:drupal-node-deleteConfirmed',
	node_deleteFailed  		: 'event:drupal-node-deleteFailed',
	// Index action
	node_indexConfirmed		: 'event:drupal-node-indexConfirmed',
	node_indexFailed  		: 'event:drupal-node-indexFailed',
	// Files action
	node_filesConfirmed		: 'event:drupal-node-filesConfirmed',
	node_filesFailed  		: 'event:drupal-node-filesFailed',
	// Comments action
	node_commentsConfirmed	: 'event:drupal-node-commentsConfirmed',
	node_commentsFailed  	: 'event:drupal-node-commentsFailed',
	// Attach file action
	node_attachFileConfirmed	: 'event:drupal-node-attachFileConfirmed',
	node_attachFileFailed  		: 'event:drupal-node-attachFileFailed',
	
	
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

	// Taxonomy term resource
	//
	// Actions:
	//@TODO
	
	// Taxonomy vocabulary resource
	//
	// Actions:
	//@TODO
	
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
	
	//DrupalAuthenticationService 
	authService_connectionStateUpdated  : 'event:drupal-authService-connectionStateUpdated',
	authService_currentUserUpdated		: 'event:drupal-authService-currentUserUpdated',

});

/*Notification service for spi events*/
//http://codingsmackdown.tv/blog/2013/04/29/hailing-all-frequencies-communicating-in-angularjs-with-the-pubsub-design-pattern/
drupalApiService.service('drupalApiNotificationChannel', ['$rootScope', 'drupalApiServiceConfig', 
                                                 function ($rootScope,   drupalApiServiceConfig) {
   	
    //
    // Comment resource
	//
    
    //@TODO
	//
	// File resource
	//
    //@TODO
    
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
   
    // Create action
	
	// Publish node create confirmed event
    var publishNodeCreateConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_createConfirmed, {node: node});
    };
    // Subscribe to node create confirmed event
    var onNodeCreateConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_createConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
  
	// Publish create create failed event
    var publishNodeCreateFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_createFailed, {error: error});
    };
    // Subscribe to node create failed event
    var onNodeCreateFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_createFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Update action
    
	// Publish node update confirmed event
    var publishNodeUpdateConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_updateConfirmed, {node: node});
    };
    // Subscribe to node update confirmed event
    var onNodeUpdateConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_updateConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node update failed event
    var publishNodeUpdateFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_updateFailed, {error: error});
    };
    // Subscribe to node update failed event
    var onNodeUpdateFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_updateFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Delete action
    
	// Publish node delete confirmed event
    var publishNodeDeleteConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_deleteConfirmed, {node: node});
    };
    // Subscribe to node delete confirmed event
    var onNodeDeleteConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_deleteConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node delete failed event
    var publishNodeDeleteFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_deleteFailed, {error: error});
    };
    // Subscribe to node delete failed event
    var onNodeDeleteFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_deleteFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Index action
    
	// Publish node index confirmed event
    var publishNodeIndexConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_indexConfirmed, {node: node});
    };
    // Subscribe to node index confirmed event
    var onNodeIndexConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_indexConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node index failed event
    var publishNodeIndexFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_indexFailed, {error: error});
    };
    // Subscribe to node index failed event
    var onNodeIndexFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_indexFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
  
    // Files action
    
	// Publish node files confirmed event
    var publishNodeFilesConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_filesConfirmed, {node: node});
    };
    // Subscribe to node files confirmed event
    var onNodeFilesConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_filesConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node files failed event
    var publishNodeFilesFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_filesFailed, {error: error});
    };
    // Subscribe to node files failed event
    var onNodeFilesFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_filesFailed, function(event, args) {
	    handler(args.error);
	   });	
    };

    // Comments action
    
	// Publish node comments confirmed event
    var publishNodeCommentsConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_commentsConfirmed, {node: node});
    };
    // Subscribe to node comments confirmed event
    var onNodeCommentsConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_commentsConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node comments failed event
    var publishNodeCommentsFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_commentsFailed, {error: error});
    };
    // Subscribe to node comments failed event
    var onNodeCommentsFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_commentsFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Attach file action
 
	// Publish node attachFile confirmed event
    var publishNodeAttachFileConfirmed = function (node) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_attachFileConfirmed, {node: node});
    };
    // Subscribe to node attachFile confirmed event
    var onNodeAttachFileConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_attachFileConfirmed, function(event, args) {
	    handler(args.node);
	   });	
    };
    
	// Publish node attachFile failed event
    var publishNodeAttachFileFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.node_attachFileFailed, {error: error});
    };
    // Subscribe to node attachFile failed event
    var onNodeAttachFileFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.node_attachFileFailed, function(event, args) {
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
    var publishSystemConnectFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_connectFailed, {error: error});
    };
    // Subscribe to system connect failed event
    var onSystemConnectFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_connectFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Get Variable Action
	
	// Publish system get variable confirmed event
    var publishSystemGetVariableConfirmed = function (variable) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_getVariableConfirmed, {variable: variable});
    };
    // Subscribe to system get variable confirmed event
    var onSystemGetVariableConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_getVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
    };
    
    // Publish system get variable failed event
    var publishSystemGetVariableFailed = function (error) {
    	console.log('publishSystemGetVariableFailed'); 
        $rootScope.$broadcast(drupalApiServiceConfig.system_getVariableFailed, {error: error});
    };
    // Subscribe to system get variable failed event
    var onSystemGetVariableFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_getVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Set Variable Action
	
	// Publish system set variable confirmed event
    var publishSystemSetVariableConfirmed = function (variable) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_setVariableConfirmed, {variable: variable});
    };
    // Subscribe to system connect set variable event
    var onSystemSetVariableConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_setVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
    };
    
    // Publish system set variable failed event
    var publishSystemSetVariableFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_setVariableFailed, {error: error});
    };
    // Subscribe to system set variable failed event
    var onSystemSetVariableFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_setVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    // Del Variable Action
	
	// Publish system del variable confirmed event
    var publishSystemDelVariableConfirmed = function (variable) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_delVariableConfirmed, {variable: variable});
    };
    // Subscribe to system connect set variable event
    var onSystemDelVariableConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_delVariableConfirmed, function(event, args) {
	    handler(args.variable);
	   });	
    };
    
    // Publish system del variable failed event
    var publishSystemDelVariableFailed = function (error) {
        $rootScope.$broadcast(drupalApiServiceConfig.system_delVariableFailed, {error: error});
    };
    // Subscribe to system set variable failed event
    var onSystemDelVariableFailed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.system_delVariableFailed, function(event, args) {
	    handler(args.error);
	   });	
    };
    
    //
    // Taxonomy term resource
	//
    //@TODO
	
    //
	// Taxonomy vocabulary resource
    //
    //@TODO
    
    //
	// User resource
	//
    
    // Token action

	// Publish user token confirmed event
    var publishUserTokenConfirmed = function (token) {
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
    var publishUserLoginConfirmed = function (data) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_loginConfirmed, {data: data});
    };
    // Subscribe to user login confirmed event
    var onUserLoginConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_loginConfirmed, function(event, args) {
	    handler(args.data);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLoginFailed = function (error) {
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
    var publishUserLogoutConfirmed = function (respons) {
        $rootScope.$broadcast(drupalApiServiceConfig.user_logoutConfirmed, {respons: respons});
    };
    // Subscribe to user login confirmed event
    var onUserLogoutConfirmed = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.user_logoutConfirmed, function(event, args) {
	    handler(args.respons);
	   });	
    };
    
    // Publish user login failed event
    var publishUserLogoutFailed = function (error) {
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
    
    //
    //Authentication service
    // 
    
    // Publish sonnectionState updated event
    var publishConnectionStateUpdated = function (state) {
        $rootScope.$broadcast(drupalApiServiceConfig.authService_connectionStateUpdated, {state: state});
    };
    // Subscribe to sonnectionStateUpdated event
    var onConnectionStateUpdated = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.authService_connectionStateUpdated, function(event, args) {
	    handler(args.state);
	   });	
    };
    
    // Publish currentUser updated event
    var publishCurrentUserUpdated = function (user) {
    	console.log('publishCurrentUserUpdated'); 
        $rootScope.$broadcast(drupalApiServiceConfig.authService_currentUserUpdated, {user: user});
    };
    // Subscribe to currentUserUpdated event
    var onCurrentUserUpdated = function($scope, handler) {
    	$scope.$on(drupalApiServiceConfig.authService_currentUserUpdated, function(event, args) {
	    handler(args.user);
	   });	
    };
    
   // Return the publicly accessible methods
   return {	   
	   // Comment events
	   //@TODO
	   
	   // File events
	   //@TODO
	   
	   //Node events
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
	   onNodeAttachFileFailed 			: onNodeAttachFileFailed,
	     
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
	  
	   // Taxonomy term events
	   //@TODO
	   
	   // Taxonomy vocabulary events
	   //@TODO
	   
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
	   onUserLogoutConfirmed			: onUserLogoutConfirmed,
	   publishUserLogoutFailed			: publishUserLogoutFailed,
	   onUserLogoutFailed				: onUserLogoutFailed,
	   
	   //Views events
	   //Retrieve event
	   publishViewsRetrieveConfirmed 	: publishViewsRetrieveConfirmed,
	   onViewsRetrieveConfirmed 		: onViewsRetrieveConfirmed,
	   publishViewsRetrieveFailed		: publishViewsRetrieveFailed,
	   onViewsRetrieveFailed			: onViewsRetrieveFailed,
	   
	   //DrupalAuthenticationService events
	   //ConnectionStateUpdated event
	   publishConnectionStateUpdated 	: publishConnectionStateUpdated,
	   onConnectionStateUpdated 		: onConnectionStateUpdated,
	   publishCurrentUserUpdated		: publishCurrentUserUpdated,
	   onCurrentUserUpdated				: onCurrentUserUpdated,
	   
   	};
}]);

drupalApiService.service('DrupalAuthenticationService', function($rootScope, $http, $q, drupalApiServiceConfig, drupalApiNotificationChannel, SystemResource, UserResource, $localstorage, ipCookie) {
	
	//needed to use the $on method in the notification channel
	//http://stackoverflow.com/questions/16477123/how-do-i-use-on-in-a-service-in-angular
	var scope = $rootScope.$new(); // or $new(true) if you want an isolate scope
	var userIsConected = false,
		currentUser	 = drupalApiServiceConfig.anonymousUser,
		lastConnectTime  = 0
		sessionCookieOptions = { 	domain 			: 'dev-drupal-headless-ionic.pantheon.io',
									path			: '/',
									expires			: 30,
									expirationUnit 	: 'minutes'
							   },
		jsCookieOptions = { 	domain 	: 'dev-drupal-headless-ionic.pantheon.io',
								path	: '/',
								expires	: 30,
								expirationUnit: 'minutes'
						  };
	
	var storeTokenData = function(newToken) {
		newToken = (newToken)?newToken:false;
	
		if(newToken !== false) { 
			
			if( newToken != $localstorage.getItem('token', false) ) {
				$localstorage.setItem('token', newToken);
			}
		
			$http.defaults.headers.common.Authorization = newToken;
			$http.defaults.headers.common['X-CSRF-TOKEN'] = newToken;

		}
		else { $localstorage.removeItem('token'); }
		 
	};

	var deleteTokenData = function() {
			$localstorage.removeItem('token');

			$http.defaults.headers.common.Authorization = undefined;
			$http.defaults.headers.common['X-CSRF-TOKEN'] = undefined;
	};
	
	
	var getLastConnectTime = function() {
		return lastConnectTime;
	}
	
	var getCurrentUser = function() {
		return currentUser;
	}
	//
	var setCurrentUser = function(newUser) {
		if(currentUser != newUser) {
			console.log(currentUser, newUser); 
        	currentUser = newUser;
      	    drupalApiNotificationChannel.publishCurrentUserUpdated(newUser);
        }
	};
	
	var getConnectionState = function() {
		return userIsConected;
	};
	//
	var setConnectionState = function(newState) {
        if(newState != userIsConected) {
          userIsConected = newState;
      	  drupalApiNotificationChannel.publishConnectionStateUpdated(userIsConected);
        }
	};
	
	var refreshToken = function () {
		var defer = $q.defer();
		
		//if refreshTokenFromLocalStorage is not possible
		var localStorageToken = refreshTokenFromLocalStorage();
		if(!localStorageToken) {
		
			//refresh token from server
			refreshTokenFromServer().then(
				
				//refreshTokenFromServer success
				function(token) {
					 defer.resolve(token);
				},
				//refreshTokenFromServer error
				function() {
					defer.reject(false);
				}
			);
		} 
		//if refreshTokenFromLocalStorage was possible
		else { defer.resolve(localStorageToken); }
		
		return defer.promise;
	}
	
	//if token is stored in local storage set token value to http headers
	//this function is needed when launging app to check if user has token already 
	var refreshTokenFromLocalStorage = function () {
		//load token from local storage or flase
		var token = $localstorage.getItem('token', false);
		
		if (token) {
			storeTokenData(token);
			return token
		}
		
		return false;
	};
	
	//request a new token from server => api_endpoint/user/token
	var refreshTokenFromServer = function () {
		var defer = $q.defer();
		
		UserResource.token().then(
			//UserResource.token success
			function(token){
				 storeTokenData(token);
				 defer.resolve(token);
			},
			//UserResource.token error
			function(data) {
				defer.reject(false);
			}
		);

		return defer.promise;
	};
	
	var refreshConnection = function () {
		var defer = $q.defer();
		
		//check token
		refreshToken().then(
				//initToken success
				function(token) {	
					
					SystemResource.connect().then(
							//SystemResource.connect success
				            function (data) {
				            	
				              var user_id = data.user.uid;
				              
				              if (user_id == 0) { 
				            	  setConnectionState(false); 
				              }
				              else {  
				            	  setConnectionState(true);
				              }
				             
				              storeSessionData(data);
			            	  setCurrentUser(data.user);
				              
				              defer.resolve(data);
				            },
				            //SystemResource.connect error
				            function(data) {
				            	setConnectionState(false);
				            	defer.reject(data);
				            }
						);
				},
				//initToken error
				function() {
					defer.reject(data);
				}
		);
		
		//check cookies
		return defer.promise;
	};
	
	var storeSessionData = function (data) { 
		//store local storage data
		$localstorage.setItem('sessid', data.sessid);
		$localstorage.setItem('session_name', data.session_name);
		
		//store session cookies
		//SESSa8c952894fc942b83f7d2f75f2e68c3b	YFyH90YcJOPPb4CVJrs_9TB7yPnv9Ds6iE0Bjb_viEE	.dev-drupal-headless-ionic.pantheon.io	/	2015-03-31T18:43:35.769Z	79	✓		
		//has_js	1	dev-drupal-headless-ionic.pantheon.io	/	Session	7			

		ipCookie(data.session_name, data.sessid, sessionCookieOptions);
		
		$http.defaults.withCredentials = true;

	};
	
	var deleteSessionData = function () {
		//delete session cookies
		ipCookie.remove($localstorage.getItem('session_name'), sessionCookieOptions.path);
		$http.defaults.withCredentials = false;
		//delete local storage data
		$localstorage.removeItem('sessid');
		$localstorage.removeItem('session_name');
	};
	
	
	//public methods
	return {
		storeTokenData 						: 	storeTokenData,
		deleteTokenData						: 	deleteTokenData,
		refreshToken						: refreshToken,
		
		storeSessionData 					: storeSessionData,
		deleteSessionData 					: deleteSessionData,
		
		getConnectionState 					: getConnectionState,
		setConnectionState					: setConnectionState,
		
		getCurrentUser 						: getCurrentUser,
		setCurrentUser 						: setCurrentUser,
		
		refreshConnection 					: refreshConnection,
		getLastConnectTime 					: getLastConnectTime,
		
	};
})
.run(
function($rootScope, SystemResource, UserResource, DrupalAuthenticationService, drupalApiServiceConfig, drupalApiNotificationChannel, $http, $localstorage) {
		
	$http.defaults.withCredentials = true; //cookies
	
	//on login request confirmed store data and set new token in request headers
	var onUserLoginConfirmedHandler = function(data) { 
		console.log('DrupalAuthenticationService run on login');
		DrupalAuthenticationService.storeTokenData(data.token);
		DrupalAuthenticationService.storeSessionData(data);
		DrupalAuthenticationService.setConnectionState(true);
		DrupalAuthenticationService.setCurrentUser(data.user);
	};
	drupalApiNotificationChannel.onUserLoginConfirmed($rootScope, onUserLoginConfirmedHandler);
	
	//on logout request confirmed delete data and remove token from request headers
	var onUserLogoutConfirmedHandler = function(data) {
		console.log('DrupalAuthenticationService run on logout');
		//@TODO check if this is needed
		DrupalAuthenticationService.deleteTokenData();
		DrupalAuthenticationService.deleteSessionData();
		DrupalAuthenticationService.setConnectionState(false);
		DrupalAuthenticationService.setCurrentUser(drupalApiServiceConfig.anonymousUser);
		
		DrupalAuthenticationService.refreshConnection();
	};
	drupalApiNotificationChannel.onUserLogoutConfirmed($rootScope, onUserLogoutConfirmedHandler);
	
});


/**
 * Drupal resources module
 * 
 * 
 */
var drupalAPI = angular.module('common.drupal.api-resources', []);

/**
 * NodeResource
 * 
 * This service mirrors the Drupal node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * @TODO check
 * your_api_endpoint/node*|<mirror>|POST|Content-Type
 * 
**/
drupalAPI.service('NodeResource', function($http, $q, drupalApiServiceConfig, drupalApiNotificationChannel) {
	
	/*
	 * getPreparedIndexParams
	 * http://drupal.aspcode.net/ppst/63547274810018958013876/drupal-services-node-filtering
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
				url : retrievePath
			},
			errors = [];
		
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeRetrieveFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
				drupalApiNotificationChannel.publishNodeRetrieveConfirmed(data);
				defer.resolve(data);
		})
		.error(function(data, status, headers, config){
				drupalApiNotificationChannel.publishNodeRetrieveFailed(data);
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
	 * useage: NodeResource.create(node).then(yourSuccessCallback,yourErrorCallback);
	 */
	var create = function( node ) {
		var createPath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node,
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
			drupalApiNotificationChannel.publishNodeCreateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeCreateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeCreateFailed(data);
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
	 * useage: UserResource.update(nid, node).then(yourSuccessCallback,yourErrorCallback);
	 */
	var update = function( nid, node ) {
		var createPath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + '/' + nid,
		defer = $q.defer(),
		requestConfig = {
			method :'PUT',
			url : createPath,
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
			drupalApiNotificationChannel.publishNodeUpdateFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};

		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeUpdateConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeUpdateFailed(data);
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
	 * useage: UserResource._delete(nid).then(yourSuccessCallback,yourErrorCallback);
	 */
	var _delete = function( nid ) {
		
		var createPath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + (nid?'/'+nid:''),
		defer = $q.defer(),
		requestConfig = {
			method :'DELETE',
			url : createPath
		},
		errors = [];
	
		//if not given
		if(!nid) { errors.push('Param nid is required.');}

		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeDeleteFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeDeleteConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeDeleteFailed(data);
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
	 * useage: NodeResource.index().success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var index = function(page, fields, parameters, pagesize) {
		
		var IndexParams = getPreparedIndexParams(page, fields, parameters, pagesize),
			retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + (IndexParams?'?'+IndexParams:''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath,
			},
			errors = [];
		
		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeIndexFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeIndexConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeIndexFailed(data);
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
	 * useage: NodeResource.files(nid, file_contents, image_styles).success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var files = function(nid, file_contents, image_styles) {
		console.log(nid, file_contents, image_styles); 
		var attachFilePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node +'/'+ nid + '/files'+((file_contents)?('/'+file_contents):'')+((image_styles)?('/'+image_styles):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeFilesFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeFilesConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeFilesFailed(data);
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
	 * Method: POST 707
	 * Url: http://drupal_instance/api_endpoint/node/{NID}/comments/
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The node id to load comments for., required:true, source:path
	 * @param {Integer} count Number of comments to load., required:false, source:param
	 * @param {Integer} offset If count is set to non-zero value, you can pass also non-zero value for start. For example to get comments from 5 to 15, pass count=10 and start=5., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: NodeResource.comments(nid, count, offset).success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var comments = function(nid, count, offset) {
		
		var attachFilePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + '/' + nid +'/comments/' + ((count != undefined ||  offset != undefined)?'?':'')+ ((count != undefined)?('count='+count+','):'') + ((offset != undefined)?('offset=' + offset):''),
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : attachFilePath,
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		
		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeCommentsFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
	
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeCommentsConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeCommentsFailed(data);
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
	 * useage: NodeResource.attach_file(nid, field_name, attach, field_values).success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var attach_file = function(nid, field_name, attach, field_values) {
		
		var attachFilePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.node + '/' + nid + '/attach_file',
			defer = $q.defer(),
			requestConfig = {
				method :'POST',
				url : attachFilePath,
				transformRequest: angular.identity,
				headers : {
					"Content-Type"	: "multipart/form-data",
				},
				data : {
					field_name   : field_name,
					attach 		 : attach,
					field_values : field_values,
				}
			},
			errors = [];
		
		//if not given
		if(!nid) { errors.push('Param nid is required.'); }
		if(!field_name) { errors.push('Param field_name is required.'); }
		
		if(errors.length != 0) {
			drupalApiNotificationChannel.publishNodeAttachFileFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		};
				
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeAttachFileConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishNodeAttachFileFailed(data);
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

});

/**
 * SystemResource
 * 
 * This service mirrors the Drupal system resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/system/*|<mirror>|POST|Content-Type,Authorization|true
 * 
**/
drupalAPI.service('SystemResource', function($http, $q, drupalApiServiceConfig, drupalApiNotificationChannel) {
	
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
	var connect = function(token) {
		
		var connectPath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.system + '/' + 'connect',
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
			drupalApiNotificationChannel.publishSystemConnectConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemConnectFailed(data);
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
		
		var getVariablePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.system + '/' + 'get_variable',
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
			drupalApiNotificationChannel.publishSystemGetVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(value, status, headers, config){
			drupalApiNotificationChannel.publishSystemGetVariableConfirmed(value);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemGetVariableFailed(data);
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
	 *  useage: SystemResource.set_variable().success(yourSuccessCallback).error(yourErrorCallback);
	 */
	var set_variable = function(name, value){
		var setVariablePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.system + '/' + 'set_variable',
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
			drupalApiNotificationChannel.publishSystemSetVariableFailed({data: errors});
			defer.reject(errors); 
			return defer.promise;
		}
		
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemSetVariableConfirmed({name: name, value: value});
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemSetVariableFailed({name: name, value: value});
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
	 *  useage: SystemResource.del_variable().then(yourSuccessCallback,yourErrorCallback);
	 */
	var del_variable = function(name){
		var delVariablePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.system + '/' + 'del_variable',
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
			drupalApiNotificationChannel.publishSystemDelVariableFailed(errors);
			defer.reject(errors); 
			return defer.promise;
		}
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemDelVariableConfirmed(name);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			drupalApiNotificationChannel.publishSystemDelVariableFailed(data);
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

});

/**
 * UserResource
 *
 * This service mirrors the Drupal system resource of the services 3.x module.
 * to use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/user/*|<mirror>|GET, PUT, POST, DELETE|Content-Type,Authorization
 * 
**/
drupalAPI.service('UserResource', function($http, $q, drupalApiServiceConfig, $localstorage, drupalApiNotificationChannel) {

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
		var retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + (uid?'/'+uid:''),
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
	 * useage: UserResource.create(account).then(yourSuccessCallback,yourErrorCallback);
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
					
		var pathToLogin = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + '/' + 'login';
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
		 var pathToLogout = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + '/' + 'logout';
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
         pathToToken = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + '/' + 'token';

	     $http({
	       url: pathToToken,
	       method: 'POST',
	       withCredentials: true
	     })
         .success(function (data) {
           drupalApiNotificationChannel.publishUserTokenConfirmed(data.token);
           defer.resolve(data.token);
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
		
		 var pathToRegister = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.user + '/' + 'register';
	 	 	 requestConfig = {
	 			method: 'POST',
				url : pathToRegister,
				headers: {
					//@TODO use the format of drupalApiServiceConfig
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
drupalAPI.service('ViewsResource', function($http, $q, drupalApiServiceConfig, drupalApiNotificationChannel) {

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
		
		var retrievePath = drupalApiServiceConfig.drupal_instance + drupalApiServiceConfig.api_endpoints.api_v1.path + drupalApiServiceConfig.api_endpoints.api_v1.defaut_resources.views + '/' + view_name;
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
			console.log(data, status, headers, config); 
			drupalApiNotificationChannel.publishViewsRetrieveConfirmed(data);
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			console.log(data, status, headers, config); 
			drupalApiNotificationChannel.publishViewsRetrieveFailed(data);
			defer.reject(data);
		});
		
		return defer.promise;

	};

	//public methods	
	return {
		retrieve : retrieve
	};

});





