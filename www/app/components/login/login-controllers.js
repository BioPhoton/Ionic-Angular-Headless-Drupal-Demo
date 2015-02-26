var loginControllers = angular.module('login.controllers', [])

loginControllers.controller('LoginCtrl', ['$scope', '$localstorage', '$state', '$rootScope', 'AuthenticationService',
  function ($scope, $localstorage, $state, $rootScope, AuthenticationService) {
    $scope.message = "";
    $scope.doingLogin = false;
    $scope.loginData = {
      username: '',
      password: ''
    };
    $scope.login = function (form) {
      $scope.loginServerErrors = '';
      if (form.$valid) {

        $scope.doingLogin = true;
        AuthenticationService.login($scope.loginData.username,
          $scope.loginData.password).then(function (data) {
          //reset form data
          $scope.loginData = {};
          
          //reste form
          //@TODO create formhelper for reste function
          form.$error = {};
          form.$pristine = true;
          form.$dirty = false;
          form.$valid = true;
          form.$invalid = false;
          
        }, function (data) {
          $rootScope.$broadcast('loading:hide');
          $scope.loginServerErrors = data;
        });
      }
    };

  }]);