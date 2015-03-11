var authedTabsNodeDemoControllers = angular.module('authed-tabs.node-demo.controllers',  ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Node Demo Controller */
authedTabsNodeDemoControllers.controller('NodeListCtrl', 
		   ['$scope', '$state', '$timeout', '$ionicModal', 'NodeResource', 'drupalApiNotificationChannel', 'pageSize', 'pageFirst', 'newNodes', 
    function($scope,   $state,   $timeout,   $ionicModal,   NodeResource,   drupalApiNotificationChannel,   pageSize,   pageFirst,   newNodes) {
			   
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
				   console.log(uniqueNodes); 
				   return uniqueNodes.concat(mergeNodes);
			   };
			   
			   var updateNode = function(updatedNode) {
    				
			   };
			   

				drupalApiNotificationChannel.onNodeUpdateConfirmed($scope, function(data) { 
					console.log('onNodeUpdateConfirmed');
					angular.forEach($scope.nodes, function(node, key) {
    					if(node.nid == updatedNode.nid) {
    						$scope.nodes[updatedNode.nid] = updatedNode;
    					}
    				});
				});
				
				drupalApiNotificationChannel.onNodeCreateConfirmed($scope, function(node) { 
					console.log('onNodeCreateConfirmed');
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
			   $scope.nodeIndex.fields = 'nid, type, title, created';
			   $scope.nodeIndex.pagesize = pageSize!=undefined?pageSize:5;
			   	
			   
			   
			   $scope.doRefresh = function() {
				  if($scope.nodeIndex.pageFirst > 0) {
					  $scope.nodeIndex.pageFirst--
				  }
				  NodeResource.index( $scope.nodeIndex.pageFirst,  $scope.nodeIndex.fields,  $scope.nodeIndex.parameters,  $scope.nodeIndex.pagesize).then(
				    		//success
				    		function(newNodes) { 
				    			$scope.nodes = mergeNodes(newNodes, $scope.nodes); 
				    			
				    			//Stop the ion-refresher from spinning
				 				$scope.$broadcast('scroll.refreshComplete');
				    		},
				    		//error
				    		function(data) { 
				    			console.log('error: '+data); 
				    			//Stop the ion-refresher from spinning
			 					$scope.$broadcast('scroll.refreshComplete');
			 				}
				    );
			   };
			   
			   $scope.loadMore = function(){
				   
				   NodeResource.index( $scope.nodeIndex.pageLast++,  $scope.nodeIndex.fields,  $scope.nodeIndex.parameters,  $scope.nodeIndex.pagesize).then(
				    		//success
				    		function(nodes) { 
				    			if(nodes.length != 0) {
				    				$scope.nodes = $scope.nodes.concat(nodes);
				    			}
				    			 
				    			//Stop the infiniteScroll
							     $scope.$broadcast('scroll.infiniteScrollComplete');
				    		},
				    		//error
				    		function(data) { 
				    			console.log(data); 
				    			$scope.nodeIndex.pageLast++;
				    			//Stop the infiniteScroll
							    $scope.$broadcast('scroll.infiniteScrollComplete');
							     
				    		}
				   );
				   
			   };
				    
		   //
		   //Retrieve
		   // 
		   $scope.loadingDetail = false;
		   $scope.openNode = function(nid) {	   
			  $scope.loadingDetail = nid;
			  $state.go('app.authed-tabs.node-detail', {nid:nid});
		   }
		   
		   drupalApiNotificationChannel.onNodeRetrieveConfirmed($scope, function(data) { $scope.loadingDetail = false;});
		   drupalApiNotificationChannel.onNodeRetrieveFailed($scope, function(node) { $scope.loadingDetail = false;});
		   
		   
		   
		   //
		   //Edit
		   //
		   $scope.editNode = function(nid) {	
			   console.log(nid); 
				  $state.go('app.authed-tabs.node-edit', {nid:nid});
		  }
		   //
		   //Delete
		   //
		   $scope.deleteNode = function(nid, linstIndex) {
			   console.log(nid, linstIndex); 
			   NodeResource._delete(nid).then(
					   //success
					   function() {
						   $scope.nodes.splice(linstIndex, 1)
					   },
					   //error
					   function(data) { console.log('error: '+data); }
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
		    $scope.newPage.body = {};
		    $scope.newPage.body.und = []
		    $scope.newPage.body.und[0] = { value : '', summary : '' }
			   
			$scope.createPage = function(newPage) {

				NodeResource.create(newPage).then(
						   //success
						   function(data) {

							   $scope.createPageModal.hide();
							  //$state.go('app.authed-tabs.node-detail', {nid:data.nid} );
						   },
						   //error
						   function(data) { console.log('error: '+data); }
				   );
			};
			
			// Create and load the regsiterModal
			$ionicModal.fromTemplateUrl( 'app/components/authed-tabs/node-demo/create-page-modal.html', 
											function(modal) {
												$scope.createPageModal = modal;
											}, {
												scope : $scope,
												animation : 'slide-in-up'
											});	   
			   
}]);

authedTabsNodeDemoControllers.controller('NodeDetailCtrl', function($scope, $stateParams, nodeObj) {
	 $scope.node = nodeObj;
	 $scope.pathToImg = false;
	 
	 if($scope.node.field_image) {
		 var imgName = $scope.node.field_image[$scope.node.language][0].uri.split('/').pop();
		 $scope.pathToImg = $scope.pathToCms + 'sites/default/files/styles/large/public/field/image/' + imgName; 
	 }
	
});


authedTabsNodeDemoControllers.controller('NodeEditCtrl', function($scope, $state, NodeResource, nodeObj) {
	$scope.nid = nodeObj.nid;
	delete nodeObj.nid;
	
	$scope.dirtyPage = nodeObj;
	$scope.editServerErrors = [];
	 
	 $scope.updatePage = function() {
		
		 NodeResource.update($scope.nid, $scope.dirtyPage).then(
				   //success
				   function(data) {
					   $state.go('app.authed-tabs.node-list');
				   },
				   //error
				   function(data) { 
					   $scope.editServerErrors.push(data.form_errors); 
				}
		);
	 }
	 
});


