var tabsProfileControllers = angular.module('authed-tabs.profile.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);

tabsProfileControllers.controller('authedTabProfileCtrl', ['$scope','drupalApiNotificationChannel', 'DrupalAuthenticationService',
                                                  function ($scope,  drupalApiNotificationChannel,   DrupalAuthenticationService) {

	$scope.user = DrupalAuthenticationService.getCurrentUser(); 
	// on login request confirmed set userdata
	var onCurrentUserUpdatedHandler = function(data) { 
		console.log('onCurrentUserUpdated profile'); 
		$scope.user = DrupalAuthenticationService.getCurrentUser(); 
	};
	drupalApiNotificationChannel.onCurrentUserUpdated($scope, onCurrentUserUpdatedHandler);
	
  }]);
