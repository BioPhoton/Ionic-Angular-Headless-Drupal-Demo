var appControllers = angular.module('app.controllers', ['common.drupal.api-services', 'common.drupal.api-resources',])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'drupalApiNotificationChannel', 'UserResource', '$ionicPlatform', '$localstorage', '$state',
                             function ($rootScope,   $scope,   drupalApiNotificationChannel,   UserResource,   $ionicPlatform,   $localstorage,   $state) {
   
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
	
	//
	// App redirects
	//
	
	// if its the user first visit to the app play the apps tour
    if (!$localstorage.getItem('firstVisit')) { $state.go('app.tour'); }
    
    $scope.toggleIsOffline = function() { $scope.isOffline = !$scope.isOffline; }
    
    $scope.isOffline = true;

    // @TODO replace this with acl service
    $scope.isAuthed = false;

    $scope.logout = function () { UserResource.logout(); };
    	
	//
	// Auth redirects
	//
	
    // on login request confirmed do login redirect
	var onUserLoginConfirmedHandler = function(data) { 
		console.log('login app');    
		$localstorage.setItem('hasLoggedIn', 1);
		$scope.isAuthed = true;
		//$state.go('app.authed-tabs.profile'); 
	};
	drupalApiNotificationChannel.onUserLoginConfirmed($rootScope, onUserLoginConfirmedHandler);
	
	// on logou request confirmed do logout redirect
	var onUserLogoutConfirmedHandler = function(data) {  
		console.log('logout app');
		$localstorage.removeItem('hasLoggedIn');
		$scope.isAuthed = false;
		//$state.go('app.login');
	};
	drupalApiNotificationChannel.onUserLogoutConfirmed($rootScope, onUserLogoutConfirmedHandler);
    
    //
    // Show hide network connection bar
    //
    
    // on inet offline
    $ionicPlatform.on('offline', function () {
      $scope.isOffline = true;
    });

    // on inet online
    // NOTICE this event fires only on "resume online" so we have to init server loop manually in inti()
    $ionicPlatform.on('online', function () {
      $scope.isOffline = false;
    });

  }]);