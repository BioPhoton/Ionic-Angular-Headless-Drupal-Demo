/* Controllers of apiServicesControllers component */
//______________________________________________

var anonNodeResourceControllers = angular.module('resources.node-resource.controllers', ['common.drupal.api-services', 'common.drupal.api-resources', 'common.directives']);


/* Node Resource Controller */
anonNodeResourceControllers.controller('ResourcesNodeResourceCtrl', 
		   ['$scope', 'NodeResource', 'drupalApiNotificationChannel', 'DrupalAuthenticationService', 
    function($scope,   NodeResource,   drupalApiNotificationChannel,   DrupalAuthenticationService) {
			   
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
			   			   
				   var requestEnd = requestStart = undefined;
				   //for attache file tests to detect browser or phone
				   $scope.isWebview = ionic.Platform.isWebView();
				   
				   
			   //
			   //Node Resource 
			   //
				   
			   //Retrieve
			   $scope.nodeRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.nodeRetrieve = {};
			   $scope.nodeRetrieve.nid = 1;
			   
			   $scope.callNodeRecourceRetrieve = function(nid) {
				   
				   requestStart = Date.now();
				   NodeResource.retrieve(nid).then(
				    		//success
				    		function(data) {
				    			console.log('node retrieve request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('node retrieve request error'); 
				    		}
				    );
			   };
			   //
			   drupalApiNotificationChannel.onNodeRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   drupalApiNotificationChannel.onNodeRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
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
				   requestStart = Date.now();
				   NodeResource.create(node).then(
				    		//success
				    		function(data) {
				    			console.log('node create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('node create request error'); 
				    		}
				    );
			    };
			    //
			   drupalApiNotificationChannel.onNodeCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   drupalApiNotificationChannel.onNodeCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
				   //Update
				  
				   $scope.nodeUpdateRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.nodeUpdate = {};
				   $scope.nodeUpdate.nid = null; 
				   $scope.nodeUpdate.type = null; 
				   
				   $scope.nodeUpdate.body = {};
				   $scope.nodeUpdate.body.und = []
				   $scope.nodeUpdate.body.und[0] = { value : '', summary : '' }
				   
				   $scope.callNodeRecourceUpdate = function(node) {
					   
					   var updateNid = node.nid;
					   delete node.nid;
					   
					   requestStart = Date.now();
					   NodeResource.update(updateNid, node).then(
					    		//success
					    		function(data) {
					    			console.log('node update request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('node update request error'); 
					    		}
					    );
				    };
				    //
				   drupalApiNotificationChannel.onNodeUpdateConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.nodeUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				   drupalApiNotificationChannel.onNodeUpdateFailed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.nodeUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				    
			    
				   //Delete
				   $scope.nodeDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.nodeDelete = {};
				   $scope.nodeDelete.nid = null;

				   $scope.callNodeRecourceDelete = function(nid) {
					   requestStart = Date.now();
					   NodeResource._delete(nid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('node delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('node delete request error'); 
					    		}
					    );
				    };
				    //
					drupalApiNotificationChannel.onNodeDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					drupalApiNotificationChannel.onNodeDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.nodeIndexRequests = [];
					   
					   //get params for index request
					   $scope.nodeIndex = {};
					   $scope.nodeIndex.page = null;
					   $scope.nodeIndex.fields = null;
					   $scope.nodeIndex.parameters = null;
					   $scope.nodeIndex.pagesize = null;
					   
					   $scope.callNodeRecourceIndex = function(nodeIndex) {
						   requestStart = Date.now();
						   NodeResource.index(nodeIndex.page, nodeIndex.fields, nodeIndex.parameters, nodeIndex.pagesize).then(
						    		//success
						    		function(data) { 
						    			console.log('node index request success');  
						    		},
						    		//error
						    		function(data) {
						    			console.log('node index request error'); 
						    	    }
						    );
					    };
					    //
					   drupalApiNotificationChannel.onNodeIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   drupalApiNotificationChannel.onNodeIndexFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });

					   //Files
					   $scope.nodeFilesRequests = [];
					   
					   //path params for retrieve request
					   $scope.nodeFiles = {};
					   $scope.nodeFiles.nid = 707;
					   $scope.nodeFiles.file_contents = 1;
					   $scope.nodeFiles.image_styles = 1;
					   
					   $scope.callNodeResourceFiles = function(nodeFiles) {
						   
						   requestStart = Date.now();
						   NodeResource.files(nodeFiles.nid, nodeFiles.file_contents, nodeFiles.image_styles).then(
						    		//success
						    		function(data) {
						    			console.log('node files request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('node files request error'); 
						    		}
						    );
					   };
					   //
					   drupalApiNotificationChannel.onNodeFilesConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeFilesRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   drupalApiNotificationChannel.onNodeFilesFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeFilesRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					 //Comments
					   $scope.nodeCommentsRequests = [];
					   
					   $scope.nodeComments = {};
					   $scope.nodeComments.nid = 707;
					   $scope.nodeComments.count = 5;
					   $scope.nodeComments.offset = 2;
					   
					   $scope.callNodeResourceComments = function(nodeComments) {
						   
						   requestStart = Date.now();
						   NodeResource.comments(nodeComments.nid, nodeComments.count, nodeComments.offset).then(
						    		//success
						    		function(data) {
						    			console.log('node comments request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('node comments request error'); 
						    		}
						    );
					   };
					   //
					   drupalApiNotificationChannel.onNodeCommentsConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeCommentsRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   drupalApiNotificationChannel.onNodeCommentsFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeCommentsRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					  //Attach File
					   $scope.nodeAttachFileRequests = [];
					   
					   $scope.nodeAttachFile = {};
					   $scope.nodeAttachFile.nid = 707;
					   $scope.nodeAttachFile.field_name = 'testfilename', 
					   $scope.nodeAttachFile.attach = 1, 
					   $scope.nodeAttachFile.field_values = {'title':'AttachFile title', 'alt' : 'AttachFile alt' };
					  
					   
					   $scope.callNodeResourceAttachFile = function(nodeAttachFile) {
						   requestStart = Date.now();
						   NodeResource.attach_file(nodeAttachFile.nid, nodeAttachFile.field_name, nodeAttachFile.attach, nodeAttachFile.field_values).then(
						    		//success
						    		function(data) {
						    			console.log('node attach_file request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('node attach_file request error'); 
						    		}
						    );
					   };
					   //
					   drupalApiNotificationChannel.onNodeAttachFileConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeAttachFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   drupalApiNotificationChannel.onNodeAttachFileFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeAttachFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
			    
}]);


