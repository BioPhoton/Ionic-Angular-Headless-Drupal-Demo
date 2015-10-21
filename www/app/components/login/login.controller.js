var loginControllers = angular.module('drupalionicDemo.login.controller', ['ngDrupal7Services-3_x.resources.user'])

loginControllers.controller('LoginCtrl', ['$scope', '$localStorage',  '$rootScope', 'UserResource',
                                 function ($scope,   $localStorage,    $rootScope,   UserResource ) {

    vm.loginData = {
      username: '',
      password: ''
    };
    
    vm.loginIsPending = false;
    vm.login = login;
    
    ///////////////
    
    function login (form) {
    	
      vm.loginServerErrors = '';
      if (form.$valid) {
    	  
        vm.loginIsPending = true;
        UserResource.login(vm.loginData.username, vm.loginData.password)
        .then(
    		function (data) {
    		  vm.loginIsPending = false;
    		  $localstorage.setItem('isRegistered', true);
    			
	          //reste form
	          form.$error = {};
	          form.$pristine = true;
	          form.$dirty = false;
	          form.$valid = true;
	          form.$invalid = false;
	          
	          $scope.app.$state.go('app.authed-tabs.profile');
	        }, 
	        //error
	        function (data) {
	          vm.loginIsPending = false;
	          vm.loginServerErrors = data;
	        }
	     );
      }
    };

  }]);