;(function() {
	 console.log('in drupalionicDemo.articleFeed.articleDetail.controller'); 
	angular
	.module('drupalionicDemo.articleFeed.articleDetail.controller',  ['ngDrupal7Services-3_x.resources.node', 'ngDrupal7Services-3_x.commons.configurations'])
	.controller('ArticleDetailController', ArticleDetailController);
	
	ArticleDetailController.$inject = ['$scope','$stateParams','UserResource','NodeResource','DrupalHelperService','articleDetail']
	
	function ArticleDetailController(   $scope,  $stateParams,  UserResource,  NodeResource,  DrupalHelperService,  articleDetail) {
		 console.log('in ArticleDetailController'); 
		 console.log(articleDetail); 
		 
		 var vm = this;
		 vm = angular.extend(vm, articleDetail) ;
		 vm.pathToImg = false;
		 
		 //vm.user = undefined; 
		 vm.pathToUserImg = false;
		 
		 //vm.comments = [];
		 
		 vm.pathToImg = DrupalHelperService.getPathToImgByStyle('large') + articleDetail.field_image.und[0].uri.split('//')[1];
	
		 /*if(vm.article.uid) {
			 UserResource.retrieve(vm.article.uid).then(
					 function(user) {
						 if(user.picture !== null && user.picture.filename !== null) {
							 vm.user = user;
							 vm.pathToUserImg = vm.pathToCms + '/sites/default/files/styles/thumbnail/public/pictures/' + user.picture.filename; 
						 }
					 },
					 //error loading user
					 function() {}
			 );
		 }*/
		 
		 /*vm.loadingComments = false;
		 vm.loadComments = function (numOfNodes) {
			 if(numOfNodes > 0) {
				 vm.loadingComments = true;
				 NodeResource.comments(vm.article.uid).then(
						 function(newComments) {
							 vm.loadingComments = false;
							 vm.comments = newComments;
						 },
						 //error loading user
						 function() {
							 vm.loadingComments = false;
						 }
				 );
			 }
		}	
		 
		 vm.createComment = function(nid, cid) {
			 console.log(nid, cid); 
		 }*/
		
	};
/*
	authedTabsNodeDemoControllers.controller('NodeEditCtrl', function(vm, $state, NodeResource, NodeResourceChannel, nodeObj) {
		vm.nid = nodeObj.nid;
		delete nodeObj.nid;
		
		vm.dirtyPage = nodeObj;
		vm.editServerErrors = [];
		 
		NodeResourceChannel.onNodeUpdateConfirmed(vm, function(node) { 
			console.log('NodeEditCtrl onNodeUpdateConfirmed'); 
		});
		
		 vm.updatePage = function() {
			
			 NodeResource.update(vm.nid, vm.dirtyPage).then(
					   //success
					   function(data) {
						   $state.go('app.authed-tabs.node-list');
					   },
					   //error
					   function(data) { 
						   vm.editServerErrors.push(data); 
					}
			);
		 }
	}
	*/
	
})();


