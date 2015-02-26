var logoutControllers = angular.module('logout.controllers', [])

logoutControllers.controller('LogoutCtrl', ['$rootScope', '$scope', '$state', 'AuthenticationService',
  function ($rootScope, $scope, $state, AuthenticationService) {
    $scope.logout = function () {
      AuthenticationService.logout();
    }

  }]);
        