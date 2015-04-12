var appControllers = angular.module('app.controllers', ['drupal.configurations', 'UserResourceModules', 'common.accesss-control'])

appControllers.controller('AppCtrl', ['$rootScope', '$scope',  'UserResource', 'accessControlConfig', 'drupalApiConfig', '$ionicPlatform', '$state',
                             function ($rootScope,   $scope,    UserResource,   accessControlConfig,   drupalApiConfig,   $ionicPlatform,   $state ) {
	
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
	//used in base-menu template
	$scope.accessLevels = accessControlConfig.accessLevels;
	
	$scope.logout = function () { 
		 $rootScope.$broadcast('loading:show', { loading_settings : {template:"<p><ion-spinner></ion-spinner><br/>Logging out...</p>"} });
		UserResource.logout().then(
				//success
				function() {
					$rootScope.$broadcast('loading:hide');
					$state.go('app.login');
				},
				//error
				function() {
					$rootScope.$broadcast('loading:hide');
				}
		); 
	
	};
	
   	
}]);