var tabsProfileControllers = angular.module('authed-tabs.profile.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);

tabsProfileControllers.controller('authedTabProfileCtrl', ['$scope','drupalApiNotificationChannel', 'DrupalAuthenticationService', 'drupalApiServiceConfig', 'userObj',
                                                  function ($scope,  drupalApiNotificationChannel,   DrupalAuthenticationService, drupalApiServiceConfig, userObj) {

	$scope.pathToCms 	= drupalApiServiceConfig.drupal_instance;
	$scope.user 		= userObj; 
	
	//this is noly active if page is present
	// on login request confirmed set userdata
	var onCurrentUserUpdatedHandler = function(data) { 
		console.log('onCurrentUserUpdatedHandler'); 
		$scope.user = DrupalAuthenticationService.getCurrentUser(); 
	};
	drupalApiNotificationChannel.onCurrentUserUpdated($scope, onCurrentUserUpdatedHandler);
	
}]);
