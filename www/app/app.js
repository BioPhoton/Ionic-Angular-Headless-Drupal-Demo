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
  
  'no-network.controllers',
  
  'login.controllers',
  'logout.controllers',
  'register.controllers',


  'authed-tabs.node-demo.controllers',
  'authed-tabs.users.controllers',
  'authed-tabs.profile.controllers',
]);

drupalIonicAngularJSAPIClient.run(['$rootScope', 'drupalApiConfig',  '$urlRouter', '$ionicPlatform',  '$localstorage', '$ionicLoading', 'ApiAuthService', 'AccessControlService', '$state',
                          function ($rootScope,   drupalApiConfig,    $urlRouter,   $ionicPlatform,    $localstorage,   $ionicLoading,   ApiAuthService,   AccessControlService,   $state) {
	
	 //redirection logic start
	
	 //load localStorage data into scope
	 $rootScope.firstVisit 		= $localstorage.getItem('firstVisit', false);
     $rootScope.isRegistered 	= $localstorage.getItem('isRegistered', false);    
  
     $localstorage.getObject('isRegistered', false);    
     
     //http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
     $rootScope.$on('$locationChangeSuccess', function(e) {
   
       	 	if ( ApiAuthService.getLastConnectTime() > ( Date.now() - drupalApiConfig.session_expiration_time ) || ApiAuthService.getLastConnectTime() > 0 ) {
       	 		//sync the current URL to the router
    	    	$urlRouter.sync();
    	    	return;
    	    }
    	 
    	    // Prevent $urlRouter's default handler from firing
    	    e.preventDefault();
    	    $rootScope.$broadcast('loading:show', { loading_settings : {template:"<p><ion-spinner></ion-spinner><br/>Connect with System...</p>"} });
    	    // init or refresh Authentication service connection    
    	    ApiAuthService.refreshConnection().then(
    	    	function() {
    	    		$rootScope.$broadcast('loading:hide');
    	    		//sync the current URL to the router 
    	    		$urlRouter.sync();
    	    	},
    	    	function() {
    	    		$rootScope.$broadcast('loading:hide');
    	    		//sync the current URL to the router 
    	    		$urlRouter.sync();
    	    	}
    	    );
    	 
    	  // Configures $urlRouter's listener *after* your custom listener
    	  $urlRouter.listen();
	});
    
   
	//restrict access redirects
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    	 // if its the users first visit to the app play the apps tour
	   	 if ( $rootScope.firstVisit === false && toState.name !== 'tour') { 
	   		    event.preventDefault();
		 		$state.go('tour'); 	
		 		return;
		 }   
	   	 
	    //redirects for logged in user
		if  (toState.name == 'app.login' || toState.name == 'app.register') {
			if(ApiAuthService.getConnectionState()) {
				event.preventDefault();
				$state.go('app.authed-tabs.profile');
				return;
			}
	    } 
		
		//redirect if user in unauthorized
		if ( ('data' in toState) && ('access' in toState.data) && !AccessControlService.authorize(toState.data.access) ) {
			event.preventDefault();
			if ($rootScope.isRegistered) { $state.go('app.login'); return;} 
	        else { $state.go('app.register'); return;} 
	    }
    });  
    //redirection logic end
    
    $rootScope.$on('loading:show', function (event, args) {
    	$ionicLoading.show((args && 'loading_settings' in args) ? args.loading_settings:{});
    });
      
    $rootScope.$on('loading:hide', function (event, args) {
        $ionicLoading.hide()
    });
      
}]);

drupalIonicAngularJSAPIClient
	.config( [   '$ionicLoadingConfig', '$stateProvider', '$urlRouterProvider', 'accessControlConfig', 'drupalApiConfig',
     function (   $ionicLoadingConfig,   $stateProvider,   $urlRouterProvider,   accessControlConfig,   drupalApiConfig ) {
		
		//Configure ng-drupal-ionic
		//edit drupal config
		drupalApiConfig.drupal_instance = 'http://www.drupalionic.org/backend/';
		drupalApiConfig.api_endpoint += 'v1/';
		
		//edit accessControl config
		accessControlConfig.accessLevels.user.push('administrator');
		accessControlConfig.accessLevels.customLevel = ['authenticated user', 'administrator'];
				
		//Configure loading intercepter
		//http://ionicframework.com/docs/api/service/$ionicLoading/
		$ionicLoadingConfig.template = '<p><ion-spinner></ion-spinner><br/>Loading...</p>';
	
		//http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
		// Prevent $urlRouter from automatically intercepting URL changes;
		// this allows you to configure custom behavior in between location changes and route synchronization:
		$urlRouterProvider.deferIntercept();
        
		//set default URL
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
          
            data: {
              access: accessControlConfig.accessLevels.public
            }
           
          })
                    
           .state('app.no-network', {
            url: '/no-network',
            views: {
            	'menuContent': {
            		templateUrl: 'app/components/no-network/no-network.html',
            		controller : 'NoNetworkCtrl'
            	} 
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
	      
	       .state('app.authed-tabs.users', {
	        url : "/users",
	        cache : false,
	        views : {
	          'users-tab' : {
	            templateUrl : "app/components/authed-tabs/users/users.html",
	            controller  : 'authedTabUsersCtrl'
	          }
	        },
	         resolve: {
	        	    pageFirst : function () {return 1;},
		        	pageSize :function () {return 10;},
		        	
		        	newUsers : function (UserResource,pageFirst,pageSize) {
		        		return UserResource.index({page : pageFirst, pageSize : pageSize});
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
	        	pageFirst : function () {return 1;},
	        	pageSize :function () {return 10;},
	        	
	        	newNodes : function (NodeResource,pageFirst,pageSize) {
	        		return NodeResource.index({page:pageFirst,pageSize: pageSize});
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