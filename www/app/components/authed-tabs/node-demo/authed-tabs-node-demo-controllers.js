var authedTabsNodeDemoControllers = angular.module('authed-tabs.node-demo.controllers',  ['drupalBaseModules','NodeResourceModules', 'CommentResourceModules']);

/* Node Demo Controller */
authedTabsNodeDemoControllers.controller('NodeListCtrl', 
		   [ '$scope', '$state', '$ionicListDelegate', '$ionicModal', 'BaseResource', 'NodeResource', 'NodeResourceChannel', 'pageSize', 'pageFirst', 'newNodes', 
    function( $scope,   $state,   $ionicListDelegate,   $ionicModal,   BaseResource,   NodeResource,   NodeResourceChannel,   pageSize,   pageFirst,   newNodes) {
			   
			   var mergeNodes = function(newNodes, mergeNodes) {
				   var uniqueNodes = [];
	    			
	    			angular.forEach(newNodes, function(newNode) {
	    				isUnique = true;
	    				angular.forEach(mergeNodes, function(mergeNode) {
	    					
	    					if(newNode.nid == mergeNode.nid) {
	    						isUnique = false;
	    					}
	    					
	    				}, isUnique);
	    				 
	    				if(isUnique) {
	    					 uniqueNodes.push(newNode);
	    				}	
	    			}, uniqueNodes);

				   return uniqueNodes.concat(mergeNodes);
			   };
			   
			   var updateNode = function(updatedNode) {
    				
			   };
			   /**/
			   /*NodeResourceChannel.onNodeUpdateConfirmed($scope, function(data) { 
				   	console.log('onNodeUpdateConfirmed'); 
					angular.forEach($scope.nodes, function(node, key) {
    					if(node.nid == updatedNode.nid) {
    						$scope.nodes[updatedNode.nid] = updatedNode;
    					}
    				});
				});*/
			   
			    NodeResourceChannel.onNodeUpdateConfirmed($scope, function(node) { 
					console.log('NodeListCtrl onNodeUpdateConfirmed'); 
				});
				
				NodeResourceChannel.onNodeCreateConfirmed($scope, function(node) { 
					console.log('onNodeUpdateConfirmed'); 
					$scope.doRefresh();
				});
				
			   
			   var CheckNewNodes = function(){
			 		//$timeout(function(){
			    	$scope.doRefresh();	
			 		//},10000);
			    }
			    
			   //CheckNewNodes();
			   
			   //
			   //CRUD list
			   //
			   
			   //
			   //Index
			   //
			   $scope.listOptions = {};
			   $scope.listOptions.showDelete = false;
			   
			   $scope.nodes = [];
			   $scope.nodes = mergeNodes(newNodes, $scope.nodes); 
			  			   
			   //get params for index request
			   $scope.nodeIndex = {};
			   $scope.nodeIndex.pageFirst = pageFirst!=undefined?pageFirst:0; 
			   $scope.nodeIndex.pageLast = $scope.nodeIndex.pageFirst + 1;
			   $scope.nodeIndex.maxPage = undefined;
			   //$scope.nodeIndex.page = 0;
			   $scope.nodeIndex.fields = {
					   nid : true, 
					   type : true, 
					   title : true,
					   created : true
			   }
			   $scope.nodeIndex.parameters = {};
			   $scope.nodeIndex.pagesize = pageSize!=undefined?pageSize:25;
			   
			   $scope.doRefresh = function() {
				  if($scope.nodeIndex.pageFirst > 0) { $scope.nodeIndex.pageFirst-- }
				  $scope.nodeIndex.page =  $scope.nodeIndex.pageFirst;
				 
				  NodeResource.index( $scope.nodeIndex).then(
				    		//success
				    		function(newNodes) { 
				    			$scope.nodes = mergeNodes(newNodes, $scope.nodes); 
				    			//Stop the ion-refresher from spinning
				 				$scope.$broadcast('scroll.refreshComplete');
				    		},
				    		//error
				    		function(data) { 
				    			//Stop the ion-refresher from spinning
			 					$scope.$broadcast('scroll.refreshComplete');
			 				}
				    );
			   };
			   
			   $scope.loadMore = function(){

				   if($scope.nodeIndex.maxPage === undefined) {
					 
					   $scope.nodeIndex.pageLast++,
					   $scope.nodeIndex.page =  $scope.nodeIndex.pageLast;
					   
					   NodeResource.index($scope.nodeIndex).then(
					    		//success
					    		function(newNodes) { 
					    			if(newNodes.length != 0) {
					    				$scope.nodes = $scope.nodes.concat(newNodes);
					    			} else {
					    				$scope.nodeIndex.page--;
					    				$scope.nodeIndex.pageLast = $scope.nodeIndex.page;
					    				$scope.nodeIndex.maxPage  = $scope.nodeIndex.page;
					    			}
					    			//Stop the infiniteScroll spinning
								    $scope.$broadcast('scroll.infiniteScrollComplete');
					    		},
					    		//error
					    		function(data) { 
					    			//Stop the infiniteScroll spinning
								    $scope.$broadcast('scroll.infiniteScrollComplete');
					    		}
					   );
				   } 
				   //no more nodes to load
				   else {
					 //Stop the infiniteScroll spinning
					 $scope.$broadcast('scroll.infiniteScrollComplete');
				   }
				   
		   };
				    
		   //
		   //Retrieve
		   // 
		   $scope.loadingDetail = false;
		   $scope.openNode = function(nid) {	   
			  $scope.loadingDetail = nid;
			  $state.go('app.authed-tabs.node-detail', {nid:nid});
		   }
		   NodeResourceChannel.onNodeRetrieveConfirmed($scope, function(data) { $scope.loadingDetail = false;});
		   NodeResourceChannel.onNodeRetrieveFailed($scope, function(node) { $scope.loadingDetail = false;});

		   //
		   //Edit
		   //
		   $scope.editNode = function(nid) {	  
			   $scope.loadingDetail = nid;
			   $ionicListDelegate.closeOptionButtons();
			   $state.go('app.authed-tabs.node-edit', {nid:nid});
		  }
		   //
		   //Delete
		   //
		   $scope.deleteNode = function(nid, linstIndex) {
			   NodeResource._delete(nid).then(
					   //success
					   function() {
						   $scope.nodes.splice(linstIndex, 1)
					   },
					   //error
					   function(data) { }
			   );
		   }
		   
		    //
			//Create
		   	//  
			// Open our new task modal
			$scope.showCreatePageModal = function(formData) {
				$scope.createPageModal.show();
			};

			// Close the new task modal
			$scope.closeCreatePageModal = function() {
				$scope.createPageModal.hide();
			};
			
			//new node
			$scope.newPage = {};
			$scope.newPage.type = 'page';
		    $scope.newPage.body = BaseResource.structureField( {'value' : '', 'summary' : ''});
			   
			$scope.createPage = function(newPage) {
				NodeResource.create(newPage).then(
						   //success
						   function(data) {
							   
							   $scope.createPageModal.hide();
						   },
						   //error
						   function(data) { }
				   );
			};
			
			// Create and load the createPage Modal
			$ionicModal.fromTemplateUrl( 'app/components/authed-tabs/node-demo/create-page-modal.html', 
											function(modal) {
												$scope.createPageModal = modal;
											}, {
												scope : $scope,
												animation : 'slide-in-up'
											});	   
			/**/
}]);

authedTabsNodeDemoControllers.controller('NodeDetailCtrl', function($scope, $stateParams,  UserResource, NodeResource, nodeObj) {
	 $scope.node = nodeObj;
	 $scope.pathToImg = false;
	 
	 $scope.user = undefined; 
	 $scope.pathToUserImg = false;
	 
	 $scope.comments = [];
	 
	 if($scope.node.field_image) {
		 var imgName = $scope.node.field_image[$scope.node.language][0].uri.split('/').pop();
		 $scope.pathToImg = $scope.pathToCms + 'sites/default/files/styles/large/public/field/image/' + imgName; 
	 }

	 if($scope.node.uid) {
		 UserResource.retrieve($scope.node.uid).then(
				 function(user) {
					 if(user.picture !== null && user.picture.filename !== null) {
						 $scope.user = user;
						 $scope.pathToUserImg = $scope.pathToCms + '/sites/default/files/styles/thumbnail/public/pictures/' + user.picture.filename; 
					 }
				 },
				 //error loading user
				 function() {}
		 );
	 }
	 
	 $scope.loadingComments = false;
	 $scope.loadComments = function (numOfNodes) {
		 if(numOfNodes > 0) {
			 $scope.loadingComments = true;
			 NodeResource.comments($scope.node.uid).then(
					 function(newComments) {
						 $scope.loadingComments = false;
						 $scope.comments = newComments;
					 },
					 //error loading user
					 function() {
						 $scope.loadingComments = false;
					 }
			 );
		 }
	}	
	 
	 $scope.createComment = function(nid, cid) {
		 console.log(nid, cid); 
	 }
	
});

authedTabsNodeDemoControllers.controller('NodeEditCtrl', function($scope, $state, NodeResource, NodeResourceChannel, nodeObj) {
	$scope.nid = nodeObj.nid;
	delete nodeObj.nid;
	
	$scope.dirtyPage = nodeObj;
	$scope.editServerErrors = [];
	 
	NodeResourceChannel.onNodeUpdateConfirmed($scope, function(node) { 
		console.log('NodeEditCtrl onNodeUpdateConfirmed'); 
	});
	
	 $scope.updatePage = function() {
		
		 NodeResource.update($scope.nid, $scope.dirtyPage).then(
				   //success
				   function(data) {
					   $state.go('app.authed-tabs.node-list');
				   },
				   //error
				   function(data) { 
					   $scope.editServerErrors.push(data); 
				}
		);
	 }
	 
});


