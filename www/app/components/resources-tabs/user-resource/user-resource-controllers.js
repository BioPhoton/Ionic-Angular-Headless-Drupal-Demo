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

			   //Retrieve
			   $scope.userRetrieveRequests = [];
			   
			   $scope.callUserRecourceRetrieve = function(uid) {
				   
				   var requestEnd = requestStart = Date.now();
				   UserResource.retrieve(uid).then(
				    		//success
				    		function(data) {
				    			requestEnd = Date.now();
				    			$scope.userRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    			requestEnd = Date.now();
				    			$scope.userRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		}
				    );
			   };
			   
			   //Index
			   
			   $scope.userIndexRequests = [];
			   
			   //get params for index request
			   $scope.userIndex = {};
			   $scope.userIndex.page = null;
			   $scope.userIndex.fields = null;
			   $scope.userIndex.parameters = null;
			   $scope.userIndex.pagesize = null;
			   
			   $scope.callUserRecourceIndex = function(userIndex) {
				   var requestStart = Date.now();
				   UserResource.index(userIndex.page, userIndex.fields, userIndex.parameters, userIndex.pagesize).then(
				    		//success
				    		function(data) {
				    		
				    			 var requestEnd = Date.now();
				    			$scope.userIndexRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    		
				    			$scope.userIndexRequests.push( {requestStart:requestStart, data:data});
				    		}
				    );
			    };
			    
			   
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


