/* Controllers of apiServicesControllers component */
//______________________________________________

var anonCommentResourceControllers = angular.module('resources.comment-resource.controllers', ['CommentResourceModules', 'drupalBaseModules', 'ngCordova']);


/* Comment Resource Controller */
anonCommentResourceControllers.controller('ResourcesCommentResourceCtrl', 
		   ['$scope', 'BaseResource', 'CommentResource', 'CommentResourceChannel', '$cordovaCamera',
    function($scope,   BaseResource,   CommentResource,   CommentResourceChannel,   $cordovaCamera) {
			   
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
			   //Comment Resource 
			   //
				   
			   //Retrieve
			   $scope.commentRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.commentRetrieve = {};
			   $scope.commentRetrieve.cid = 1;
			   
			   $scope.callCommentRecourceRetrieve = function(cid) {
				   
				   requestStart = Date.now();
				   CommentResource.retrieve(cid).then(
				    		//success
				    		function(data) {
				    			console.log('comment retrieve request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('comment retrieve request error'); 
				    		}
				    );
			   };
			   //
			   CommentResourceChannel.onCommentRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.commentRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   CommentResourceChannel.onCommentRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.commentRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
			   //Create
			  
			   $scope.commentCreateRequests = [];
			   
			   //get params for create request
			   $scope.commentCreate = {};
			   $scope.commentCreate.nid = '707'; 
			   $scope.commentCreate.subject = 'comment subject';
			   $scope.commentCreate.comment_body = BaseResource.structureField( {'value' : 'This is the full comment body.', 'summary' : 'This is a short summary of the comment body.'});
			   
			  /*  
			  $scope.commentCreate.field_image = BaseResource.structureField( {	'file' 		: 'R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', 
				   																'filename' 	: 'finename.jpg'});
			  */
			   $scope.commentCreate.field_image =  BaseResource.structureField({'fid' : 2531});
			   console.log( $scope.commentCreate.body); 
			  
			   $scope.callCommentRecourceCreate = function(comment) {
				   requestStart = Date.now();
				   CommentResource.create(comment).then(
				    		//success
				    		function(data) {
				    			console.log('comment create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('comment create request error'); 
				    		}
				    );
			    };
			    //
			   CommentResourceChannel.onCommentCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.commentCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   CommentResourceChannel.onCommentCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.commentCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
				   //Update
				  
				   $scope.commentUpdateRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.commentUpdate = {};
				   $scope.commentUpdate.cid = null; 
				   $scope.commentUpdate.subject = 'test titel edited';
				   $scope.commentUpdate.comment_body = BaseResource.structureField( {'value' : 'This is the edited full comment body.', 'summary' : 'This is a edited short summary of the comment body.'});
				   
				   $scope.callCommentRecourceUpdate = function(comment) {
					   
					   var updateCid = comment.cid;
					   delete comment.cid;
					   
					   requestStart = Date.now();
					   CommentResource.update(updateCid, comment).then(
					    		//success
					    		function(data) {
					    			console.log('comment update request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('comment update request error'); 
					    		}
					    );
				    };
				    //
				   CommentResourceChannel.onCommentUpdateConfirmed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.commentUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				   CommentResourceChannel.onCommentUpdateFailed($scope, function(data) { 
					   requestEnd = Date.now();
		    		   $scope.commentUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
				   });
				    
			    
				   //Delete
				   $scope.commentDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.commentDelete = {};
				   $scope.commentDelete.cid = null;

				   $scope.callCommentRecourceDelete = function(cid) {
					   requestStart = Date.now();
					   CommentResource._delete(cid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('comment delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('comment delete request error'); 
					    		}
					    );
				    };
				    //
					CommentResourceChannel.onCommentDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					CommentResourceChannel.onCommentDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.commentIndexRequests = [];
					   
					   //get params for index request
					   $scope.commentIndex = {};
					   $scope.commentIndex.page = null;
					   
					   $scope.commentIndex.fields = {};
					   $scope.commentIndex.fields.cid = true;
					   $scope.commentIndex.fields.created = true;
					   $scope.commentIndex.fields.type = true;
					   $scope.commentIndex.fields.title = true;
					   
					   $scope.commentIndex.parameters = {};
					   $scope.commentIndex.pagesize = null;
					   
					   $scope.callCommentRecourceIndex = function(commentIndex) {
						   requestStart = Date.now();
						   console.log(commentIndex);
						   CommentResource.index(commentIndex).then(
						    		//success
						    		function(data) { 
						    			console.log('comment index request success');  
						    		},
						    		//error
						    		function(data) {
						    			console.log('comment index request error'); 
						    	    }
						    );
					    };
					    //
					   CommentResourceChannel.onCommentIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   CommentResourceChannel.onCommentIndexFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });

					   //CountAll
					   $scope.commentCountAllRequests = [];
					   
					   //path params for retrieve request
					   $scope.commentCountAll = {};
					   $scope.commentCountAll.nid = 707;
					 
					   $scope.callCommentResourceCountAll = function(commentCountAll) {
						   
						   requestStart = Date.now();
						   CommentResource.countAll(commentCountAll.nid).then(
						    		//success
						    		function(data) {
						    			console.log('comment countAll request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('comment countAll request error'); 
						    		}
						    );
					   };
					   //
					   CommentResourceChannel.onCommentCountAllConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentCountAllRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   CommentResourceChannel.onCommentCountAllFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentCountAllRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   //CountNew
					   $scope.commentCountNewRequests = [];
					   
					   var currentDate = new Date();
					   
					   $scope.commentCountNew = {};
					   $scope.commentCountNew.nid = 707;
					   $scope.commentCountNew.since = (currentDate.getTime()/1000).toFixed(0)- 60*60*24 ;
					   console.log(  $scope.commentCountNew.since); 
					   $scope.callCommentResourceCountNew = function(commentCountNew) {
						   
						   requestStart = Date.now();
						   CommentResource.countNew(commentCountNew.nid, commentCountNew.since).then(
						    		//success
						    		function(data) {
						    			console.log('comment countNew request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('comment countNew request error'); 
						    		}
						    );
					   };
					   //
					   CommentResourceChannel.onCommentCountNewConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentCountNewRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   CommentResourceChannel.onCommentCountNewFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.commentCountNewRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
   
					  
			    
}]);


