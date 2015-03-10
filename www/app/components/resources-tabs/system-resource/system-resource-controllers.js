/* Controllers of apiServicesControllers component */
//______________________________________________
var anonSystemResourceControllers = angular.module('resources.system-resource.controllers', []);


/* System Resource Controller */
anonSystemResourceControllers.controller('ResourcesSystemResourceCtrl', 
		   ['$scope', 'SystemResource', 'UserResource', 'drupalApiNotificationChannel', 
    function($scope,   SystemResource,   UserResource,   drupalApiNotificationChannel ) {
			  
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
			   //SystemResource
			   //

			   var requestEnd = requestStart = undefined;
			   
			   //connect
			   $scope.systemConnectRequests = [];

			   $scope.callSystemRecourceConncet = function() {
				   		requestStart = Date.now();
						SystemResource.connect()
					    .then(
					    		//conncet success
					    		function(data) { console.log('system conncet success'); },
					    		//conncet error
					    		function(data) { console.log('system conncet error'); }
					    );
			   };
			   //
			   drupalApiNotificationChannel.onSystemConnectConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemConnectRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onSystemConnectFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemConnectRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			   //get_variable
			   $scope.systemGetVariableRequests = [];
			   $scope.getVariableData = {
					   name : ''
			   };
			   $scope.callSystemRecourceGetVariable = function() {
				   		requestStart = Date.now();
						SystemResource.get_variable($scope.getVariableData.name)
						 .then(
						    	//get_variable success
						    	function(data) { console.log('system get_variable success'); },
						    	//get_variable error
						    	function(data) { console.log('system get_variable error'); }
						    );
			   };
			   //
			   drupalApiNotificationChannel.onSystemGetVariableConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemGetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onSystemGetVariableFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemGetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			   //set_variable
			   $scope.systemSetVariableRequests = [];
			   $scope.setVariableData = {
					   name 	: '',
					   value 	: '',
			   };
			   $scope.callSystemRecourceSetVariable = function() {
				   		requestStart = Date.now();
						SystemResource.set_variable($scope.setVariableData.name, $scope.setVariableData.value)
					    .then(
					    		//set_variable success
						    	function(data) { console.log('system set_variable success'); },
						    	//set_variable error
						    	function(data) { console.log('system set_variable error'); }
					    );
			   };
			   //
			   drupalApiNotificationChannel.onSystemSetVariableConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemSetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onSystemSetVariableFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemSetVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			   //del variable
			   $scope.systemDelVariableRequests = [];
			   $scope.delVariableData = {
					   name : ''
			   };
			   $scope.callSystemRecourceDelVariable = function() {
				   
				   	requestStart = Date.now();
					SystemResource.del_variable($scope.delVariableData.name)
				    .then(
				    		//set_variable success
					    	function(data) { console.log('system del_variable success'); },
					    	//set_variable error
					    	function(data) { console.log('system del_variable error'); }
				    );
			   };
			   //
			   drupalApiNotificationChannel.onSystemDelVariableConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemDelVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onSystemDelVariableFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.systemDelVariableRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
}]);


