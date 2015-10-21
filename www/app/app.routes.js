;(function() {
    'use strict';

    angular.module('drupalionicDemo.routes', ['drupalionicDemo.app.controller', 
                                              'drupalionicDemo.tour.controller', 
                                              'drupalionicDemo.register.controller', 
                                              'drupalionicDemo.login.controller']) 
    .config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
    
	/** @ngInject */
	function configFunction($stateProvider, $urlRouterProvider) { 
		//routing configurations
		$urlRouterProvider.otherwise('/app/tour');
	    
	    $stateProvider
	    
	    .state('app', {
            url: "/app",
            abstract: true,
            templateUrl		: "app/app.view.html",
            controller		: 'AppController as app'
          })
	    
	    .state('app.tour', {
            url: '/tour',
            views : {
            	'menuContent' : {
            		 templateUrl	: 'app/components/tour/tour.view.html',
                     controller		: 'TourController as tour',
            	}
            } 
       })
       
       .state('app.login', {
            url: '/login',
            views : {
            	'menuContent' : {
            		 templateUrl	: 'app/components/login/login.view.html',
                     controller		: 'LoginController as login',
            	}
            } 
       })
       
       .state('app.register', {
            url: '/register',
            views : {
            	'menuContent' : {
            		 templateUrl	: 'app/components/register/register.view.html',
                     controller		: 'RegisterController as register',
            	}
            } 
       })
       
       ;
	    
	};
	
})();