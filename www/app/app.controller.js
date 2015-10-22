;(function() {
    'use strict';


angular
    .module('drupalionicDemo.app.controller', ['ngDrupal7Services-3_x.commons.authentication', 'ngDrupal7Services-3_x.commons.directives.toggleByAccesslevel'])
    .controller('AppController', AppController);

	AppController.$inject = ['$state', 'AuthenticationServiceConstant', 'AuthenticationService'];

	/** @ngInject */ 
	function AppController($state, AuthenticationServiceConstant,  AuthenticationService ) 
	{ 
		// jshint validthis: true 
		var vm = this;
	    
		vm.$state = $state;
		vm.accessLevels = AuthenticationServiceConstant.accessLevels;
		
		vm.doLogout = doLogout;
		
		///////////////////////
		
		function doLogout() {
			
			 AuthenticationService
			 	.logout()
			 		.then(
			 				function(data) {
			 					vm.$state.go('app.login');
			 				}
			 		);
			 
		}
	   
		
	};

})();