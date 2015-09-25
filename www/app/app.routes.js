;(function() {
    'use strict';

    angular.module('drupalionicDemo.routes', ['drupalionicDemo.app.controller', 'drupalionicDemo.tour.controller']) 
    .config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
    
	/** @ngInject */
	function configFunction($stateProvider, $urlRouterProvider) { 
		//routing configurations
		$urlRouterProvider.otherwise('/app/tour');
	    
	    $stateProvider
	    
	    //holds the navigation and toggled state of menu
	    .state('app', {
            url: "/app",
            abstract: true,
            templateUrl		: "app/app.view.html",
            controller		: 'AppController',
            controllerAs 	: 'app'
          })
	    
	    .state('app.tour', {
            url: '/tour',
            views : {
            	'menuContent' : {
            		 templateUrl	: 'app/components/tour/tour.view.html',
                     controller		: 'TourController',
                     controllerAs 	: 'tour'
            	}
            } 
       });
	    
	};
	
})();