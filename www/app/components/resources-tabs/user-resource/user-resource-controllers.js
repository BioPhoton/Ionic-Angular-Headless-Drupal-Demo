/* Controllers of apiServicesControllers component */
//______________________________________________

var userResourceControllers = angular.module('resources.user-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources' ]);


/* User Resource Controller */
userResourceControllers.controller('ResourcesUserResourceCtrl', 
		   ['$scope', 'UserResource', 'drupalApiNotificationChannel', 
    function($scope,   UserResource,   drupalApiNotificationChannel) {
			   
			 //UserResource
			 $scope.lastTimeRequestToUserResourceLogin = null;
			 $scope.lastResultRequestToUserResourceLogin = null;
			   
			 $scope.callUserResourceLogin = function(loginData) {
					$scope.lastTimeRequestToUserResourceLogin = Date.now();
					UserResource.login(  loginData.username,  loginData.password )
					    .then(
					    		//success
					    		function(data) {
					    			
					    			$scope.lastResultRequestToUserResourceLogin = data;
					    		},
					    		//error
					    		function(data) {
					    			
					    			$scope.lastResultRequestToUserResourceLogin = data;
					    		}
					    );
			 }
			   
		   $scope.lastTimeRequestToUserResourceLogout = null;
		   $scope.lastResultRequestToUserResourceLogout = null;
		   
		   $scope.callUserResourceLogout = function() {
				UserResource.logout();
		   }
			  
}]);


