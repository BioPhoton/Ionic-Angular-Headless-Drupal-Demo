var tabsUserControllers = angular.module('authed-tabs.users.controllers', ['UserResourceModules', 'ionic.contrib.ui.cards']);

tabsUserControllers.controller('authedTabUsersCtrl', ['$scope', 'UserResource', 'newUsers',
                                             function ($scope,   UserResource,   newUsers) {

	$scope.userList = newUsers;
	
	UserResource.index().then(
			function(users) {
				$scope.userList = users
			},
			function() {
				
			}
	);
	
	$scope.cardSwiped = function(index) {
	    $scope.addCard();
	  };

	  $scope.cardDestroyed = function(index) {
	    $scope.userList.splice(index, 1);
	  };

	  $scope.addCard = function() {
	    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
	    newCard.id = Math.random();
	    $scope.userList.push(angular.extend({}, newCard));
	  }
	}]);

tabsUserControllers.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
	  $scope.goAway = function() {
	    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
	    card.swipe();
	  };
	});
