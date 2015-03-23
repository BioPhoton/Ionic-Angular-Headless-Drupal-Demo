/* Controllers of apiServicesControllers component */
//______________________________________________

var anonTaxonomyVocabularyResourceControllers = angular.module('resources.taxonomy-vocabulary-resource.controllers', ['TaxonomyVocabularyResourceModules', 'ngCordova']);


/* TaxonomyVocabulary Resource Controller */
anonTaxonomyVocabularyResourceControllers.controller('ResourcesTaxonomyVocabularyResourceCtrl', 
		   ['$scope', 'TaxonomyVocabularyResource', 'TaxonomyVocabularyResourceChannel', '$cordovaCamera',
    function($scope,   TaxonomyVocabularyResource,   TaxonomyVocabularyResourceChannel,   $cordovaCamera) {
			   
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
			   			   
				   var requestEnd = requestStart =  taxonomyVocabulary = undefined;
				   //for attache taxonomyVocabulary tests to detect browser or phone
				   $scope.isWebview = ionic.Platform.isWebView();
				   
				   
			   //
			   //TaxonomyVocabulary Resource 
			   //
				   
			   //Retrieve
			  
			   $scope.taxonomyVocabularyRetrieveRequests = [];
			   
			   //path params for retrieve request
			   $scope.taxonomyVocabularyRetrieve = {};
			   $scope.taxonomyVocabularyRetrieve.vid = 1;
			   
			   $scope.callTaxonomyVocabularyRecourceRetrieve = function(vid) {
				   taxonomyVocabulary = undefined;
				   requestStart = Date.now();
				   TaxonomyVocabularyResource.retrieve(vid).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyVocabulary retrieve request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyVocabulary retrieve request error'); 
				    		}
				    );
			   };
			   //
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyRetrieveConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			 
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyRetrieveFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyRetrieveRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
			   //Create
			  
			   $scope.taxonomyVocabularyCreateRequests = [];
			  
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.taxomonyVocabularyCreate 			 = {};
			   $scope.taxomonyVocabularyCreate.name 		 = "vocabulary name";
			   $scope.taxomonyVocabularyCreate.description = 'vocabulary description';
			   $scope.taxomonyVocabularyCreate.format 	 = "plain_text";
			   $scope.taxomonyVocabularyCreate.weight 	 = 1;
			   $scope.taxomonyVocabularyCreate.machine_name = "tagssdf";

			   $scope.callTaxonomyVocabularyRecourceCreate = function(taxonomyVocabularyCreate) {
				   requestStart = Date.now();
				   TaxonomyVocabularyResource.create(taxonomyVocabularyCreate).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyVocabulary create request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyVocabulary create request error'); 
				    		}
				    );
			    };
			    //
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyCreateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyCreateFailed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyCreateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   
			   //Update
				  
			   $scope.taxonomyVocabularyUpdateRequests = [];
			   
			   //get params for create request
			   //NOTE: username is set automatically on server through authed request
			   $scope.taxonomyVocabularyUpdate = {};
			   $scope.taxonomyVocabularyUpdate.vid = 1; 
			   $scope.taxonomyVocabularyUpdate.name = 'name edited'; 
			   $scope.taxonomyVocabularyUpdate.description = 'description edited';
			   
			   $scope.callTaxomonyVocabularyRecourceUpdate = function(vocabulary) {
				   console.log(vocabulary); 
				   var vid = vocabulary.vid;
				   delete vocabulary.vid;
				   
				   requestStart = Date.now();
				   TaxonomyVocabularyResource.update(vid, vocabulary).then(
				    		//success
				    		function(data) {
				    			console.log('taxonomyVocabulary update request success'); 
				    		},
				    		//error
				    		function(data) {
				    			console.log('taxonomyVocabulary update request error'); 
				    		}
				    );
			    };
			    //
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyUpdateConfirmed($scope, function(data) { 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyUpdateFailed($scope, function(data) { 
				   console.log(data); 
				   requestEnd = Date.now();
	    		   $scope.taxonomyVocabularyUpdateRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
			   });
			    
		    
			    
				   //Delete
				   $scope.taxonomyVocabularyDeleteRequests = [];
				   
				   //get params for create request
				   //NOTE: username is set automatically on server through authed request
				   $scope.taxonomyVocabularyDelete = {};
				   $scope.taxonomyVocabularyDelete.vid = null;

				   $scope.callTaxonomyVocabularyRecourceDelete = function(vid) {
					   requestStart = Date.now();
					   TaxonomyVocabularyResource._delete(vid).then(
							  
					    		//success
					    		function(data) {
					    			console.log('taxonomyVocabulary delete request success'); 
					    		},
					    		//error
					    		function(data) {
					    			console.log('taxonomyVocabulary delete request error'); 
					    		}
					    );
				    };
				    //
					TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyDeleteConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyDeleteFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyDeleteRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					});
					   
					   //Index
					   
					   $scope.taxonomyVocabularyIndexRequests = [];
					   
					   //get params for index request
					   $scope.taxonomyVocabularyIndex = {};
					   $scope.taxonomyVocabularyIndex.page = null;
					   
					   $scope.taxonomyVocabularyIndex.fields = {};
					   $scope.taxonomyVocabularyIndex.fields.vid = true;
					   $scope.taxonomyVocabularyIndex.fields.name = true;
					   $scope.taxonomyVocabularyIndex.fields.description = true;
					   $scope.taxonomyVocabularyIndex.fields.machine_name = true;
					   $scope.taxonomyVocabularyIndex.fields.hierarchy = true;			
					   $scope.taxonomyVocabularyIndex.fields.module = true;	
					   $scope.taxonomyVocabularyIndex.fields.weight = true;	

					   $scope.taxonomyVocabularyIndex.parameters = {};
					   $scope.taxonomyVocabularyIndex.pagesize = null;
					   
					   $scope.callTaxonomyVocabularyRecourceIndex = function(taxonomyVocabularyIndex) {
						   requestStart = Date.now();
						   taxonomyVocabulary = undefined;
						   console.log(taxonomyVocabularyIndex);
						   TaxonomyVocabularyResource.index(taxonomyVocabularyIndex).then(
						    		//success
						    		function(data) { 
						    			console.log('taxonomyVocabulary index request success');  
						    		},
						    		//error
						    		function(data) {
						    			console.log('taxonomyVocabulary index request error'); 
						    	    }
						    );
					    };
					    //
					   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyIndexConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyIndexFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyIndexRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   //getTree
					   $scope.taxonomyVocabularyGetTreeRequests = [];
					   
					   $scope.taxonomyVocabularyGetTree = {};
					   $scope.taxonomyVocabularyGetTree.vid = 1;
					   $scope.taxonomyVocabularyGetTree.parent = 0;
					   $scope.taxonomyVocabularyGetTree.maxdepth = 2;
					   $scope.taxonomyVocabularyGetTree.load_entities = 1;
					   
					   $scope.callTaxonomyVocabularyResourceGetTree = function(selectTaxonomyVocabularysGetTree) {
						   requestStart = Date.now();
						   TaxonomyVocabularyResource.getTree(selectTaxonomyVocabularysGetTree.vid, selectTaxonomyVocabularysGetTree.parent, selectTaxonomyVocabularysGetTree.maxdepth, selectTaxonomyVocabularysGetTree.load_entities ).then(
						    		//success
						    		function(data) {
						    			console.log('taxonomyVocabulary getTree request success'); 
						    		},
						    		//error
						    		function(data) {
						    			console.log('taxonomyVocabulary getTree request error'); 
						    		}
						    );
					   };
					   //
					   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyGetTreeConfirmed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyGetTreeRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					 
					   TaxonomyVocabularyResourceChannel.onTaxonomyVocabularyGetTreeFailed($scope, function(data) { 
						   requestEnd = Date.now();
			    		   $scope.taxonomyVocabularyGetTreeRequests.push({requestStart:requestStart, requestEnd:requestEnd,  requestDuration:requestEnd-requestStart, data:data});
					   });
					   
					   
					   
					   
					   
			
			    
}]);


