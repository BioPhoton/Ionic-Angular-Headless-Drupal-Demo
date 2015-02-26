var drupalResources = angular.module('common.drupal.node-resources', []);

/**
 * NodeResource
 * 
 * This service mirrors the Drupal node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * @TODO check
 * your_api_endpoint/node/*|<mirror>|POST|Content-Type
 * 
**/
drupalResources.factory('NodeResource', function($http, $q, DrupalAPISettings) {
	
	/*
	 * getPreparedIndexParams
	 * */
	var getPreparedIndexParams = function(page, fields, parameters, pagesize) {
		
		var preparedIndexParams = '',
			Ampersand = '&';
		
		//Prepare page param
		page = (page)?page:false;
		if(page !== false) { page = (parseInt(page) != NaN)?parseInt(page):false; }
		if(page !== false) { preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?Ampersand:'') +  "page="+page; }
		
		
		//Prepare fields param
		fields = (fields)?fields:false;
		if(fields !== false) {
			//parse array
			//@TODO parse array to get params or set false
		}
		if(fields !== false) { 
			preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?Ampersand:'') + fields;
		}
		
		//Prepare parameters param
		parameters = (parameters)?parameters:false;
		if(parameters !== false) {
			//parse array
			//@TODO parse array to get params or set false
		}
		if(parameters !== false) { 
			preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?Ampersand:'') + parameters;
		}
		
		//Prepare pagesize param
		pagesize = (pagesize)?pagesize:false;
		if(pagesize !== false) { pagesize = (parseInt(pagesize) != NaN)?parseInt(pagesize):false; }
		if(pagesize !== false) { preparedIndexParams = preparedIndexParams + ( (preparedIndexParams !== '')?Ampersand:'') +  "pagesize="+pagesize; }
		
		return preparedIndexParams;
	}
	
	/*
	 * 
	 * Retrieve
	 * 
	 * Drupal CORS settings: 
	 * "api_endpoint/node/*|<mirror>|GET|Content-Type"
	 *  Note: . 
	 * 
	 * Retrieves a single node.
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/node/{NID}
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} nid The nid of the node to retrieve., required:true, source:path
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: NodeResource.retrieve().success(yourSuccessCallback).error(yourErrorCallback);
	*/
	var retrieve = function(nid){

		var retrievePath = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.node_retrieve + nid;
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath,
			};
		
		if(!nid) { defer.reject(['Param nid is required.']); }
		else {
			$http(requestConfig)
			.success(function(data, status, headers, config){
				defer.resolve(data);
			})
			.error(function(data, status, headers, config){
				defer.reject(data);
			});
		}
		return defer.promise;

	};
	
	/*
	 * Index
	 * Drupal CORS settings api_endpoint/node*|<mirror>|GET|Content-Type
	 * Note: Also retrieve action is allowed with this setting. 
	 * 
	 * List all nodes. 
	 * 
	 * Method: GET 
	 * Url: http://drupal_instance/api_endpoint/node
	 * Headers: Content-Type:application/json
	 * 
	 * @param {Integer} page The zero-based index of the page to get, defaults to 0., required:false, source:param
	 *@TODO find link to drupal docs of possible values 
	 * @param {Array} fields The fields to get., defaults to 0., required:false, source:param
	 *@TODO find link to drupal docs of possible values 
	 * @param {Array} parameters Parameters array, required:false, source:param
	 * @param {Integer} pagesize Number of records to get per page. For unauthorized users 25 is maximum., required:false, source:param
	 * 
	 * @return 	{Promise}
	 * 
	 * useage: NodeResource.index().success(yourSuccessCallback(data)).error(yourErrorCallback(error));
	 */
	var index = function(page, fields, parameters, pagesize) {
		
		var IndexParams = getPreparedIndexParams(page, fields, parameters, pagesize),
			indexPath = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.node_index + IndexParams,
			defer = $q.defer(),
			requestConfig = {
				method :'GET',
				url : retrievePath,
			};
		
		$http(requestConfig)
		.success(function(data, status, headers, config){
			defer.resolve(data);
		})
		.error(function(data, status, headers, config){
			defer.reject(data);
		});
		
		return defer.promise;

	};

	//public methods	
	return {
		retrieve : retrieve,
		index	 : index
	};

});
