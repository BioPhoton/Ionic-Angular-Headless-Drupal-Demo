var tabsUserControllers = angular.module('authed-tabs.users.controllers', ['UserResourceModules', 'ionic.contrib.ui.cards']);

tabsUserControllers.controller('authedTabUsersCtrl', ['$scope', 'UserResource', 'newUsers',
                                             function ($scope,   UserResource,   newUsers) {

	$scope.userList = newUsers;
	
}]);
