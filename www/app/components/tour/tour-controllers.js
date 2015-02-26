var tourControllers = angular.module('tour.controllers', [])

tourControllers.controller('TourCtrl', ['$scope', '$state', '$localstorage',
  function ($scope, $state, $localstorage) {
    $scope.start = function () {
      $localstorage.setItem('firstVisit', 1);
     
      $state.go('app.register');
      console.log('ASF');
    }
  }]);