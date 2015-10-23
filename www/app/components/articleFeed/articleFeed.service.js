;(function() {
	
	 angular
	 .module('drupalionicDemo.articleFeed.service', ['ngDrupal7Services-3_x.resources.views', 'ngDrupal7Services-3_x.commons.helperService', 'ngDrupal7Services-3_x.commons.configurations'])
	.factory('ArticleFeedService', ArticleFeedService);
	 
	ArticleFeedService.inject = ['$q','$filter','DrupalHelperService','ViewsResource','DrupalApiConstant' ]
    
	function ArticleFeedService ( $q,  $filter,  DrupalHelperService,  ViewsResource,  DrupalApiConstant) {

		 var initialised = false,
		 			
			//pagination options
			paginationOptions = {};
			paginationOptions.pageFirst = 0;
			paginationOptions.pageLast = undefined;
			paginationOptions.maxPage = undefined;
			
			//Options for indexing nodes
			var viewsOptions = {};
			viewsOptions.view_name = 'testview';
			viewsOptions.page = 0;
			viewsOptions.pagesize = 25;
			viewsOptions.format_output = '0';
			
			//stored article
			var articles = [];
			
			
			
			var articleFeedService = {
				    	init		: init,
				    	getAll 		: getAll,
				    	get 		: get,
				    	loadRecent 	: loadRecent,
				    	loadMore 	: loadMore
				    };
			 
			 return articleFeedService;
			
		 
		 /////////////////////////////////////////////////////////////
		 
		 function init() {
				var defer = $q.defer();
				
				retreiveArticles(viewsOptions)
					.then(
			    		//success
			    		function(newArticles) { 
							defer.resolve(articles);
			    		}
		    		)
		    		.catch(
			    		function(error) {
			    			defer.reject(error);
			    		}
		    		)
					.finally(
							function() {
								initialised = true;
							}
					);
				
				return defer.promise; 
			};
		 
		 
		   function prepareArticle(article) {
				angular.forEach(article.field_image.und, function(value, key) {	
					article.field_image.und[key].imgPath = DrupalHelperService.getPathToImgByStyle(DrupalApiConstant.imageStyles.medium) + article.field_image.und[key].uri.split('//')[1];
				});
				
				article.nid = parseInt(article.nid);
				
				return article;
			};
			
			//returns all articles
			//@TODO implement exposed filters for request and cache
			function getAll() {
				var defer = $q.defer(),
					allFilteredSpots = undefined;
			
				if(articles.length > 0) {
					allFilteredSpots =  articles;
				} else {
					allFilteredSpots = undefined;
				}
				
				if(allFilteredSpots != undefined) {
					defer.resolve(allFilteredSpots);
				}
				else {
					return retreiveArticles(viewsOptions);
				}

				return defer.promise; 
			}
			
			//returns article by nid 
			// first it query's the cache 
			// if item not in cache it fires request to server
			//filter { nid:3 }
			function get(filter) {

				var defer = $q.defer(),
					article = undefined;
			
				//if a filter is given and not empty
				if(angular.isObject(filter) && typeof Object.keys(filter)[0] !== 'undefined' ) {
					article = $filter('filter')(articles, filter)
					if(article.length > 0) {
						article = article[0];
					} 
				}
				
				//return article form cache
				if(angular.isObject(article) && typeof Object.keys(article)[0] !== 'undefined') {
					defer.resolve(article);
				}
				else {
					//setup exposed filters options
					viewsOptions.exposed_filters = filter;
					
					return ViewsResource
								.retrieve(viewsOptions)
									.then(function(result) {
										if(result.data[0]) {
											return result.data[0];
										}
										return $q.reject(false);
									});
				}
				
				return defer.promise;
			}
			
			//loads recent articles and adds to articles array
			function loadRecent() {	
				if(paginationOptions.pageFirst > 0) { paginationOptions.pageFirst = 0; }
				viewsOptions.page =  paginationOptions.pageFirst;
				
				return retreiveArticles(viewsOptions);
			}
			
			//loads articles and adds to articles array
			function loadMore() {
				var defer = $q.defer();
				
				if(paginationOptions.maxPage === undefined) {
				   //start initial with 0
				   paginationOptions.pageLast = (paginationOptions.pageLast === undefined)?0:paginationOptions.pageLast+1,  
				   viewsOptions.page =  paginationOptions.pageLast;
				   
				   return retreiveArticles(viewsOptions);
			   } 
			   //no more nodes to load
			   else {
				  defer.resolve(articles);
			   }
				
			   return defer.promise;
			}
			
			function retreiveArticles(viewsOptions) {	
				console.log('retreiveArticles'); 
				paginationOptions.pageLast = (paginationOptions.pageLast === undefined)?0:paginationOptions.pageLast;
				
				
				var defer = $q.defer();
				ViewsResource
					.retrieve(viewsOptions)
						.then(
				    		function(response) { 
				    			if(response.data.length != 0) {
				    				articles = DrupalHelperService.mergeItems(response.data, articles, undefined, prepareArticle);
				    			}
				    			
				    			if(response.data.length == 0) {
				    				console.log('set max page'); 
				    				viewsOptions.page--;
				    				paginationOptions.pageLast = viewsOptions.page;
				    				paginationOptions.maxPage  = viewsOptions.page;
				    			}
				    			//articles = DrupalHelperService.mergeItems(response.data, articles, undefined, prepareArticle);
				    			defer.resolve(articles);
				    		}
				    	)
				    	.catch(
				    		function(error) { 
				    			defer.reject(error);
			 				}
			    		);
			
				return defer.promise;
				
			}
			
			

	}
	
	
})();
