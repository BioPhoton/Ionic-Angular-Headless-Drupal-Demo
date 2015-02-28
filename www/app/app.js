// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var drupalIonicAngularJSAPIClient = angular.module('drupalIonicAngularJSAPIClient', ['ionic',
  'drupalIonicAngularJSAPIClient.configuration',
  'common.services.localstorage',

  //this is the good one
  'common.drupal.api-services',
  'LocalForageModule',
  'app.controllers',
  'tour.controllers',
  'login.controllers',
  'logout.controllers',
  'register.controllers',

  'anon-tabs.node-resource.controllers',
  'anon-tabs.system-resource.controllers',
  'anon-tabs.user-resource.controllers',
  'anon-tabs.views-resource.controllers',

  'authed-tabs.views-resource.controllers',
  'authed-tabs.profile.controllers',

]);

drupalIonicAngularJSAPIClient.run(['$rootScope','$ionicPlatform', '$localstorage', '$ionicLoading', 'drupalApiNotificationChannel', 'DrupalAuthenticationService', '$state',
                          function ($rootScope,  $ionicPlatform,   $localstorage,   $ionicLoading,   drupalApiNotificationChannel,   DrupalAuthenticationService,   $state) {
   
    //restrict access redirects
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      var firstVisit = $localstorage.getItem('firstVisit');
      var hasLoggedIn = $localstorage.getItem('hasLoggedIn');

      if (!('data' in toState) || !('access' in toState.data)) {
        //event.preventDefault();
      }

      else if (!DrupalAuthenticationService.authorize(toState.data.access)) {
        event.preventDefault();
        if (firstVisit && hasLoggedIn) {
          $state.go('app.login');
        } else if (firstVisit && !hasLoggedIn) {
          $state.go('app.register');
        } else {
          $state.go('app.tour');
        };
      }
      
      //custom redirects
      if (toState.name == 'app.login' || toState.name == 'app.register') {
        if ($rootScope.isAuthed) {
          event.preventDefault();
          $state.go('app.authed-tabs.profile');
        }
      }
    });

}]);

drupalIonicAngularJSAPIClient.config(function ($stateProvider, $urlRouterProvider, $httpProvider, DrupalAPISettings) {
	
  //@TODO move this into authservice
  $httpProvider.defaults.withCredentials = true;
	 
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
	  .state('app.anon-tabs', {
	    url: '/anon-tabs',
	    abstract: true,
	    views: {
		      'menuContent': {
		    	templateUrl: 'app/components/anonymous-tabs/anonymous-tabs.html',
		      }
		    }
	  })
	 
	  //Node Resource
	  //______________________________________________
	   .state('app.anon-tabs.node-resource', {
	    url: '/node-recource',
	    views: {
		      'node-resource': {
		    	templateUrl: 'app/components/anonymous-tabs/node-resource/anon-tabs-node-resource.html',
		  		controller:  'anonTabNodeResourceCtrl' 
		      }
		    }
	   })
	 
	  //System Resource
	  //______________________________________________
	   .state('app.anon-tabs.system-resource', {
	    url: '/system-recource',
	    views: {
		      'system-resource': {
		    	templateUrl: 'app/components/anonymous-tabs/system-resource/anon-tabs-system-resource.html',
		  		controller:  'anonTabSystemResourceCtrl' 
		      }
		    }
	   })
	   
	   //User Resource
	   //______________________________________________
	   .state('app.anon-tabs.user-resource', {
	    url: '/user-recource',
	    views: {
		      'user-resource': {
		    	templateUrl: 'app/components/anonymous-tabs/user-resource/anon-tabs-user-resource.html',
		  		controller:  'anonTabUserResourceCtrl' 
		      }
		    }
	   })
	    //Views Resource
	   //______________________________________________
	   .state('app.anon-tabs.views-resource', {
	    url: '/views-recource',
	    views: {
		      'views-resource': {
		    	templateUrl: 'app/components/anonymous-tabs/views-resource/anon-tabs-views-resource.html',
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
}
);