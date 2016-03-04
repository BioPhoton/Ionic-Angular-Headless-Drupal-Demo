;
(function () {
  'use strict';

  angular
    .module('commons.validation.setValidAfterChange', [])
    .directive('setValidAfterChange', setValidAfterChange);

  //setValidAfterChange.$inject = [''];

  /** @ngInject */
  function setValidAfterChange() {

    return {
      // restrict to an attribute type.
      restrict: 'A',
      // element must have ng-model attribute.
      require: 'ngModel',
      link: function (scope, ele, attrs, ngModelCtrl) {

        var validation = attrs.setValidAfterChange;

        ngModelCtrl.$parsers.unshift(function (value) {
          console.log(value);
          if (ngModelCtrl.$invalid) {
            if (value) {
              ngModelCtrl.$setValidity(validation, true);
            }
          }
          //return the value to the model,
          return value;
        });
      }

    };

  };


})();
