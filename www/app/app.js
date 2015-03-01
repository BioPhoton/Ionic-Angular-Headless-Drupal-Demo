// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var drupalIonicAngularJSAPIClient = angular.module('drupalIonicAngularJSAPIClient', ['ionic',
  
  'drupalIonicAngularJSAPIClient.configuration',
  'common.drupal.api-services',
  'common.drupal.api-resources',
  'common.accesss-control',
  'common.services.localstorage',
  //this is the good one

  'LocalForageModule',
  'app.controllers',
  'tour.controllers',
  'login.controllers',
  'logout.controllers',
  'register.controllers',

  'resources.session-resource.controllers',
  'anon-tabs.node-resource.controllers',
  'anon-tabs.system-resource.controllers',
  'anon-tabs.user-resource.controllers',
  'anon-tabs.views-resource.controllers',

  'authed-tabs.views-resource.controllers',
  'authed-tabs.profile.controllers',

]);

drupalIonicAngularJSAPIClient.run(['$rootScope','$ionicPlatform', '$localstorage', '$ionicLoading', 'drupalApiNotificationChannel', 'DrupalAuthenticationService', 'AccessControlService', '$state',
                          function ($rootScope,  $ionicPlatform,   $localstorage,   $ionicLoading,   drupalApiNotificationChannel,   DrupalAuthenticationService,   AccessControlService,   $state) {
	
	
	//init connection state
	DrupalAuthenticationService.refreshConnection();
	  
    //restrict access redirects
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    	
      var firstVisit = $localstorage.getItem('firstVisit');
      
      var isRegistered = $localstorage.getItem('isRegistered');
    
   
      // if its the user first visit to the app play the apps tour
  	  if ( !firstVisit && toState.name != 'app.tour') { 
  		event.preventDefault();
  		$state.go('app.tour'); 	
  	  }  
  	  
      if (!('data' in toState) || !('access' in toState.data)) {
        event.preventDefault();
        console.log('no access data set for this route'); 
      }
      else if (!AccessControlService.authorize(toState.data.access)) {
        event.preventDefault();
        console.log('not authorized'); 
        if (firstVisit && isRegistered) {
        	console.log('firstVisit && isRegistered'); 
          $state.go('app.login');
          return;
        } else if (firstVisit && !isRegistered) {
        	console.log('firstVisit && !isRegistered'); 
          $state.go('app.register');
          return;
        } 
        else {
        	console.log('else'); 
          $state.go('app.tour');
          return;
        };
      }
           
      //custom redirect
     /* if  (toState.name == 'app.login' || toState.name == 'app.register') {
        if (DrupalAuthenticationService.getConnectionState()) {
        	console.log('User is already authed. So we skip redirecting to ' + toState.name + 'and go to app.authed-tabs.profile'); 
          event.preventDefault();
          $state.go('app.authed-tabs.profile');
          return;
        } else {
        	console.log('user is not authed so he can go to ' + toState.name);
        }
      }*/
       
    });
    /**/
}]);

drupalIonicAngularJSAPIClient

	.config( [ '$stateProvider', '$urlRouterProvider', '$httpProvider', 'DrupalAPISettings', 
     function ( $stateProvider,   $urlRouterProvider,   $httpProvider,   DrupalAPISettings) {
	
  $stateProvider
          .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/templates/base_view.html",
            controller: 'AppCtrl',
            cache: false,
            data: {
              access: DrupalAPISettings.accessLevels.public
            }
          })

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
              termsNodeObj: function (NodeResource, DrupalAPISettings) {
                return NodeResource.retrieve(DrupalAPISettings.terms_and_conditions_nid);
              }
            }
          })
           
      //Abstract states for anonymous tabs
	  //______________________________________________
	  .state('app.resources-tabs', {
	    url: '/anon-tabs',
	    abstract: true,
	    views: {
		      'menuContent': {
		    	templateUrl: 'app/components/resources-tabs/resources-tabs.html',
		      }
		    }
	  })
	 
	  //Session Resource
	  //______________________________________________
	   .state('app.resources-tabs.session-resource', {
	    url: '/session-recource',
	    views: {
		      'session-resource': {
		    	templateUrl: 'app/components/resources-tabs/session-resource/session-resource.html',
		  		controller:  'ResourcesSessionResourceCtrl' 
		      }
		    }
	   })
	  //Node Resource
	  //______________________________________________
	   .state('app.resources-tabs.node-resource', {
	    url: '/node-recource',
	    views: {
		      'node-resource': {
		    	templateUrl: 'app/components/resources-tabs/node-resource/anon-tabs-node-resource.html',
		  		controller:  'anonTabNodeResourceCtrl' 
		      }
		    }
	   })
	  //System Resource
	  //______________________________________________
	   .state('app.resources-tabs.system-resource', {
	    url: '/system-recource',
	    views: {
		      'system-resource': {
		    	templateUrl: 'app/components/resources-tabs/system-resource/anon-tabs-system-resource.html',
		  		controller:  'anonTabSystemResourceCtrl' 
		      }
		    }
	   })
	   
	   //User Resource
	   //______________________________________________
	   .state('app.resources-tabs.user-resource', {
	    url: '/user-recource',
	    views: {
		      'user-resource': {
		    	templateUrl: 'app/components/resources-tabs/user-resource/anon-tabs-user-resource.html',
		  		controller:  'anonTabUserResourceCtrl' 
		      }
		    }
	   })
	    //Views Resource
	   //______________________________________________
	   .state('app.resources-tabs.views-resource', {
	    url: '/views-recource',
	    views: {
		      'views-resource': {
		    	templateUrl: 'app/components/resources-tabs/views-resource/anon-tabs-views-resource.html',
		  		controller:  'anonTabViewsResourceCtrl' 
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
              access: DrupalAPISettings.accessLevels.user
            }

          })
          .state('app.authed-tabs.views-resource', {
            url: "/views-resource",
            views: {
              'views-resource-tab': {
                templateUrl: "app/components/authed-tabs/views-resource/views-resource.html",
                controller: 'authedTabViewsResourceCtrl'
              }
            },
          
          })
          .state('app.authed-tabs.profile', {
            url: "/profile",
            cache: false,
            views: {
              'profile-tab': {
                templateUrl: "app/components/authed-tabs/profile/profile.html",
                controller: 'authedTabProfileCtrl'
              }
            }
          });
  
  $urlRouterProvider.otherwise('/app/authed-tabs/profile');
}]);