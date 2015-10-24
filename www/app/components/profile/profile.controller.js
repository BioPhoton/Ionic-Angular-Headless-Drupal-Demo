;(function(){
	'use strict'
	
	angular.module('drupalionicDemo.profile.controller', ['ngDrupal7Services-3_x.resources.user', 'ngDrupal7Services-3_x.commons.helperService', 'ngDrupal7Services-3_x.commons.authentication.service'])
		   .controller('ProfileController', ProfileController);
	
	ProfileController.$inject = ['$scope','UserResource', 'AuthenticationService', 'DrupalHelperService'];

	function ProfileController(   $scope,  UserResource,   AuthenticationService,   DrupalHelperService) {
		
		var vm = this;
			vm.isLoading = true;
			vm.pictureUrl = false;
		
		$scope.$on('$ionicView.enter', function() {
			getUserProfile();
		  })
		
		////////////////
		
		function getUserProfile() {
		
			var currentUser = AuthenticationService.getCurrentUser() ;
			
			if(currentUser.uid != 0) {
				
				vm.isLoading = true;
				vm.pictureUrl = false;
				vm.name = '';
				
				UserResource
					.retrieve({ uid: currentUser.uid })
						.success(function(data) {
							console.log(data); 
							angular.extend(vm, data);
							//create image style path to user image
							vm.pictureUrl = (vm.picture)?DrupalHelperService.getDrupalPath()+'sites/default/files/pictures/'+vm.picture.filename:false;
						})
						.catch(function(error) {
							console.log(error); 
						})
						.finally(
								function() {
									vm.isLoading = false;
								}
						);
			}
			
			
			
		}


	}
	
})();