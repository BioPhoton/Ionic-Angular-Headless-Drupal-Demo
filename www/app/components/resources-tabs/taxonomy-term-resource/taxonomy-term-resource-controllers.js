/* Controllers of apiServicesControllers component */
//______________________________________________

var anonTaxonomyTermResourceControllers = angular.module('resources.taxonomy-term-resource.controllers', ['TaxonomyTermResourceModules', 'ngCordova']);


/* TaxonomyTerm Resource Controller */
anonTaxonomyTermResourceControllers.controller('ResourcesTaxonomyTermResourceCtrl', 
		   ['$scope', 'TaxonomyTermResource', 'TaxonomyTermResourceChannel', '$cordovaCamera',
    function($scope,   TaxonomyTermResource,   TaxonomyTermResourceChannel,   $cordovaCamera) {
			   
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
			   			   
				   var requestEnd = requestStart =  taxonomyTerm = undefined;
				   //for attache taxonomyTerm tests to detect browser or phone
				   $scope.isWebview = ionic.Platform.isWebView();
				   
				   
			   //
			   //TaxonomyTerm Resource 
			   //
				   
			   //Retrieve
			  
			   $scope.taxonomyTermRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.taxonomyTermRetrieve = {};
			   $scope.taxonomyTermRetrieve.tid = 1;
			   
			   $scope.callTaxonomyTermRecourceRetrieve = function(tid) {
				   taxonomyTerm = undefined;
				   requestStart = Date.now();
				   TaxonomyTermResource.retrieve(tid).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyTerm retrieve request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyTerm retrieve request error'); 
				    		}
				    );
			   };
			   //
			   TaxonomyTermResourceChannel.onTaxonomyTermRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   TaxonomyTermResourceChannel.onTaxonomyTermRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
			   //Create
			  
			   $scope.taxonomyTermCreateRequests = [];
			  
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.taxomonyTermCreate 			 = {};
			   $scope.taxomonyTermCreate.name 		 = "term name";
			   $scope.taxomonyTermCreate.description = 'term description';
			   $scope.taxomonyTermCreate.format 	 = "plain_text";
			   $scope.taxomonyTermCreate.weight 	 = 1;
			   $scope.taxomonyTermCreate.vocabulary_machine_name = "tags";

			   $scope.callTaxonomyTermRecourceCreate = function(taxonomyTermCreate) {
				   requestStart = Date.now();
				   TaxonomyTermResource.create(taxonomyTermCreate).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyTerm create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyTerm create request error'); 
				    		}
				    );
			    };
			    //
			   TaxonomyTermResourceChannel.onTaxonomyTermCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   TaxonomyTermResourceChannel.onTaxonomyTermCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			   //Update
				  
			   $scope.taxonomyTermUpdateRequests = [];
			   
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.taxonomyTermUpdate = {};
			   $scope.taxonomyTermUpdate.tid = 10; 
			   $scope.taxonomyTermUpdate.vid = 1; 
			   $scope.taxonomyTermUpdate.name = 'name edited'; 
			   $scope.taxonomyTermUpdate.description = 'description edited';
			   
			   $scope.callTaxomonyTermRecourceUpdate = function(term) {
				   console.log(term); 
				   var tid = term.tid;
				   delete term.tid;
				   
				   requestStart = Date.now();
				   TaxonomyTermResource.update(tid, term).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyTerm update request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyTerm update request error'); 
				    		}
				    );
			    };
			    //
			   TaxonomyTermResourceChannel.onTaxonomyTermUpdateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   TaxonomyTermResourceChannel.onTaxonomyTermUpdateFailed($scope, function(data) { 
				   console.log(data); 
				   requestEnd = Date.now();
	    		   $scope.taxonomyTermUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
		    
			    
				   //Delete
				   $scope.taxonomyTermDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.taxonomyTermDelete = {};
				   $scope.taxonomyTermDelete.tid = null;

				   $scope.callTaxonomyTermRecourceDelete = function(tid) {
					   requestStart = Date.now();
					   TaxonomyTermResource._delete(tid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('taxonomyTerm delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('taxonomyTerm delete request error'); 
					    		}
					    );
				    };
				    //
					TaxonomyTermResourceChannel.onTaxonomyTermDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					TaxonomyTermResourceChannel.onTaxonomyTermDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.taxonomyTermIndexRequests = [];
					   
					   //get params for index request
					   $scope.taxonomyTermIndex = {};
					   $scope.taxonomyTermIndex.page = null;
					   
					   $scope.taxonomyTermIndex.fields = {};
					   $scope.taxonomyTermIndex.fields.tid = true;
					   $scope.taxonomyTermIndex.fields.vid = true;
					   $scope.taxonomyTermIndex.fields.name = true;
					   $scope.taxonomyTermIndex.fields.description = true;
					   $scope.taxonomyTermIndex.fields.format = true;
					   $scope.taxonomyTermIndex.fields.weight = true;			
					   $scope.taxonomyTermIndex.fields.vocabulary_machine_name = true;	
   
					   $scope.taxonomyTermIndex.parameters = {};
					   $scope.taxonomyTermIndex.pagesize = null;
					   
					   $scope.callTaxonomyTermRecourceIndex = function(taxonomyTermIndex) {
						   requestStart = Date.now();
						   taxonomyTerm = undefined;
						   console.log(taxonomyTermIndex);
						   TaxonomyTermResource.index(taxonomyTermIndex).then(
						    		//success
						    		function(data) { 
						    			console.log('taxonomyTerm index request success');  
						    		},
						    		//error
						    		function(data) {
						    			console.log('taxonomyTerm index request error'); 
						    	    }
						    );
					    };
					    //
					   TaxonomyTermResourceChannel.onTaxonomyTermIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   TaxonomyTermResourceChannel.onTaxonomyTermIndexFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   //SelectNode
					   $scope.taxonomyTermSelectNodeRequests = [];
					   
					   $scope.taxonomyTermSelectNode = {};
					   $scope.taxonomyTermSelectNode.tid = 10;
					   $scope.taxonomyTermSelectNode.pager = 1;
					   $scope.taxonomyTermSelectNode.limit = 2;
					   $scope.taxonomyTermSelectNode.order = 1;
					   
					   $scope.callTaxonomyTermResourceSelectNodes = function(selectTaxonomyTermsSelectNode) {
						   requestStart = Date.now();
						   TaxonomyTermResource.selectNodes(selectTaxonomyTermsSelectNode.tid).then(
						    		//success
						    		function(data) {
						    			console.log('taxonomyTerm SelectNode request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('taxonomyTerm SelectNode request error'); 
						    		}
						    );
					   };
					   //
					   TaxonomyTermResourceChannel.onTaxonomyTermSelectNodesConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermSelectNodeRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   TaxonomyTermResourceChannel.onTaxonomyTermSelectNodesFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyTermSelectNodeRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					   
					   
					   
			
			    
}]);


