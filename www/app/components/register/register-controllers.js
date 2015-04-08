var registerControllers = angular.module('register.controllers', ['UserResourceModules'])

registerControllers.controller('RegisterCtrl', ['$scope', '$rootScope', '$ionicModal', '$state', 'UserResource', '$localstorage', 'NodeResource',
                                       function ($scope,   $rootScope,   $ionicModal,   $state,   UserResource,   $localstorage,   NodeResource) {

	 NodeResource.retrieve(1).then(function(node) {$scope.termsNode = node }, function() {});
	
    $scope.registerData = { 
      name: '',
      mail: '',
      pass: '',
      termsAgreed : false,
    };
    
    $scope.register = function (form) {
      if (form.$valid) {
    	  UserResource.register($scope.registerData)
                .then(
                        function (data) {
                          $localstorage.setItem('isRegistered', true);
                          //login user
                          
                          UserResource.login( $scope.registerData.name, $scope.registerData.pass )
                                  .then(
                                          function (data) {
                                            //reset form
                                            $scope.registerData = {};
                                            //reste form
                                            //@TODO create formhelper for reset function
                                            form.$error = {};
                                            form.$pristine = true;
                                            form.$dirty = false;
                                            form.$valid = true;
                                            form.$invalid = false;
                                          },
                                          function (data) {
                                        	//@TODO send error to login view
                                        	$state.go('app.login');
                                            $scope.registerServerErrors = data;
                                          }
                                  );
                        },
                        function (data) {
                          $scope.registerServerErrors = data.form_errors;
                        }
                );
      		}

    };
    
    // Create and load the termsModal
	$ionicModal.fromTemplateUrl( 'app/components/register/terms-and-conditions-modal.html', 
								function(modal) {
									$scope.termsModal = modal;
								}, {
									scope : $scope,
									animation : 'slide-in-up'
								});
	
	$scope.showTermsModal = function() {
		$scope.termsModal.show();
	};

	$scope.closeTermsModal = function() {
		$scope.termsModal.hide();
	};
    
    $scope.checkTermsCheckbox = function () {
    	$scope.registerData.termsAgreed = true;
    };


  }]);