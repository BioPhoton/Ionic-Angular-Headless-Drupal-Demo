var authedTabsNodeDemoControllers = angular.module('authed-tabs.node-demo.controllers',  ['common.drupal.api-services', 'common.drupal.api-resources']);


/* Node Demo Controller */
authedTabsNodeDemoControllers.controller('NodeListCtrl', 
		   ['$scope', '$state', '$timeout', '$ionicModal', 'NodeResource', 'drupalApiNotificationChannel', 
    function($scope,   $state,   $timeout,   $ionicModal,   NodeResource,   drupalApiNotificationChannel) {
			  
			   $scope.listOptions = {};
			   $scope.listOptions.showDelete = false;
			   
			   $scope.nodes = [];
			  			   
			   //get params for index request
			   $scope.nodeIndex = {};
			   $scope.nodeIndex.pageFirst = 1; 
			   $scope.nodeIndex.pageLast = $scope.nodeIndex.pageFirst + 1;
			   $scope.nodeIndex.fields = 'nid, type, title, created,';
			   $scope.nodeIndex.parameters = 'type=article';
			   $scope.nodeIndex.pagesize = 5;
			   			   
			   $scope.doRefresh = function() {
				  
				   NodeResource.index( $scope.nodeIndex.pageFirst--,  $scope.nodeIndex.fields,  $scope.nodeIndex.parameters,  $scope.nodeIndex.pagesize).then(
				    		//success
				    		function(nodes) { 
				    			console.log(nodes); 
				    			$scope.nodes = nodes.concat($scope.nodes); 
				    			
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
			   
			    var CheckNewNodes = function(){
			 		//$timeout(function(){
			 			NodeResource.index( $scope.nodeIndex.pageFirst,  $scope.nodeIndex.fields,  $scope.nodeIndex.parameters,  $scope.nodeIndex.pagesize).then(
					    		//success
					    		function(nodes) { 
					    			$scope.nodes = nodes.concat($scope.nodes); 
					    			//Stop the ion-refresher from spinning
					 				$scope.$broadcast('scroll.refreshComplete');
					    		},
					    		//error
					    		function(data) { console.log('error: '+data); }
					    );
			 		//},10000);
			    }
			   
			   $scope.openNode = function(nid) {	   
				  console.log(nid);
				  $state.go('app.authed-tabs.node-detail', {nid:nid});
			   }
			    
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
			   
			// Open our new task modal
			$scope.showCreatePageModal = function(formData) {
				$scope.createPageModal.show();
			};

			// Close the new task modal
			$scope.closeCreatePageModal = function() {
				$scope.createPageModal.hide();
			};
			   
			//init 
			CheckNewNodes();
			// Create and load the regsiterModal
			$ionicModal.fromTemplateUrl( 'app/components/authed-tabs/node-demo/create-page-modal.html', 
											function(modal) {
				console.log('ASF'); 
												$scope.createPageModal = modal;
											}, {
												scope : $scope,
												animation : 'slide-in-up'
											});
			
			

			   
}]);


authedTabsNodeDemoControllers.controller('NodeDetailCtrl', function($scope, $stateParams, nodeObj) {
	 $scope.node = nodeObj;
})

/*
	.controller('MovieCreateController', function($scope, $state, $stateParams, Movie) {
	  $scope.movie = new Movie();  //create new movie instance. Properties will be set via ng-model on UI
	 
	  $scope.addMovie = function() { //create a new movie. Issues a POST to /api/movies
	    $scope.movie.$save(function() {
	      $state.go('movies'); // on success go back to home i.e. movies state.
	    });
	  };
	}).controller('MovieEditController', function($scope, $state, $stateParams, Movie) {
	  $scope.updateMovie = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
	    $scope.movie.$update(function() {
	      $state.go('movies'); // on success go back to home i.e. movies state.
	    });
	  };
	 

*/
