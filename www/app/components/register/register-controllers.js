var registerControllers = angular.module('register.controllers', ['common.drupal.api-resources'])

registerControllers.controller('RegisterCtrl', ['$scope', '$rootScope', '$ionicModal', '$state', 'UserResource', '$localstorage', 'termsNodeObj',
  function ($scope, $rootScope, $ionicModal, $state, UserResource, $localstorage, termsNodeObj) {

	//$scope.termsNode = termsNodeObj;
	
    $scope.registerData = { 
      username: '',
      email: '',
      password: '',
      termsAgreed : false,
    };
    
    $scope.register = function (form) {
      if (form.$valid) {
    	  UserResource.register($scope.registerData)
                .then(
                        function (data) {
                          $localstorage.setItem('isRegistered', true);
                          //login user
                          UserResource.login($scope.registerData.username, $scope.registerData.password)
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
		console.log(); 
		$scope.termsModal.show();
	};

	$scope.closeTermsModal = function() {
		$scope.termsModal.hide();
	};
    
    $scope.checkTermsCheckbox = function () {
    	$scope.registerData.termsAgreed = true;
    };


  }]);