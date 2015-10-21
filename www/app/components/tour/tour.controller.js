;(function() {
    'use strict';


angular
    .module('drupalionicDemo.tour.controller', ['ngStorage'])
    .controller('TourController', TourController);

	TourController.$inject = ['$scope', '$localStorage'];

	/** @ngInject */ 
	function TourController($scope, $localStorage) 
	{ 
		// jshint validthis: true 
		var vm = this;
		
		vm.start = start;
		
		///////////////////////
	    	
		
		function start() {
			$localStorage.firstVisit = true;
			$scope.app.$state.go('app.register');
	    }
		
		
	};

})();