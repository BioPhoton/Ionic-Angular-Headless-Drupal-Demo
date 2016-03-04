;
(function () {
  'use strict';

  angular
    .module('drupalionicDemo.login.controller', ['ngMessages'])
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', 'AuthenticationService'];
  function LoginController($scope, AuthenticationService) {

    // jshint validthis: true
    var vm = this;

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

        AuthenticationService.login(vm.loginData)
          .then(
          function (data) {
            vm.loginIsPending = false;
            $scope.app.resetForm(vm.loginForm);
            $scope.app.$state.go('app.profile');
          },
          //error
          function (errorResult) {
            vm.loginIsPending = false;
            vm.loginForm.username.$setValidity('inactive-or-blocked', false);
          }
        );

      }

    };

  };


})();
