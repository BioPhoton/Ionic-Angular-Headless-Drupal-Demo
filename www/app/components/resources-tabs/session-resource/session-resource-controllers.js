/* Controllers of apiServicesControllers component */
//______________________________________________

var SessionResourceControllers = angular.module('resources.session-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Session Resource Controller */
SessionResourceControllers.controller('ResourcesSystemResourceCtrl', 
		   ['$scope', 'SessionResource', 'drupalApiNotificationChannel', 
    function($scope,   SessionResource,   drupalApiNotificationChannel ) {
			  
			   //
			   //SessionResource
			   //
			   
			   //toke
			   $scope.sessionTokenRequests = [];
			   
			   $scope.callSystemRecourceConncet = function() {
				   		var requestEnd = requestStart = Date.now();
				   		SessionResource.token()
					    .then(
					    		//success
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.sessionTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		},
					    		//error
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.sessionTokenRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		}
					    );
			   };
			 
}]);


