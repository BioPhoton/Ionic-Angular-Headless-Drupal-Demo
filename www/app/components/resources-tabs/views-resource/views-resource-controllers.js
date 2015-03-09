/* Controllers of apiServicesControllers component */
//______________________________________________

var ViewsResourceControllers = angular.module('resources.views-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Views Resource Controller */
ViewsResourceControllers.controller('ResourcesViewsResourceCtrl', 
		   ['$scope', 'ViewsResource', 'drupalApiNotificationChannel', 
    function($scope,   ViewsResource,   drupalApiNotificationChannel) {
			   
			   //
			   //ViewsResource
			   //
			   
			   var requestEnd = requestStart = undefined;
			   
			   //Retrieve
			   $scope.viewsRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.viewsRetrieve = {};
			   $scope.viewsRetrieve.viewname = 'testview';
			   
			   $scope.callViewsRecourceRetrieve = function(viewname) {
				   requestStart = Date.now();
				   ViewsResource.retrieve(viewname).then(
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


