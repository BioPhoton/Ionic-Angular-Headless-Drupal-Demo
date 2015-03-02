/* Controllers of apiServicesControllers component */
//______________________________________________

var anonNodeResourceControllers = angular.module('resources.node-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources', 'common.directives']);


/* Node Resource Controller */
anonNodeResourceControllers.controller('ResourcesNodeResourceCtrl', 
		   ['$scope', 'NodeResource', 'drupalApiNotificationChannel', 'DrupalAuthenticationService', 
    function($scope,   NodeResource,   drupalApiNotificationChannel,   DrupalAuthenticationService) {
			   
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
				    			requestEnd = Date.now();
				    			$scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
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
				    		
				    			 var requestEnd = Date.now();
				    			$scope.nodeIndexRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    		
				    			$scope.nodeIndexRequests.push( {requestStart:requestStart, data:data});
				    		}
				    );
			    };
			    
			   //Create
			  
	
			   $scope.nodeCreateRequests = [];
			   
			   $scope.nodeTypes= [{id:'page',name:'page'},{id:'article',name:'article'}];
			   
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.nodeCreate = {};
			   $scope.nodeCreate.type = null; 
			   
			   $scope.nodeCreate.body = {};
			   $scope.nodeCreate.body.und = []
			   $scope.nodeCreate.body.und[0] = { value : '', summary : '' }
			   
			   $scope.callNodeRecourceCreate = function(node) {
				   var requestStart = Date.now();
				   NodeResource.create(node).then(
				    		//success
				    		function(data) {
				    		
				    			 var requestEnd = Date.now();
				    			$scope.nodeCreateRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				    		},
				    		//error
				    		function(data) {
				    		
				    			$scope.nodeCreateRequests.push( {requestStart:requestStart, data:data});
				    		}
				    );
			    };
			    
				   //Delete
				  
			
				   $scope.nodeDeleteRequests = [];
				   
				   $scope.nodeTypes= [{id:'page',name:'page'},{id:'article',name:'article'}];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.nodeDelete = {};
				   $scope.nodeDelete.nid = null;

				   
				   $scope.callNodeRecourceDelete = function(node) {
					   var requestStart = Date.now();
					   NodeResource._delete(node).then(
					    		//success
					    		function(data) {
					    		
					    			 var requestEnd = Date.now();
					    			$scope.nodeDeleteRequests.push( {requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					    		},
					    		//error
					    		function(data) {
					    		
					    			$scope.nodeDeleteRequests.push( {requestStart:requestStart, data:data});
					    		}
					    );
				    };
			    
}]);


