var tabsProfileControllers = angular.module('authed-tabs.profile.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);

tabsProfileControllers.controller('authedTabProfileCtrl', ['$scope','drupalApiNotificationChannel',
                                                  function ($scope,  drupalApiNotificationChannel) {

	// on login request confirmed set userdata
	//@TODO check why function is not invoced
	var onUserLoginConfirmedHandler = function(data) { 
		console.log('login profile'); 
		$scope.user = data; 
	};
	drupalApiNotificationChannel.onUserLoginConfirmed($scope, onUserLoginConfirmedHandler);
	
	// on logou request confirmed delete userdata
	var onUserLogoutConfirmedHandler = function(data) { 
		console.log('logout profile'); 
		$scope.user = null; 
	};
	drupalApiNotificationChannel.onUserLogoutConfirmed($scope, onUserLogoutConfirmedHandler);
  }]);
