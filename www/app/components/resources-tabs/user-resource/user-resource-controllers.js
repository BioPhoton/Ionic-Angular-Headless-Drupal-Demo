/* Controllers of apiServicesControllers component */
//______________________________________________

var userResourceControllers = angular.module('resources.user-resource.controllers', ['UserResourceModules']);

/* User Resource Controller */
userResourceControllers.controller('ResourcesUserResourceCtrl', 
		   ['$scope', 'UserResource', 'UserResourceChannel', 
    function($scope,   UserResource,   UserResourceChannel) {
			  
			 //
			 //UserResource
			 //
			   var requestEnd = requestStart = undefined;

			   //Retrieve
			   $scope.userRetrieveRequests = [];
			   
			   $scope.callUserRecourceRetrieve = function(uid) {
				   
				   requestStart = Date.now();
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
				   requestStart = Date.now();
				   UserResource.index(userIndex.page, userIndex.fields, userIndex.parameters, userIndex.pagesize).then(
				    		//success
				    		function(data) {
				    		
				    			requestEnd = Date.now();
				    			$scope.userIndexRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    			requestEnd = Date.now();
				    			$scope.userIndexRequests.push( {requestStart:requestStart, data:data});
				    		}
				    );
			    };
			    
			   
			   //Token
			   $scope.userTokenRequests = [];
			   $scope.callUserRecourceToken = function() {
				   		requestStart = Date.now();
			   			UserResource.token()
			   		    .then(
			   		    		//success
			   		    		function(token) { console.log('user token success'); },
			   		    		//error
			   		    		function(data) { console.log('user token error'); }
			   		    );
			   };
			   //
			   UserResourceChannel.onUserTokenConfirmed($scope, function(token) { 
				   requestEnd = Date.now();
				   console.log('onUserTokenConfirmed'); 
				   $scope.userTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:token});
			   });
			   UserResourceChannel.onUserTokenFailed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserTokenFailed'); 
				   $scope.userTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
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