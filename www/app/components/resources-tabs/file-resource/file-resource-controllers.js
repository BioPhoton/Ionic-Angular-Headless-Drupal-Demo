/* Controllers of apiServicesControllers component */
//______________________________________________

var anonFileResourceControllers = angular.module('resources.file-resource.controllers', ['FileResourceModules', 'ngCordova']);


/* File Resource Controller */
anonFileResourceControllers.controller('ResourcesFileResourceCtrl', 
		   ['$scope', 'FileResource', 'FileResourceChannel', '$cordovaCamera',
    function($scope,   FileResource,   FileResourceChannel,   $cordovaCamera) {
			   
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
			   			   
				   var requestEnd = requestStart =  file = undefined;
				   //for attache file tests to detect browser or phone
				   $scope.isWebview = ionic.Platform.isWebView();
				   
				   
			   //
			   //File Resource 
			   //
				   
			   //Retrieve
			  
			   $scope.fileRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.fileRetrieve = {};
			   $scope.fileRetrieve.nid = 1;
			   
			   $scope.callFileRecourceRetrieve = function(nid) {
				   file = undefined;
				   requestStart = Date.now();
				   FileResource.retrieve(nid).then(
				    		//success
				    		function(data) {
				    			console.log('file retrieve request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('file retrieve request error'); 
				    		}
				    );
			   };
			   //
			   FileResourceChannel.onFileRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
				   file = data.file;
				   delete data.file;
	    		   $scope.fileRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data, file:file});
			   });
			 
			   FileResourceChannel.onFileRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.fileRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
			   //Create
			  
			   $scope.fileCreateRequests = [];
			   $scope.fileTypes= [{id:'page',name:'page'},{id:'article',name:'article'}];
			   
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.fileCreate = {};
			   $scope.fileCreate.file = "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";
			   $scope.fileCreate.filename = 'test.jpg';
			   $scope.fileCreate.filesize = $scope.fileCreate.file.length;
  
			   $scope.callFileRecourceCreate = function(fileCreate) {
				   requestStart = Date.now();
				   FileResource.create(fileCreate).then(
				    		//success
				    		function(data) {
				    			console.log('file create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('file create request error'); 
				    		}
				    );
			    };
			    //
			   FileResourceChannel.onFileCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.fileCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   FileResourceChannel.onFileCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.fileCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
				   //Delete
				   $scope.fileDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.fileDelete = {};
				   $scope.fileDelete.nid = null;

				   $scope.callFileRecourceDelete = function(nid) {
					   requestStart = Date.now();
					   FileResource._delete(nid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('file delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('file delete request error'); 
					    		}
					    );
				    };
				    //
					FileResourceChannel.onFileDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.fileDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					FileResourceChannel.onFileDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.fileDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.fileIndexRequests = [];
					   
					   //get params for index request
					   $scope.fileIndex = {};
					   $scope.fileIndex.page = null;
					   
					   $scope.fileIndex.fields = {};
					   $scope.fileIndex.fields.fid = true;
					   $scope.fileIndex.fields.filename = true;
					   $scope.fileIndex.fields.filemime = true;
					   $scope.fileIndex.fields.filesize = true;
					   $scope.fileIndex.fields.status = true;
					   $scope.fileIndex.fields.timestamp = true;			  								  
					   
					   $scope.fileIndex.parameters = {};
					   $scope.fileIndex.pagesize = null;
					   
					   $scope.callFileRecourceIndex = function(fileIndex) {
						   requestStart = Date.now();
						   file = undefined;
						   console.log(fileIndex);
						   FileResource.index(fileIndex).then(
						    		//success
						    		function(data) { 
						    			console.log('file index request success');  
						    		},
						    		//error
						    		function(data) {
						    			console.log('file index request error'); 
						    	    }
						    );
					    };
					    //
					   FileResourceChannel.onFileIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
				
			    		   $scope.fileIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   FileResourceChannel.onFileIndexFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.fileIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   //Create waw 
					   $scope.createRawFileRequests = [];
					   
					   $scope.createRawFile = {};
					   
					   $scope.callFileResourceAttachFile = function(createRawFile) {
						   requestStart = Date.now();
						   FileResource.attach_file(createRawFile.nid, createRawFile.field_name, createRawFile.attach, createRawFile.field_values).then(
						    		//success
						    		function(data) {
						    			console.log('file create raw request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('file create raw request error'); 
						    		}
						    );
					   };
					   //
					   FileResourceChannel.onCreateRawFileConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.createRawFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   FileResourceChannel.onCreateRawFileFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.createRawFileRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					   
					   
					   
			
			    
}]);


