;
(function () {
  'use strict';


  angular
    .module('commons.directives.toggleByOwnUid', [])
    .directive('toggleByOwnUid', toggleByOwnUid);

  /**
   * Manually identify dependencies for minification-safe code
   *
   **/
  toggleByOwnUid.$inject = ['AuthenticationChannel', 'AuthenticationService'];

  /** @ngInject */
  function toggleByOwnUid(AuthenticationChannel, AuthenticationService) {

    return {
      restrict: 'A',

      link: function ($scope, element, attrs) {

        $scope.user = AuthenticationService.getCurrentUser();

        var classToToggle = 'disabled';

        if (attrs.toggleClass) {
          classToToggle = attrs.toggleClass
        }


        AuthenticationChannel.subCurrentUserUpdated($scope, currentUserUpdatedHandler);

        attrs.$observe('toggleByOwnUid', function (uid) {
          updateCSS(uid);
        });


        ///////////////////////////////////////////////////

        //hide or shoe elem by toggleAction
        function updateCSS(uid) {
          if (uid != $scope.user.uid) {
            element.toggleClass(classToToggle)
          }
        };

        function currentUserUpdatedHandler(user) {
          $scope.user = user;
          updateCSS();
        };

      }
    };
  };


})();
