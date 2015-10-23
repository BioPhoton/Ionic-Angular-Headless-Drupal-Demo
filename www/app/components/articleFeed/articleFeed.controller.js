(function() {

	angular.module(
			'drupalionicDemo.articleFeed.controller',
			[ 'ngDrupal7Services-3_x.resources.views',
					'drupalionicDemo.articleFeed.service' ]).controller(
			'ArticleFeedController', ArticleFeedController);

	ArticleFeedController.$inject = [ '$scope', '$state', '$filter',
			'$ionicListDelegate', '$ionicModal', 'ArticleFeedService',
			'actualArticles' ]

	function ArticleFeedController($scope, $state, $filter, $ionicListDelegate,
			$ionicModal, ArticleFeedService, actualArticles) {

		var vm = this;

		//vars
		vm.loadingDetail = false;
		vm.articles = actualArticles;
		//functions
		vm.doRefresh = doRefresh;
		vm.loadMore = loadMore;
		vm.openDetail = openDetail;

		//hide loading spinner on routechange
		$scope.$on("$stateChangeSuccess", function() {
			vm.loadingDetail = false;
		});

		///////////////////////////////

		function doRefresh() {
			ArticleFeedService.loadRecent().then(
			function(allNodes) {
				vm.articles = allNodes;
				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			},
			function(data) {
				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		function loadMore() {
			ArticleFeedService.loadMore().then(
				function(allNodes) {
					vm.articles = allNodes;
					//Stop the ion-refresher from spinning
					$scope.$broadcast('scroll.infiniteScrollComplete');
				},
				function(data) {
					//Stop the ion-refresher from spinning
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		};

		function openDetail(articleToOpen) {
			vm.loadingDetail = articleToOpen.nid;
			
			$state.go('app.articleDetail', {
				nid 	: articleToOpen.nid,
				title 	: articleToOpen.title
			});
		};

	}

})();