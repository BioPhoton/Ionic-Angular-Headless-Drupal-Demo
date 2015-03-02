/* Controllers of apiServicesControllers component */
//______________________________________________
var anonSystemResourceControllers = angular.module('resources.system-resource.controllers', []);


/* System Resource Controller */
anonSystemResourceControllers.controller('ResourcesSystemResourceCtrl', 
		   ['$scope', 'SystemResource', 'UserResource', 'drupalApiNotificationChannel', 
    function($scope,   SystemResource,   UserResource,   drupalApiNotificationChannel ) {
			  
			   //
			   //SystemResource
			   //
			   
			   //connect
			   $scope.systemConnectRequests = [];
			   
			   $scope.callSystemRecourceConncet = function() {
				   		var requestEnd = requestStart = Date.now();
						SystemResource.connect()
					    .then(
					    		//success
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemConnectRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		},
					    		//error
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemConnectRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		}
					    );
			   };
			   
			   //get_variable
			   $scope.systemGetVariableRequests = [];
			   $scope.getVariableData = {
					   name : ''
			   };
			   $scope.callSystemRecourceGetVariable = function() {
				   		var requestEnd = requestStart = Date.now();
						SystemResource.get_variable($scope.getVariableData.name)
					    .then(
					    		//success
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemGetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		},
					    		//error
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemGetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		}
					    );
			   };
			   
			   //set variable
			   $scope.systemSetVariableRequests = [];
			   $scope.setVariableData = {
					   name 	: '',
					   value 	: '',
			   };
			   $scope.callSystemRecourceSetVariable = function() {
				   		var requestEnd = requestStart = Date.now();
						SystemResource.set_variable($scope.setVariableData.name, $scope.setVariableData.value)
					    .then(
					    		//success
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemSetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		},
					    		//error
					    		function(data) {
					    			requestEnd = Date.now();
					    			$scope.systemSetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		}
					    );
			   };
			   
			   //del variable
			   $scope.systemDelVariableRequests = [];
			   $scope.delVariableData = {
					   name : ''
			   };
			   $scope.callSystemRecourceDelVariable = function() {
				   
				   	var requestEnd = requestStart = Date.now();
					SystemResource.del_variable($scope.delVariableData.name)
				    .then(
				    		//success
				    		function(data) {
				    			requestEnd = Date.now();
				    			$scope.systemDelVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    			
				    			requestEnd = Date.now();
				    			$scope.systemDelVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		}
				    );
			   };
			 
}]);


