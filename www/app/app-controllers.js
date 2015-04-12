var appControllers = angular.module('app.controllers', ['drupal.configurations', 'UserResourceModules', 'ApiAuthModules', 'ngCordova'])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', 'UserResourceChannel', 'UserResource', 'accessControlConfig', 'drupalApiConfig', '$ionicPlatform', '$state',
                             function ($rootScope,   $scope,   UserResourceChannel,   UserResource,   accessControlConfig,   drupalApiConfig,   $ionicPlatform,   $state ) {
	
	$ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      
      // Show hide network connection bar
	  	$scope.isOffline = false;
	  	
	    // listen for Online event
	    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
	    	$scope.isOffline = false;
	    });

	    // listen for Offline event
	    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
	    	$scope.isOffline = true;
	    })

      
    });

	$scope.pathToCms 	= drupalApiConfig.drupal_instance;
	
	$scope.logout = function () { 
		 $rootScope.$broadcast('loading:show', { loading_settings : {template:"<p><ion-spinner></ion-spinner><br/>Logging out...</p>"} });
		UserResource.logout().then(
				//success
				function() {
					$rootScope.$broadcast('loading:hide');
				},
				//error
				function() {
					$rootScope.$broadcast('loading:hide');
				}
		); 
	
	};
	//used in base-menu template
	$scope.accessLevels = accessControlConfig.accessLevels;
	
	// App redirects events
    // on logou request confirmed do logout redirect
	UserResourceChannel.onUserLogoutConfirmed($scope, function(data) { $state.go('app.login'); });
   	
}]);