var appControllers = angular.module('app.controllers', ['common.drupal.api-services', 'common.drupal.api-resources',])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'drupalApiNotificationChannel', 'DrupalAPISettings', 'DrupalAuthenticationService', 'UserResource', '$ionicPlatform', '$localstorage', '$state',
                             function ($rootScope,   $scope,   drupalApiNotificationChannel,   DrupalAPISettings,   DrupalAuthenticationService,   UserResource,   $ionicPlatform,   $localstorage,   $state) {
   
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
	
	$scope.accessLevels = DrupalAPISettings.accessLevels;
	
	
	//user login state
    $scope.isLoggedIn = DrupalAuthenticationService.getConnectionState();
    //on connectionstate changed/inited update loginstate
	var onConnectionStateUpdatedHandler = function(data) {
		 $scope.isLoggedIn = DrupalAuthenticationService.getConnectionState();
	};
	drupalApiNotificationChannel.onConnectionStateUpdated($scope, onConnectionStateUpdatedHandler);
    
	//
	// App redirects
	//
    
    // on logou request confirmed do logout redirect
	var onUserLogoutConfirmedHandler = function(data) {  
		console.log('logout app controller');
		$state.go('app.login');
	};
	drupalApiNotificationChannel.onUserLogoutConfirmed($rootScope, onUserLogoutConfirmedHandler);
	
    $scope.logout = function () { UserResource.logout(); };
    	
	//
	// Auth redirects
	//
	
    // on login request confirmed do login redirect
	var onUserLoginConfirmedHandler = function(data) { 
		console.log('login app controller');    
		$state.go('app.authed-tabs.profile'); 
	};
	drupalApiNotificationChannel.onUserLoginConfirmed($rootScope, onUserLoginConfirmedHandler);
    
    //
    // Show hide network connection bar
    //
	  
	$scope.isOffline = false;
    //for testing
	$scope.toggleIsOffline = function() { $scope.isOffline = !$scope.isOffline; }
	
    // on inet offline
    $ionicPlatform.on('offline', function () {
      $scope.isOffline = true;
    });

    // on inet online
    // NOTICE this event fires only on "resume online"
    $ionicPlatform.on('online', function () {
      $scope.isOffline = false;
    });

  }]);