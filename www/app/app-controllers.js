var appControllers = angular.module('app.controllers', [])

appControllers.controller('AppCtrl', ['$rootScope', '$scope', '$ionicPlatform', '$localstorage', '$state',
  function ($rootScope, $scope, $ionicPlatform, $localstorage, $state) {
    // if its the user first visit to the app play the apps tour
	var firstVisit = $localstorage.getItem('firstVisit');
    if (!firstVisit) {
        $state.go('app.tour');
    }
    
    $scope.toggleIsOffline = function() {
    	console.log($scope.isOffline);
    	$scope.isOffline = !$scope.isOffline;
    
    }
    $scope.isOffline = true;

    
    $scope.user = $localstorage.getObject('user');

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    //on inet offline
    $ionicPlatform.on('offline', function () {
      $scope.isOffline = true;
    });

    //on inet online
    //NOTICE this event fires only on "resume online" so we have to init server loop manually in inti()
    $ionicPlatform.on('online', function () {
      $scope.isOffline = false;
    });


    $rootScope.$on('event:auth-logout-complete', function () {
      //@TODO reset user data to null
      $scope.user = null;
      $state.go('app.login');
    });

    //@TODO param not given check this....
    $rootScope.$on('event:auth-loginConfirmed', function (user) {
      $scope.user = $localstorage.getObject('user');
    });

  }]);