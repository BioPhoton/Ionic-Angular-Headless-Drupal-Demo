/* Controllers of apiServicesControllers component */
//______________________________________________

var anonSystemResourceControllers = angular.module('anon-tabs.system-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* System Resource Controller */
anonSystemResourceControllers.controller('anonTabSystemResourceCtrl', 
		   ['$scope', 'SystemResource', 'drupalApiNotificationChannel', 
    function($scope,   SystemResource,   drupalApiNotificationChannel ) {
			   'common.drupal.api-resources'
			 
}]);


