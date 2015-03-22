/* Controllers of apiServicesControllers component */
//______________________________________________

var anonNodeResourceControllers = angular.module('resources.node-resource.controllers', ['NodeResourceModules', 'ngCordova']);


/* Node Resource Controller */
anonNodeResourceControllers.controller('ResourcesNodeResourceCtrl', 
		   ['$scope', 'NodeResource', 'NodeResourceChannel', '$cordovaCamera',
    function($scope,   NodeResource,   NodeResourceChannel,   $cordovaCamera) {
			   
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
			   NodeResourceChannel.onNodeRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   NodeResourceChannel.onNodeRetrieveFailed($scope, function(data) { 
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
			   NodeResourceChannel.onNodeCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.nodeCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   NodeResourceChannel.onNodeCreateFailed($scope, function(data) { 
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
				   NodeResourceChannel.onNodeUpdateConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.nodeUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				   NodeResourceChannel.onNodeUpdateFailed($scope, function(data) { 
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
					NodeResourceChannel.onNodeDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					NodeResourceChannel.onNodeDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.nodeIndexRequests = [];
					   
					   //get params for index request
					   $scope.nodeIndex = {};
					   $scope.nodeIndex.page = null;
					   
					   $scope.nodeIndex.fields = {};
					   $scope.nodeIndex.fields.nid = true;
					   $scope.nodeIndex.fields.created = true;
					   $scope.nodeIndex.fields.type = true;
					   $scope.nodeIndex.fields.title = true;
					   
					   $scope.nodeIndex.parameters = {};
					   $scope.nodeIndex.pagesize = null;
					   
					   $scope.callNodeRecourceIndex = function(nodeIndex) {
						   requestStart = Date.now();
						   console.log(nodeIndex);
						   NodeResource.index(nodeIndex).then(
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
					   NodeResourceChannel.onNodeIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   NodeResourceChannel.onNodeIndexFailed($scope, function(data) { 
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
					   NodeResourceChannel.onNodeFilesConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeFilesRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   NodeResourceChannel.onNodeFilesFailed($scope, function(data) { 
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
					   NodeResourceChannel.onNodeCommentsConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeCommentsRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   NodeResourceChannel.onNodeCommentsFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeCommentsRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					   //Attach File
					   $scope.nodeAttachFileRequests = [];
					   
					   $scope.nodeAttachFile = {};
					   $scope.nodeAttachFile.nid = 707;
					   $scope.nodeAttachFile.field_name = 'field_image', 
					   $scope.nodeAttachFile.attach = "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7", 
					   $scope.nodeAttachFile.field_values = {};
					   $scope.nodeAttachFile.field_values.title = 'AttachFile title';
					   $scope.nodeAttachFile.field_values.alt = 'AttachFile alt'
							   
					   
					   document.addEventListener("deviceready", function () {

						    var options = {
						      quality: 50,
						      destinationType: Camera.DestinationType.DATA_URL,
						      sourceType: Camera.PictureSourceType.CAMERA,
						      allowEdit: true,
						      encodingType: Camera.EncodingType.JPEG,
						      targetWidth: 100,
						      targetHeight: 100,
						      popoverOptions: CameraPopoverOptions,
						      saveToPhotoAlbum: false
						    };

						    $cordovaCamera.getPicture(options).then(function(imageData) {
						     
						      $scope.nodeAttachFile.attach = "data:image/jpeg;base64," + imageData;
						      console.log(' $cordovaCamera.getPicture success');
						      console.log(imageData, $scope.nodeAttachFile.attach); 
						    }, function(err) {
						      // error
						    	console.log(' $cordovaCamera.getPicture error'); 
						    });

						  }, false);
					   
					   
					   
					   
					   
					   
					   
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
					   NodeResourceChannel.onNodeAttachFileConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeAttachFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   NodeResourceChannel.onNodeAttachFileFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.nodeAttachFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					   /*
					   
					   var uploader = $scope.uploader = new FileUploader({
						   url: 'upload.php'
						   });
						   // FILTERS
						   uploader.filters.push({
						   name: 'customFilter',
						   fn: function(item , options) {
						   return this.queue.length < 10;
						   }
						   });
						   // CALLBACKS
						   uploader.onWhenAddingFileFailed = function(item , filter, options) {
						   console.info('onWhenAddingFileFailed', item, filter, options);
						   };
						   uploader.onAfterAddingFile = function(fileItem) {
						   console.info('onAfterAddingFile', fileItem);
						   };
						   uploader.onAfterAddingAll = function(addedFileItems) {
						   console.info('onAfterAddingAll', addedFileItems);
						   };
						   uploader.onBeforeUploadItem = function(item) {
						   console.info('onBeforeUploadItem', item);
						   };
						   uploader.onProgressItem = function(fileItem, progress) {
						   console.info('onProgressItem', fileItem, progress);
						   };
						   uploader.onProgressAll = function(progress) {
						   console.info('onProgressAll', progress);
						   };
						   uploader.onSuccessItem = function(fileItem, response, status, headers) {
						   console.info('onSuccessItem', fileItem, response, status, headers);
						   };
						   uploader.onErrorItem = function(fileItem, response, status, headers) {
						   console.info('onErrorItem', fileItem, response, status, headers);
						   };
						   uploader.onCancelItem = function(fileItem, response, status, headers) {
						   console.info('onCancelItem', fileItem, response, status, headers);
						   };
						   uploader.onCompleteItem = function(fileItem, response, status, headers) {
						   console.info('onCompleteItem', fileItem, response, status, headers);
						   };
						   uploader.onCompleteAll = function() {
						   console.info('onCompleteAll');
						   };
						   console.info('uploader', uploader);
						   // -------------------------------
						   var controller = $scope.controller = {
						   isImage: function(item) {
						   var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
						   return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
						   }
						   };
					   */
			    
}]);


