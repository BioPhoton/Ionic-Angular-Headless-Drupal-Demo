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
			   $scope.userIndex.fields = {};
			   $scope.userIndex.parameters = {};
			   $scope.userIndex.pagesize = 5;
			   
			   $scope.callUserRecourceIndex = function(userIndex) {
				   requestStart = Date.now();
				   UserResource.index(userIndex).then(
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
			   
			     //Register
				 $scope.userRegisterRequests = [];
				 
				 $scope.RegisterData = {};
				 $scope.RegisterData.name = "test-user1";
				 $scope.RegisterData.mail = "test@email1.com";
				 $scope.RegisterData.pass = "password";
				// $scope.RegisterData.theme = "theme";
				 $scope.RegisterData.signature = "signature";
				// $scope.RegisterData.signature_format = "plain_text";
				// $scope.RegisterData.created = "created";
				// $scope.RegisterData.access = "access";
				// $scope.RegisterData.login = "login";
				 $scope.RegisterData.status = 1;
				 //$scope.RegisterData.timezone = "timezone";
				 //$scope.RegisterData.language = "language";
				// $scope.RegisterData.picture = "picture";
				// $scope.RegisterData.roles = "roles";
				// $scope.RegisterData.field_nickname = "field_nickname";

				 
				 $scope.callUserResourceRegister = function(RegisterData) {
					    requestStart = Date.now();
						UserResource.register(RegisterData)
						    .then(
						    		//success
						    		function(data) { console.log('user register success');},
						    		//error
						    		function(data) { console.log('user register error');}
						    );
			    }
				 //
				   UserResourceChannel.onUserRegisterConfirmed($scope, function(token) { 
					   requestEnd = Date.now();
					   console.log('onUserRegisterConfirmed'); 
					   $scope.userRegisterRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:token});
				   });
				   UserResourceChannel.onUserRegisterFailed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserRegisterFailed'); 
					   $scope.userRegisterRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
			   
			 //Login
				 $scope.userLoginRequests = [];
				 
				 $scope.LoginData = {};
				 $scope.LoginData.username = "basic-user";
				 $scope.LoginData.password = "basic-user";
				 
				 $scope.callUserResourceLogin = function(LoginData) {
					    requestStart = Date.now();
						UserResource.login(LoginData.username, LoginData.password)
						    .then(
						    		//success
						    		function(data) { console.log('user login success');},
						    		//error
						    		function(data) { console.log('user login error');}
						    );
			    }
				 //
				   UserResourceChannel.onUserLoginConfirmed($scope, function(token) { 
					   requestEnd = Date.now();
					   console.log('onUserLoginConfirmed'); 
					   $scope.userLoginRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:token});
				   });
				   UserResourceChannel.onUserLoginFailed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserLoginFailed'); 
					   $scope.userLoginRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
			   
			 //Logout
			 $scope.userLogoutRequests = [];
			 $scope.callUserRecourceLogout = function() {
				    requestStart = Date.now();
					UserResource.logout()
					    .then(
					    		//success
					    		function(data) { console.log('user logout success');},
					    		//error
					    		function(data) { console.log('user logout error');}
					    );
		    }
			 //
			   UserResourceChannel.onUserLogoutConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserLogoutConfirmed'); 
				   $scope.userLogoutRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   UserResourceChannel.onUserLogoutFailed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserLogoutFailed'); 
				   $scope.userLogoutRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			 //RequestNewPassword
			 $scope.userRequestNewPasswordRequests = [];
			 
			 $scope.RequestNewPasswordData = {};
			 $scope.RequestNewPasswordData.name = "basic-user";
			 
			 $scope.callUserResourceRequestNewPassword = function(RequestNewPasswordData) {
				    requestStart = Date.now();
					UserResource.request_new_password(RequestNewPasswordData.name)
					    .then(
					    		//success
					    		function(data) { console.log('user request_new_password success');},
					    		//error
					    		function(data) { console.log('user request_new_password error');}
					    );
		    }
			 //
			   UserResourceChannel.onUserRequestNewPasswordConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserRequestNewPasswordConfirmed'); 
				   $scope.userRequestNewPasswordRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   UserResourceChannel.onUserRequestNewPasswordFailed($scope, function(data) { 
				   requestEnd = Date.now();
				   console.log('onUserRequestNewPasswordFailed'); 
				   $scope.userRequestNewPasswordRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
		  
			 //Cancel
				 $scope.userCancelRequests = [];
				 
				 $scope.CancelData = {};
				 $scope.CancelData.uid = "12";
				 
				 $scope.callUserCancle = function(CancelData) { 
					 requestStart = Date.now();
					 UserResource.cancel(CancelData.uid)
					    .then(
					    		//success
					    		function(data) { console.log('user cancle success');},
					    		//error
					    		function(data) { console.log('user cancle error');}
					    );
				 };
				 
				 //
				 UserResourceChannel.onUserCancelConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserCancelConfirmed'); 
					   $scope.userCancelRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
				 UserResourceChannel.onUserCancelFailed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserCancelFailed'); 
					   $scope.userCancelRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
				 
				 //Password Reset
				 $scope.userPasswordResetRequests = [];
				 
				 $scope.PasswordResetData = {};
				 $scope.PasswordResetData.uid = "12";
				 
				 $scope.callUserPasswordReset = function(PasswordResetData) { 
					
					 requestStart = Date.now();
					 UserResource.password_reset(PasswordResetData.uid)
					    .then(
					    		//success
					    		function(data) { console.log('user password_reset success');},
					    		//error
					    		function(data) { console.log('user password_reset error');}
					    );
				 };
				 
				 //
				 UserResourceChannel.onUserPasswordResetConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserPasswordResetConfirmed'); 
					   $scope.userPasswordResetRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
				 UserResourceChannel.onUserPasswordResetFailed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserPasswordResetFailed'); 
					   $scope.userPasswordResetRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
				 
				//Resend Welcome Email
				 $scope.userResendWelcomeEmailRequests = [];
				 
				 $scope.ResendWelcomeEmailData = {};
				 $scope.ResendWelcomeEmailData.uid = "12";
				 
				 $scope.callUserResendWelcomeEmail = function(ResendWelcomeEmailData) { 
					
					 requestStart = Date.now();
					 UserResource.resend_welcome_email(ResendWelcomeEmailData.uid)
					    .then(
					    		//success
					    		function(data) { console.log('user resend_welcome_email success');},
					    		//error
					    		function(data) { console.log('user resend_welcome_email error');}
					    );
				 };
				 
				 //
				 UserResourceChannel.onUserResendWelcomeEmailConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserPasswordResetConfirmed'); 
					   $scope.userResendWelcomeEmailRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
				 UserResourceChannel.onUserResendWelcomeEmailFailed($scope, function(data) { 
					   requestEnd = Date.now();
					   console.log('onUserResendWelcomeEmailFailed'); 
					   $scope.userResendWelcomeEmailRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				 });
			  
			  
}]);