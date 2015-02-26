var testControllers = angular.module('test.controllers', [])

testControllers.controller('TestCtrl', ['$scope', '$rootScope', '$state', 'AuthenticationService',
  function ($scope, $rootScope, $state, AuthenticationService) {

    $scope.getNode = function () {
      AuthenticationService.getNode('68');
    }
        
  }]);



