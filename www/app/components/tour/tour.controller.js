;(function() {
    'use strict';


angular
    .module('drupalionicDemo.tour.controller', [])
    .controller('TourController', TourController);

	TourController.$inject = ['$scope'];

	/** @ngInject */ 
	function TourController($scope) 
	{ 
		// jshint validthis: true 
		var vm = this;
		
		vm.start = 'SDF';
		//$scope.start = 'scope';
		
		///////////////////////
	    	
		
		function start() {
	    	alert('ASDF'); 
		      $localstorage.setItem('firstVisit', true);
		      $rootScope.firstVisit = true;
		      $state.go('app.register');
		    }
		
		
	};

})();