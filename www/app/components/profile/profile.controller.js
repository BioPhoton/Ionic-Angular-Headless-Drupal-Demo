;(function(){
	'use strict'
	
	angular.module('drupalionicDemo.profile.controller', ['ngDrupal7Services-3_x.resources.user', 'ngDrupal7Services-3_x.commons.configurations', 'ngDrupal7Services-3_x.commons.authentication.service'])
		   .controller('ProfileController', ProfileController);
	
		ProfileController.$inject = ['UserResource', 'AuthenticationService', 'DrupalApiConstant'];

	function ProfileController(UserResource, AuthenticationService, DrupalApiConstant) {
		
		var vm = this;
		
		vm.pathToCms 	= DrupalApiConstant.drupal_instance;
		vm.user 		=  {};
	
		getUserProfile();
		
		////////////////
		
		function getUserProfile() {
			var currentUser = AuthenticationService.getCurrentUser() ;
			
			if(currentUser.uid != 0) {
				UserResource
					.retrieve({ uid: currentUser.uid })
						.success(function(data) {
							vm.user = data; 
						})
						.catch(function(error) {
							console.log(error); 
						});
			}
			
			
			
		}


	}
	
})();