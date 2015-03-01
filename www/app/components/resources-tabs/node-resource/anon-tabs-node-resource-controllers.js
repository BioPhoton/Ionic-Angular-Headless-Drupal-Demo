/* Controllers of apiServicesControllers component */
//______________________________________________

var anonNodeResourceControllers = angular.module('anon-tabs.node-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Node Resource Controller */
anonNodeResourceControllers.controller('anonTabNodeResourceCtrl', 
		   ['$scope', 'NodeResource', 'drupalApiNotificationChannel', 
    function($scope,   NodeResource,   drupalApiNotificationChannel ) {
			   
			   //
			   //Node Resource 
			   //
			   
			   //Retrieve
			   $scope.nodeRetrieveRequests = [];
			   
			   $scope.callNodeRecourceRetrieve = function(nid) {
				   
				   var requestEnd = requestStart = Date.now();
				   NodeResource.retrieve(nid).then(
				    		//success
				    		function(data) {
				    			console.log('success');
				    			requestEnd = Date.now();
				    			$scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    			console.log('error');
				    			requestEnd = Date.now();
				    			$scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		}
				    );
			   };
			   
			   //Index
			   
			   $scope.nodeIndexRequests = [];
			   
			   //get params for index request
			   $scope.nodeIndex = {};
			   $scope.nodeIndex.page = null;
			   $scope.nodeIndex.fields = null;
			   $scope.nodeIndex.parameters = null;
			   $scope.nodeIndex.pagesize = null;
			   
			   $scope.callNodeRecourceIndex = function(nodeIndex) {
				   var requestStart = Date.now();
				   NodeResource.index(nodeIndex.page, nodeIndex.fields, nodeIndex.parameters, nodeIndex.pagesize).then(
				    		//success
				    		function(data) {
				    			console.log('success');
				    			 var requestEnd = Date.now();
				    			$scope.nodeIndexRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    			console.log('error');
				    			$scope.nodeIndexRequests.push( {requestStart:requestStart, data:data});
				    		}
				    );
			    };
			    
}]);


