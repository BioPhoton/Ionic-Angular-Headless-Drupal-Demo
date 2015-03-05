var appControllers = angular.module('app.controllers', ['common.drupal.api-services', 'common.drupal.api-resources',])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'drupalApiNotificationChannel', 'AppSettings', 'DrupalAuthenticationService', 'UserResource', '$ionicPlatform', '$localstorage', '$state',
                             function ($rootScope,   $scope,   drupalApiNotificationChannel,   AppSettings,   DrupalAuthenticationService,   UserResource,   $ionicPlatform,   $localstorage,   $state ) {
	
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
	
	$scope.logout = function () { UserResource.logout(); };
	 
	$scope.accessLevels = AppSettings.accessLevels;
	
	//user login state
    $scope.isLoggedIn = DrupalAuthenticationService.getConnectionState();
  
	//
	// App redirects
	//
    
    // on logou request confirmed do logout redirect
	drupalApiNotificationChannel.onUserLogoutConfirmed($rootScope, function(data) {  $scope.isLoggedIn = false;  $state.go('app.login'); 	 });
    	
	//
	// Auth redirects
	//
	
    // on login request confirmed do login redirect
	drupalApiNotificationChannel.onUserLoginConfirmed($rootScope, function(data) {  $scope.isLoggedIn = true;   $state.go('app.authed-tabs.profile'); });
    
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