var loginControllers = angular.module('no-network.controllers', ['ngCordova'])

loginControllers.controller('NoNetworkCtrl', ['$scope',  '$state', '$cordovaNetwork', 
                                     function ($scope,    $state,   $cordovaNetwork) {
  
	$scope.checkConnection = function() {
		if($cordovaNetwork.isOnline()) {
			$state.go('app.login');
		}
	}
	
  }]);