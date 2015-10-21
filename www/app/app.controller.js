;(function() {
    'use strict';


angular
    .module('drupalionicDemo.app.controller', [])
    .controller('AppController', AppController);

	AppController.$inject = ['$state'];

	/** @ngInject */ 
	function AppController($state ) 
	{ 
		// jshint validthis: true 
		var vm = this;
	    
		vm.$state = $state;
		
		
		///////////////////////
	   
		
	};

})();