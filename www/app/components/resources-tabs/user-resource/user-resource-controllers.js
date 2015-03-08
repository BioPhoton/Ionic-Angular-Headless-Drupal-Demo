/* Controllers of apiServicesControllers component */
//______________________________________________

var userResourceControllers = angular.module('resources.user-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources' ]);

/* User Resource Controller */
userResourceControllers.controller('ResourcesUserResourceCtrl', 
		   ['$scope', 'UserResource', 'DrupalAuthenticationService', 'drupalApiNotificationChannel', 
    function($scope,   UserResource,   DrupalAuthenticationService,   drupalApiNotificationChannel) {
			  
			 //
			 //UserResource
			 //
			   
			 //token
			   $scope.userTokenRequests = [];
			   $scope.callUserRecourceToken = function() {
			   	   		var requestEnd = requestStart = Date.now();
			   			UserResource.token()
			   		    .then(
			   		    		//success
			   		    		function(token) {
			   		    			//DrupalAuthenticationService.setToken(token);
			   		    			requestEnd = Date.now();
			   		    			$scope.userTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:token});
			   		    		},
			   		    		//error
			   		    		function(data) {
			   		    			requestEnd = Date.now();
			   		    			$scope.userTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   		    		}
			   		    );
			   };
			   
			 //login
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
			 
		   //logout
		   $scope.lastTimeRequestToUserResourceLogout = null;
		   $scope.lastResultRequestToUserResourceLogout = null;
		   
		   $scope.callUserResourceLogout = function() {
				UserResource.logout();
		   }
			  
}]);


