var loginControllers = angular.module('login.controllers', ['UserResourceModules'])

loginControllers.controller('LoginCtrl', ['$scope', '$localstorage', '$state', '$rootScope', 'UserResource', 'UserResourceChannel',
                                 function ($scope,   $localstorage,   $state,   $rootScope,   UserResource,   UserResourceChannel) {
    $scope.message = "";
    $scope.doingLogin = false;
    $scope.loginData = {
      username: '',
      password: ''
    };
    
    $scope.loginIsPending = false;
    
    $scope.login = function (form) {
      $scope.loginServerErrors = '';
      if (form.$valid) {

        $scope.loginIsPending = true;
        UserResource.login($scope.loginData.username, $scope.loginData.password)
        .then(
        		
    		function (data) {
    		  $scope.loginIsPending = false;
    		  $localstorage.setItem('isRegistered', true);
              $rootScope.isRegistered = true;
    			
	          //reset form data
	          $scope.loginData = {};
	          
	          //reste form
	          //@TODO create formhelper for reste function
	          form.$error = {};
	          form.$pristine = true;
	          form.$dirty = false;
	          form.$valid = true;
	          form.$invalid = false;
	          
	          $state.go('app.authed-tabs.profile');
	        }, 
	        //error
	        function (data) {
	          $scope.loginIsPending = false;
	          $scope.loginServerErrors = data;
	        }
	     );
      }
    };

  }]);