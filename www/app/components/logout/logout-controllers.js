var logoutControllers = angular.module('logout.controllers', ['common.drupal.api-resources'])

logoutControllers.controller('LogoutCtrl', ['$rootScope', '$scope', '$state', 'UserResource',
  function ($rootScope, $scope, $state, UserResource) {
    $scope.logout = function () {
    	UserResource.logout();
    }

  }]);
        