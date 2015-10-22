;(function() {
    'use strict';


angular
    .module('drupalionicDemo.register.controller', ['ngDrupal7Services-3_x.resources.user', 'ngDrupal7Services-3_x.commons.authentication', 'ngStorage'])
    .controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', 'UserResource', 'AuthenticationService', '$localStorage'];

	/** @ngInject */ 
	function RegisterController($scope, UserResource, AuthenticationService, $localStorage) 
	{ 
		// jshint validthis: true 
		var vm = this;
		
		vm.registerData = { 
			      name: '',
			      mail: '',
			      pass: ''
			    };
			    
	    vm.registerIsPending = false; 
	    
	    vm.doRegister = doRegister;
	    	
	    /////////////
	    	
	    function doRegister(form) {
	    	
	      if (form.$valid) {
	    	  vm.registerIsPending = true; 
	    	 UserResource.register(vm.registerData)
	    	  		//register
	                .then(
	                    function (data) {
	                      $localStorage.isRegistered = true;
	                      
	                      return AuthenticationService.login({ username: vm.registerData.name, password : vm.registerData.pass});
	                    }
	                )
	                //login
	                .then(
	            		 function (data) {
	                           vm.registerIsPending = false; 
	                           //reset form
	                           vm.registerData = {};
	                           
	                           //reste form
	                           form.$error = {};
	                           form.$pristine = true;
	                           form.$dirty = false;
	                           form.$valid = true;
	                           form.$invalid = false;
	                           
	                       	   $scope.app.$state.go('app.login');
	                      },
	                      function (data) {
	                           	vm.registerServerErrors = data;
	                      }
	                )
	                .catch(
	                    function (data) {
	                      vm.registerIsPending = false; 
	                      vm.registerServerErrors = data.form_errors;
	                    }
	                );
	      		}
	      
	    };
			    
			    
		
		
	};

})();
