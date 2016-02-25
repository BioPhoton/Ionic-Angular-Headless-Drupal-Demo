;
(function () {
  'use strict';


  angular
    .module('drupalionicDemo.register.controller', ['commons.validation.setValidAfterTouch', 'ngStorage', 'ngMessages'])
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'UserResource', 'AuthenticationService', '$localStorage'];

  /** @ngInject */
  function RegisterController($scope, UserResource, AuthenticationService, $localStorage) {
    // jshint validthis: true
    var vm = this;

    vm.registerData = {
      name: '',
      mail: '',
      pass: ''
    };

    vm.registerIsPending = false;

    vm.doRegister = doRegister;

    /////////////

    function doRegister(form) {

      if (form.$valid) {
        vm.registerIsPending = true;
        UserResource.register(vm.registerData)
          //register
          .then(
          function (data) {
            $localStorage.isRegistered = true;

            return AuthenticationService.login({username: vm.registerData.name, password: vm.registerData.pass});
          }
        )
          //login
          .then(
          function (data) {
            vm.registerIsPending = false;
            //reset form
            vm.registerData = {};

            //reste form
            form.$setPristine();
            form.$setUntouched();

            $scope.app.$state.go('app.login');
          }
        )
          .catch(
          function (errorResult) {

            vm.registerServerErrors = errorResult.data.form_errors;

            if (errorResult.data.form_errors.name) {
              form.name.$setValidity('name-taken', false);
            }
            if (errorResult.data.form_errors.mail) {
              form.mail.$setValidity('email-taken', false);
            }

          }
        )
          .finally(
          function () {
            vm.registerIsPending = false;
          }
        );
      }

    };


  };

})();
