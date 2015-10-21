;(function() {
    'use strict';


angular
    .module('drupalionicDemo.register.controller', ['ngDrupal7Services-3_x.resources.user', 'ngStorage'])
    .controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', 'UserResource', '$localStorage'];

	/** @ngInject */ 
	function RegisterController($scope, UserResource, $localStorage) 
	{ 
		// jshint validthis: true 
		var vm = this;
		
		vm.registerData = { 
			      name: '',
			      mail: '',
			      pass: ''
			    };
			    
	    vm.registerIsPending = false; 
	    
	    vm.register = register;
	    	
	    /////////////
	    	
	    register function (form) {
	    	
	      if (form.$valid) {
	    	  vm.registerIsPending = true; 
	    	  UserResource.register(vm.registerData)
	    	  		//register
	                .then(
	                    function (data) {
	                      $localStorage.isRegistered = true;
	                      return UserResource.login( vm.registerData.name, vm.registerData.pass );
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
	                      },
	                      function (data) {
	                           	vm.registerIsPending = false; 

	                           	$scope.app.$state.go('app.login');
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
