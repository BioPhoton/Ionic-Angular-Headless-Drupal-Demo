var tabsProfileControllers = angular.module('authed-tabs.profile.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);

tabsProfileControllers.controller('authedTabProfileCtrl', ['$scope','drupalApiNotificationChannel', 'DrupalAuthenticationService',
                                                  function ($scope,  drupalApiNotificationChannel,   DrupalAuthenticationService) {

	$scope.user = DrupalAuthenticationService.getCurrentUser(); 
	// on login request confirmed set userdata
	var onCurrentUserUpdatedHandler = function(data) { 
		$scope.user = DrupalAuthenticationService.getCurrentUser(); 
	};
	drupalApiNotificationChannel.onCurrentUserUpdated($scope, onCurrentUserUpdatedHandler);
	
	$scope.$watch("user.name", function(newValue, oldValue) {
	    if (newValue != oldValue) {
	    	//do this debounced
	    	console.log('save changes in db');
	    }
	  });
  }]);
