;
(function () {
  'use strict';


  angular
    .module('drupalionicDemo.app.controller', [])
    .controller('AppController', AppController);

  AppController.$inject = ['$state', '$ionicSideMenuDelegate', 'AuthenticationServiceConstant', 'AuthenticationService'];

  /** @ngInject */
  function AppController($state, $ionicSideMenuDelegate, AuthenticationServiceConstant, AuthenticationService) {
    // jshint validthis: true
    var vm = this;

    vm.$state = $state;
    vm.accessLevels = AuthenticationServiceConstant.accessLevels;
    vm.loggingOut = false;

    vm.resetForm = resetForm;
    vm.doLogout = doLogout;



    ///////////////////////

    function resetForm(form) {
      form.$setPristine();
      form.$setUntouched();
    }


    function doLogout() {

      vm.loggingOut = true;

      AuthenticationService
        .logout()
        .then(
        function (data) {
          $ionicSideMenuDelegate.toggleLeft();
          vm.$state.go('app.login');
        }
      )
        .finally(
        function () {
          vm.loggingOut = false;
        }
      );

    }


  };

})();
