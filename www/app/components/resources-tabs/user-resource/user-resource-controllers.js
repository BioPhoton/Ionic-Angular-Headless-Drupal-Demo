/* Controllers of apiServicesControllers component */
//______________________________________________

var userResourceControllers = angular.module('resources.user-resource.controllers', ['UserResourceModules']);

/* User Resource Controller */
userResourceControllers.controller('ResourcesUserResourceCtrl', 
		   ['$scope', 'UserResource', 'UserResourceChannel', 
    function($scope,   UserResource,   UserResourceChannel) {
			   $scope.toggleRequest = function(request) {
				     if ($scope.isRequestShown(request)) {
				       $scope.shownRequest = null;
				     } else {
				       $scope.shownRequest = request;
				     }
				   };
				   $scope.isRequestShown = function(request) {
				     return $scope.shownRequest === request;
				   };
			   			   
				   var requestEnd = requestStart = undefined;
				   //for attache file tests to detect browser or phone
				   $scope.isWebview = ionic.Platform.isWebView();
			   
			   
			 //
			 //UserResource
			 //

			   //Retrieve
			   $scope.userRetrieveRequests = [];
			   
			   $scope.callUserRecourceRetrieve = function(uid) {
				   
				   requestStart = Date.now();
				   UserResource.retrieve(uid).then(
				    		//success
						   function(data) { console.log('user retrieve success'); },
				    		//error
						   function(data) { console.log('user retrieve error'); }
						   );
			   }
			   //
			   UserResourceChannel.onUserRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserRetrieveConfirmed'); 
				   $scope.userRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   UserResourceChannel.onUserRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserRetrieveFailed'); 
				   $scope.userRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			 //Create
				  
			   $scope.userCreateRequests = [];
			    
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.userCreate = {};
			   $scope.userCreate.name = 'test_name';
			   $scope.userCreate.mail = 'test@name.com';
			   $scope.userCreate.pass = 'testPassword';
			     
			   $scope.callUserRecourceCreate = function(user) {
				   requestStart = Date.now();
				   UserResource.create(user).then(
				    		//success
				    		function(data) {
				    			console.log('user create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('user create request error'); 
				    		}
				    );
			    };
			    //
			   UserResourceChannel.onUserCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.userCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   UserResourceChannel.onUserCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.userCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
				   //Update
				  
				   $scope.userUpdateRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.userUpdate = {};
				   $scope.userUpdate.uid = null;
				   $scope.userUpdate.name = 'test_name';
				   
				  
				   $scope.callUserRecourceUpdate = function(user) {
					   
					   var updateNid = user.uid;
					   delete user.uid;
					   
					   requestStart = Date.now();
					   UserResource.update(updateNid, user).then(
					    		//success
					    		function(data) {
					    			console.log('user update request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('user update request error'); 
					    		}
					    );
				    };
				    //
				   UserResourceChannel.onUserUpdateConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.userUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				   UserResourceChannel.onUserUpdateFailed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.userUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				    
			    
				   //Delete
				   $scope.userDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.userDelete = {};
				   $scope.userDelete.uid = null;

				   $scope.callUserRecourceDelete = function(nid) {
					   requestStart = Date.now();
					   UserResource._delete(nid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('user delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('user delete request error'); 
					    		}
					    );
				    };
				    //
					UserResourceChannel.onUserDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.userDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					UserResourceChannel.onUserDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.userDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
			   
			   
			   
			   //Index
			   $scope.userIndexRequests = [];
			   
			   //get params for index request
			   $scope.userIndex = {};
			   $scope.userIndex.page = 0;
			   $scope.userIndex.fields = "uid,name,mail,theme,signature,signature_format,created,access,login,status,timezone,language,picture,init,data";
			   $scope.userIndex.parameters = "uid=1";
			   $scope.userIndex.pagesize = 5;
			   
			   $scope.callUserRecourceIndex = function(userIndex) {
				   requestStart = Date.now();
				   UserResource.index(userIndex.page, userIndex.fields, userIndex.parameters, userIndex.pagesize).then(
				    		//success
				    		function(data) { console.log('user index success'); },
				    		//error
				    		function(data) {console.log('user index error');}
				    );
			    };
			   //
			   UserResourceChannel.onUserIndexConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserIndexConfirmed'); 
				   $scope.userIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   UserResourceChannel.onUserIndexFailed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserIndexFailed'); 
				   $scope.userIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
			   
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