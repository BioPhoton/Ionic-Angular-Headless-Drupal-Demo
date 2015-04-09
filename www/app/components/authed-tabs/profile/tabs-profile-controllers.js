var tabsProfileControllers = angular.module('authed-tabs.profile.controllers', ['UserResourceModules']);

tabsProfileControllers.controller('authedTabProfileCtrl', ['$scope','ApiAuthChannel', 'ApiAuthService', 'drupalApiConfig', 'userObj',
                                                  function ($scope,  ApiAuthChannel,   ApiAuthService,   drupalApiConfig,   userObj) {

	$scope.pathToCms 	= drupalApiConfig.drupal_instance;
	$scope.user 		= userObj; 
	
	//this is noly active if page is present
	// on login request confirmed set userdata
	var onCurrentUserUpdatedHandler = function(data) { 
		$scope.user = ApiAuthService.getCurrentUser(); 
	};
	ApiAuthChannel.onCurrentUserUpdated($scope, onCurrentUserUpdatedHandler);
	
}]);
