var appControllers = angular.module('app.controllers', ['drupal.configurations', 'UserResourceModules', 'ApiAuthModules', 'common.accesss-control'])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'UserResourceChannel', 'accessControlConfig', 'drupalApiConfig', 'ApiAuthService', 'AccessControlService', 'UserResource', '$ionicPlatform', '$state',
                             function ($rootScope,   $scope,   UserResourceChannel,   accessControlConfig,   drupalApiConfig,   ApiAuthService,   AccessControlService,   UserResource,   $ionicPlatform,   $state ) {
	
	$ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

	$scope.pathToCms 	= drupalApiConfig.drupal_instance;
	
	$scope.logout = function () { UserResource.logout(); };
	//used in base-menu template
	$scope.accessLevels = accessControlConfig.accessLevels;
	
	//
	// App redirects events
	//
    
    // on logou request confirmed do logout redirect
	UserResourceChannel.onUserLogoutConfirmed($scope, function(data) { $scope.isLoggedIn = false;  $state.go('app.login'); 	 });
    	
	//
	// Auth redirects events
	//
	
    // on login request confirmed do login redirect
	UserResourceChannel.onUserLoginConfirmed($scope, function(data) { $scope.isLoggedIn = true;   $state.go('app.authed-tabs.profile'); });
    
    //
    // Show hide network connection bar
    //
	$scope.isOffline = false;
    // on inet offline
	$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){ 
		$scope.isOffline = true;
	})
    // on inet online
    // NOTICE this event fires only on "resume online"
	$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
		$scope.isOffline = false;
	});


  }]);