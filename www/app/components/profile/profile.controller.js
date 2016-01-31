;
(function () {
  'use strict'

  angular.module('drupalionicDemo.profile.controller', ['drupalionicDemo.profile.service'])
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'ProfileService'];

  function ProfileController($scope, ProfileService) {

    var vm = this;
    vm.isLoading = true;

    $scope.$on('$ionicView.enter', function () {
      ProfileService
        .getProfile()
        .then(function (profile) {
          angular.extend(vm, profile);
        })
        .finally(function () {
          vm.isLoading = false;
        });
      ;
    })

    ////////////////

  }

})();
