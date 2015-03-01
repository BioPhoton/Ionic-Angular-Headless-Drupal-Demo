var commonDirectives = angular.module('common.directives', []);

commonDirectives.directive('stopEvent', function () {
  function stopEvent(e) {
    e.stopPropagation();
  }
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      element.bind(attr.stopEvent, stopEvent);
    }
  };
});

commonDirectives.directive('tournamentListDivider', function ($timeout) {
  var lastDivideKey = "";
  return {
    link: function (scope, element, attrs) {
      var key = attrs.tournamentListDividerValue;
      var listclass = attrs.tournamentListClassValue;

      var defaultDivideFunction = function (k) {
        return k.slice(0, 1).toUpperCase();
      }

      var doDivide = function () {
        var divideFunction = scope.$apply(attrs.tournamentListDividerFunction) || defaultDivideFunction;
        var divideKey = divideFunction(key);


        if (divideKey != lastDivideKey) {
          var contentTr = angular.element("<div class='item " + listclass.toLowerCase() + " item-divider'>" + divideKey + "</div>");
          element[0].parentNode.insertBefore(contentTr[0], element[0]);
        }

        lastDivideKey = divideKey;
      }

      $timeout(doDivide, 0)
    }
  }
});

commonDirectives.directive("contenteditable", function() {
	  return {
	    restrict: "A",
	    require: "ngModel",
	    link: function(scope, element, attrs, ngModel) {

	      function read() {
	        ngModel.$setViewValue(element.html());
	      }

	      ngModel.$render = function() {
	        element.html(ngModel.$viewValue || "");
	      };

	      element.bind("blur keyup change", function() {
	        scope.$apply(read);
	      });
	    }
	  };
	});