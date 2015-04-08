var appControllers = angular.module('app.controllers', ['drupal.configurations', 'UserResourceModules', 'ApiAuthModules', 'common.accesss-control'])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'UserResourceChannel', 'accessControlConfig', 'drupalApiConfig', 'ApiAuthService', 'AccessControlService', 'UserResource', '$ionicPlatform', '$state',
                             function ($rootScope,   $scope,   UserResourceChannel,   accessControlConfig,   drupalApiConfig,   ApiAuthService,   AccessControlService,  UserResource,   $ionicPlatform,   $state ) {
	
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
	
	$scope.$on('$ionicView.enter', function() {
		 
	 	// if its the users first visit to the app play the apps tour
	 	  if ( $rootScope.firstVisit === false) { 
	 		$state.go('tour'); 	
	 		return;
	 	  }   
	 	 
	 	 /**/
	 	  //if user never registered 
	 	 
	 	  if ( $rootScope.isRegistered === false) { 
	 		 console.log($rootScope.isRegistered === false); 
	 		$state.go('app.register'); 	
	 		return;
	 	  }  
		
		//redirects 
		if  ($state.current.name == 'app.login' || $state.current.name == 'app.register') {
			if(ApiAuthService.getConnectionState()) {
				$state.go('app.authed-tabs.profile');
			}
	    } 
		
		//redirect if no permissions
		if ( ('data' in $state.current) && ('access' in $state.current.data) && !AccessControlService.authorize($state.current.data.access) ) {
	        if ($scope.isRegistered) { $state.go('app.login'); } 
	        else { $state.go('app.register'); } 
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
	UserResourceChannel.onUserLogoutConfirmed($rootScope, function(data) { console.log('app-controller on logout');  $scope.isLoggedIn = false;  $state.go('app.login'); 	 });
    	
	//
	// Auth redirects events
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