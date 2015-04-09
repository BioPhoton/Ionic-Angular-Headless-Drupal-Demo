var loginControllers = angular.module('login.controllers', ['UserResourceModules'])

loginControllers.controller('LoginCtrl', ['$scope', '$localstorage', '$state', '$rootScope', 'UserResource',
                                 function ($scope,   $localstorage,   $state,   $rootScope,   UserResource) {
    $scope.message = "";
    $scope.doingLogin = false;
    $scope.loginData = {
      username: '',
      password: ''
    };
    $scope.login = function (form) {
      $scope.loginServerErrors = '';
      if (form.$valid) {

        $scope.doingLogin = true;
        UserResource.login($scope.loginData.username, $scope.loginData.password)
        .then(
        		
    		function (data) {
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
	          
	        }, 
	        //error
	        function (data) {
	          $scope.loginServerErrors = data;
	        }
	     );
      }
    };

  }]);