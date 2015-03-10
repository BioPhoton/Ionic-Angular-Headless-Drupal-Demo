/* Controllers of apiServicesControllers component */
//______________________________________________

var ViewsResourceControllers = angular.module('resources.views-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Views Resource Controller */
ViewsResourceControllers.controller('ResourcesViewsResourceCtrl', 
		   ['$scope', 'ViewsResource', 'drupalApiNotificationChannel', 
    function($scope,   ViewsResource,   drupalApiNotificationChannel) {
			   
			   $scope.toggleRequest = function(request) {
				     if ($scope.isRequestShown(request)) {
				       $scope.shownRequest = null;
				     } else {
				       $scope.shownRequest = request;
				     }
			   };
			
			   $scope.isRequestShown = function(request) {
			     return $scope.shownRequest === request;
			   };
			   
			   //
			   //ViewsResource
			   //
			   
			   var requestEnd = requestStart = undefined;
			   
			   //Retrieve
			   $scope.viewsRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.viewsRetrieve = {};
			   $scope.viewsRetrieve.view_name = 'testview';
			   
			   $scope.callViewsRecourceRetrieve = function(viewsRetrieve) {
				   requestStart = Date.now();
				   ViewsResource.retrieve(viewsRetrieve.view_name).then(
						//conncet success
				    	function(data) { console.log('views retrieve success'); },
				    	//conncet error
				    	function(data) { console.log('views retrieve error'); }
				    );
			   };		
			   //
			   drupalApiNotificationChannel.onViewsRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onViewsRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.viewsRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			
			  
}]);


