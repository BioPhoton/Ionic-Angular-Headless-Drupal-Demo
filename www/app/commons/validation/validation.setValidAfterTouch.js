;(function() {
    'use strict';

    angular
        .module('commons.validation.setValidAfterTouch', [])
        .directive('setValidAfterTouch', setValidAfterTouch);


    //setValidAfterTouch.$inject = [''];

    /** @ngInject */
    function setValidAfterTouch() {

        return {
            // restrict to an attribute type.
            restrict: 'A',
            // element must have ng-model attribute.
            require: 'ngModel',
            link: function(scope, ele, attrs, ngModelCtrl){

            	var flag = attrs.setValidAfterTouch;
            	console.log(attrs); 
                // add a parser that will process each time the value is
                // parsed into the model when the user updates it.
                ngModelCtrl.$parsers.unshift(function(value) {
                	console.log(value);
                    /**
                     * The requests promise.then() set's validity for this field to false if error
                     *
                     * Example:
                     *
                     * var authObj = $firebaseAuth('firebase_instance');
                     *
                     * authObj.$createUser(registerData)
                     * .catch(function() {
                     *      if(error.code == 'EMAIL_TAKEN'){
					 *				myForm.myInputName.$setValidity('EMAIL_TAKEN', false);
					 *		}
					 *	});
                     *
                    **/

                    if(ngModelCtrl.$invalid){
                        if(value){
                            ngModelCtrl.$setValidity(FirebaseConstant.validation.EMAIL_TAKEN, true);
                        }
                    }

                    //return the value to the model,
                    return value;
                });
            }

        };


    };


})();