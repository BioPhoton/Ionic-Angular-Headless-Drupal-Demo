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


/*
 $scope.$watch("user.name", function(newValue, oldValue) {
    if (newValue != oldValue) {
    	//do this debounced
    	console.log('save changes in db');
    }
  });
*/

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

//http://jsfiddle.net/cristoferdomingues/KR7KV/10/
commonDirectives.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            name : "=",
            ngModel: '=?',
            ngValue: '=?',
        },
         require: 'ngModel',
         transclude : false,
         replace: false,
         templateUrl: "app/common/directives/templates/ionSelect.html",             
         link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item.id);
                scope.showHide = false;
            };
            
            scope.open = function(){
                scope.ngModel = "";  
                return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                console.log(scope.ngModel); 
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
                 element.find('input').val(newValue[scope.labelField]);
            });
        },
    };
});