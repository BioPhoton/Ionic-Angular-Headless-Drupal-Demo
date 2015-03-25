var appControllers = angular.module('app.controllers', ['drupal.configurations', 'UserResourceModules', 'ApiAuthModules'])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'UserResourceChannel', 'AppSettings', 'drupalApiConfig', 'ApiAuthService', 'UserResource', '$ionicPlatform', '$localstorage', '$state',
                             function ($rootScope,   $scope,   UserResourceChannel,   AppSettings,   drupalApiConfig,   ApiAuthService,   UserResource,   $ionicPlatform,   $localstorage,   $state ) {
	
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
	 
	$scope.accessLevels = AppSettings.accessLevels;
	
	//
	// App redirects
	//
    
    // on logou request confirmed do logout redirect
	UserResourceChannel.onUserLogoutConfirmed($rootScope, function(data) { console.log('app-controller on logout');  $scope.isLoggedIn = false;  $state.go('app.login'); 	 });
    	
	//
	// Auth redirects
	//
	
    // on login request confirmed do login redirect
	UserResourceChannel.onUserLoginConfirmed($rootScope, function(data) { console.log('app-controller on login');  $scope.isLoggedIn = true;   $state.go('app.authed-tabs.profile'); });
    
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