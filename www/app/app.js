// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var drupalIonicAngularJSAPIClient = angular.module('drupalIonicAngularJSAPIClient', ['ionic',
  
  'drupalIonicAngularJSAPIClient.configuration',

  'common.accesss-control',
  'common.services.localstorage',
  'ApiAuthModules',
  
  'app.controllers',
  'tour.controllers',
  'login.controllers',
  'logout.controllers',
  'register.controllers',

  'authed-tabs.node-demo.controllers',
  'authed-tabs.profile.controllers',

]);


drupalIonicAngularJSAPIClient.run(['$rootScope','$ionicPlatform', '$localstorage', '$ionicLoading', 'ApiAuthService', 'AccessControlService', '$state',
                          function ($rootScope,  $ionicPlatform,   $localstorage,   $ionicLoading,   ApiAuthService,   AccessControlService,   $state) {
	
	// init Authentication service
	// ApiAuthService.refreshConnection();

	 $rootScope.firstVisit 		= $localstorage.getItem('firstVisit', false);
     $rootScope.isRegistered 	= $localstorage.getItem('isRegistered', false);
	
    
 	 
     
     
	//restrict access redirects
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    	
   /*
    	// if its the users first visit to the app play the apps tour
  	  if ( $rootScope.firstVisit === false && toState.name != 'tour' ) { 
  		event.preventDefault();
  		console.log(toState.name); 
  		$state.go('tour'); 	
  		return;
  	  }   
  	  else if( $rootScope.firstVisit === false && toState.name === 'tour' ) { return; }
  	 
  	  //if user never registered 
  	  if ( $rootScope.isRegistered === false && toState.name != 'app.register' ) { 
  		event.preventDefault();
  		console.log(toState.name); 
  		$state.go('app.register'); 	
  		return;
  	  }  
  	  else if ($rootScope.isRegistered && toState.name === 'app.register') { return; }
  	*/
    });
    
}]);

drupalIonicAngularJSAPIClient
	.config( [   '$stateProvider', '$urlRouterProvider', '$httpProvider', 'accessControlConfig', 'drupalApiConfig',
     function (   $stateProvider,   $urlRouterProvider,   $httpProvider,   accessControlConfig,   drupalApiConfig ) {
		
		//Configure ng-drupal-ionic
		//edit drupal config
		drupalApiConfig.drupal_instance = 'http://dev-drupal-headless-ionic.pantheon.io/';
		drupalApiConfig.api_endpoint += 'v1/';
		
		//edit accessControl config
		accessControlConfig.accessLevels.user.push('administrator');
		accessControlConfig.accessLevels.customLevel = ['authenticated user', 'administrator'];
		
		if(window.localStorage.getItem("isRegistered") === null ) {
			$urlRouterProvider.otherwise('app/register');
		}
		else {
			$urlRouterProvider.otherwise('app/login');
		}
		
		//
		$stateProvider
          .state('tour', {
            url: '/tour',
                templateUrl: 'app/components/tour/tour.html',
                controller: 'TourCtrl'
          })
         
          .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/templates/base_view.html",
            controller: 'AppCtrl',
           resolve: {
            	// init connection state
            	// this fires just on app launge, switching child states will not resolve this again
        	   currentUser: function(ApiAuthService, drupalApiConfig) {
        			if(ApiAuthService.getLastConnectTime() < (Date.now() - drupalApiConfig.session_expiration_time) ) {    
        				return ApiAuthService.refreshConnection().then(
        						function() {
        						return	ApiAuthService.getCurrentUser();
        						});		
        			} 
                },
            },
            data: {
              access: accessControlConfig.accessLevels.public
            }
           
          })
                    
           .state('app.no-network', {
            url: '/no-network',
            	'menuContent': {
            		templateUrl: 'app/components/no-network/no-network.html',
            	}  
            })
          
          //
          //stats for anonymouse user
          //=================================================================

          .state('app.login', {
            url: '/login',
            views: {
              'menuContent': {
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginCtrl'
              }
            }

          })
          .state('app.register', {
            url: '/register',
            views: {
              'menuContent': {
                templateUrl: 'app/components/register/register.html',
                controller: 'RegisterCtrl'
              }
	        }
          })
          
	      //states for authenticted user
	      //=================================================================
	      .state('app.authed-tabs', {
	        url: "/authed-tabs",
	        abstract: true,
	        views: {
	          'menuContent': {
	            templateUrl: "app/components/authed-tabs/authed-tabs.html",
	          }
	        },
	        data: {
	          access: accessControlConfig.accessLevels.user
	        }
	      })
	      
	      .state('app.authed-tabs.profile', {
	        url : "/profile",
	        cache : false,
	        views : {
	          'profile-tab' : {
	            templateUrl : "app/components/authed-tabs/profile/profile.html",
	            controller  : 'authedTabProfileCtrl'
	          }
	        },
	         resolve: {
	              userObj: function (ApiAuthService) {
	                return ApiAuthService.getCurrentUser();
	              }
	            }
	      })
	     
	      .state('app.authed-tabs.node-list', {
	        url: "/nodes",
	        views: {
	          'node-list-tab': {
	            templateUrl: "app/components/authed-tabs/node-demo/node-demo.html",
	            controller: 'NodeListCtrl'
	          }
	        },
	        resolve : {
	        	pageFirst : function () {return 0;},
	        	pageSize :function () {return 5;},
	        	
	        	newNodes : function (NodeResource,pageFirst,pageSize) {
	        		return NodeResource.index( pageFirst,null,null,pageSize);
	        	}
	        }
	      })
	      .state('app.authed-tabs.node-detail', {
	        url: "/:nid/detail",
	        views: {
		          'node-list-tab': {
		        	    templateUrl: "app/components/authed-tabs/node-demo/node-detail.html",
		    	        controller: 'NodeDetailCtrl'
		          }
		    },
		    resolve : {
		    	nodeObj :function (NodeResource, $stateParams) {
	                return NodeResource.retrieve($stateParams.nid);
	            }	
		    }
	    
	      })
	      
	      .state('app.authed-tabs.node-edit', {
	        url: "/:nid/edit",
	        views: {
	          'node-list-tab': {
	            templateUrl: "app/components/authed-tabs/node-demo/node-edit.html",
	            controller: 'NodeEditCtrl'
	          }
	        },
	        resolve : {
		    	nodeObj :function (NodeResource, $stateParams) {
	                return NodeResource.retrieve($stateParams.nid);
	            }	
		    }
	      });
  

  
  
}]);