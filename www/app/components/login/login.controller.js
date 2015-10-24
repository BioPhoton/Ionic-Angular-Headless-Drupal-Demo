;(function() {
	'use strict';
	   
	angular
		.module('drupalionicDemo.login.controller', ['ngDrupal7Services-3_x.commons.authentication'])
		.controller('LoginController', LoginController);
		
	LoginController.$inject= ['$scope', 'AuthenticationService'];
	
	function LoginController($scope, AuthenticationService) {
		
		// jshint validthis: true 
		var vm = this;
		
		vm.loginData = {
			      username: '',
			      password: ''
			    };
			    
		vm.loginServerErrors = '';
	    vm.loginIsPending = false;
	    
	    vm.doLogin = doLogin;
			    
		///////////////
			    
		function doLogin (form) {
			    	
			     
			      if (form.$valid) {
			    	  vm.loginServerErrors = '';
			        vm.loginIsPending = true;
			        AuthenticationService.login(vm.loginData)
			        .then(
			    		function (data) {
			    		  vm.loginIsPending = false;
			    		 			    			
				          //reste form
				          form.$error = {};
				          form.$pristine = true;
				          form.$dirty = false;
				          form.$valid = true;
				          form.$invalid = false;
				          
				          $scope.app.$state.go('app.profile');
				        }, 
				        //error
				        function (data) {
				          vm.loginIsPending = false;
				          vm.loginServerErrors = data;
				        }
				     );
			      }
		};
	};
	
	
	
})();