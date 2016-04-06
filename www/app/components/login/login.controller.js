;
(function () {
  'use strict';

  angular
    .module('drupalionicDemo.login.controller', ['ngMessages', 'commons.validation.setValidAfterChange'])
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', 'AuthenticationService'];
  function LoginController($scope, AuthenticationService) {

    // jshint validthis: true
    var vm = this;

    vm.serverErrors = [];

    //data for vm.loginForm
    vm.loginData = {
      username: 'basic-user',
      password: 'basic-user'
    };

    vm.loginIsPending = false;

    vm.doLogin = doLogin;
    vm.goToRegister = goToRegister;

    ///////////////

    function goToRegister() {
      $scope.app.resetForm(vm.loginForm);
      $scope.app.$state.go('app.register');
    }

    function doLogin() {
      if (vm.loginForm.$valid) {
        vm.loginIsPending = true;
        vm.serverErrors = [];

        AuthenticationService.login(vm.loginData)
          .then(
          function (data) {
            $scope.app.resetForm(vm.loginForm);
            $scope.app.$state.go('app.profile');
          },
          //error
          function (errorResult) {
            if (errorResult.status >= 400 && errorResult.status < 500) {
                vm.serverErrors.push(errorResult.data[0]);
            }
            else {
              vm.serverErrors.push(errorResult.statusText);
            }

          }
        ).finally(function() { vm.loginIsPending = false; });

      }

    };

  };


})();
