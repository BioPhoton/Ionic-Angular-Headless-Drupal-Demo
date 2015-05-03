var localstorageServices = angular.module('common.localstorage', []);

localstorageServices.factory('$localstorage', ['$window',
  function ($window) {
    return {
       //
      setItem: function (key, value) {
        $window.localStorage[key] = value;
        
      },
      getItem: function (key, emptyValue) {
    	var val = $window.localStorage[key];
        emptyValue = (emptyValue !== undefined) ? emptyValue : undefined;
        return (val !== undefined)?val:emptyValue;
      },
      removeItem: function (key) {
        delete $window.localStorage[key];
      },
      //
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, emptyValue) {
        emptyValue = (emptyValue !== undefined) ? emptyValue : '{}';
        var result = $window.localStorage[key];
        //@TODO double check this
        if(result === undefined || result === "Max"){return emptyValue}
        return JSON.parse($window.localStorage[key] || emptyValue);
      },
      removeObject: function (key) {
        delete $window.localStorage[key];
      },
      //
      clearAll: function (key) {
        delete $window.localStorage[key];
        $window.localStorage = [];
      },
    }
  }]);
