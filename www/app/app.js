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

  'resources.node-resource.controllers',
  'resources.system-resource.controllers',
  'resources.user-resource.controllers',
  'resources.views-resource.controllers',

  'authed-tabs.node-demo.controllers',
  'authed-tabs.profile.controllers',

]);

drupalIonicAngularJSAPIClient
	.config( [  '$stateProvider', '$urlRouterProvider', '$httpProvider', 'AppSettings', 'drupalApiConfig',
     function (  $stateProvider,   $urlRouterProvider,   $httpProvider,   AppSettings,   drupalApiConfig ) {
		
		//edit drupal config
		drupalApiConfig.api_endpoint += 'v1/';
		
		//
		$stateProvider
          .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/templates/base_view.html",
            controller: 'AppCtrl',
           resolve: {
            	// init connection state
            	// this fires just on app launge, switching child states will not resolve this again
                connectedUser: function(ApiAuthService, drupalApiConfig) {
                	
        			if(ApiAuthService.getLastConnectTime() < (Date.now() - drupalApiConfig.session_expiration_time) ) {       				
        				return ApiAuthService.refreshConnection();
        			}
                },
            },
            data: {
              access: AppSettings.accessLevels.public
            }
           
          })
          //
          //stats for anonymouse user
          //=================================================================
          .state('app.tour', {
            url: '/tour',
            views: {
              'menuContent': {
                templateUrl: 'app/components/tour/tour.html',
                controller: 'TourCtrl'
              }
            }
          })
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
	        },
            resolve: {
              termsNodeObj: function (NodeResource, AppSettings) {
            	  return NodeResource.retrieve(AppSettings.terms_and_conditions_nid);
              }
            }
          })
	      //    
	      //Abstract states for anonymous tabs
		  //______________________________________________
		  .state('app.resources-tabs', {
		    url: '/resources-tabs',
		    abstract: true,
		    views: {
			      'menuContent': {
			    	templateUrl: 'app/components/resources-tabs/resources-tabs.html',
			      }
			    }
		  })
		 
		  //
		  //Node Resource
		  //______________________________________________
		   .state('app.resources-tabs.node-resource', {
		    url: '/node-recource',
		    views: {
			      'node-resource': {
			    	templateUrl: 'app/components/resources-tabs/node-resource/node-resource.html',
			  		controller:  'ResourcesNodeResourceCtrl' 
			      }
			    }
		   })
		  //
		  //System Resource
		  //______________________________________________
		   .state('app.resources-tabs.system-resource', {
		    url: '/system-recource',
		    views: {
			      'system-resource': {
			    	templateUrl: 'app/components/resources-tabs/system-resource/system-resource.html',
			  		controller:  'ResourcesSystemResourceCtrl' 
			      }
			    }
		   })
		   //
		   //User Resource
		   //______________________________________________
		   .state('app.resources-tabs.user-resource', {
		    url: '/user-recource',
		    views: {
			      'user-resource': {
			    	templateUrl: 'app/components/resources-tabs/user-resource/user-resource.html',
			  		controller:  'ResourcesUserResourceCtrl' 
			      }
			    }
		   })
		    //Views Resource
		   //______________________________________________
		   .state('app.resources-tabs.views-resource', {
		    url: '/views-recource',
		    views: {
			      'views-resource': {
			    	templateUrl: 'app/components/resources-tabs/views-resource/views-resource.html',
			  		controller:  'ResourcesViewsResourceCtrl' 
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
	          access: AppSettings.accessLevels.user
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
  
  $urlRouterProvider.otherwise('/app/tour');
  
  
}]);


drupalIonicAngularJSAPIClient.run(['$rootScope','$ionicPlatform', '$localstorage', '$ionicLoading', 'ApiAuthService', 'AccessControlService', '$state',
                          function ($rootScope,  $ionicPlatform,   $localstorage,   $ionicLoading,   ApiAuthService,   AccessControlService,   $state) {
	
	
	
	//restrict access redirects
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      console.log('want go from ' + fromState.name + ' to ' + toState.name); 
      
      var firstVisit = 1; //$localstorage.getItem('firstVisit', false);
      var isRegistered = 1; //$localstorage.getItem('isRegistered', false);
      //AccessControlService.authorize(toState.data.access);
      
      // if its the users first visit to the app play the apps tour
  	  if ( !firstVisit && toState.name != 'app.tour') { 
  		console.log('redirect 1: app.tour'); 
  		event.preventDefault();
  		$state.go('app.tour'); 	
  		return;
  	  }  
  	  
     /* if ( ('data' in toState) && ('access' in toState.data) && !AccessControlService.authorize(toState.data.access) ) {
        event.preventDefault();
      
        if (isRegistered) {
          console.log('redirect 3: app.login'); 
          $state.go('app.login');
          return;
        } 
        else {
          console.log('redirect 4: app.register'); 
          $state.go('app.register');
          return;
        } 
      }*/
           
      //custom redirect
      if  (toState.name == 'app.login' || toState.name == 'app.register') {
    
        if (ApiAuthService.getConnectionState()) {
          console.log('redirect 5: app.authed-tabs.profile'); 
          event.preventDefault();
          $state.go('app.authed-tabs.profile');
          return;
        } 
      }
    });
    
}]);
