/**
 * Base functionality of drupay services
 */
var drupalBaseModules = angular.module('drupalBaseModules', ['drupal.configurations']);

drupalBaseModules.constant('BaseResourceConfig', { 
	LANGUAGE_NONE : 'und',
});


drupalBaseModules.factory('BaseResource', ['BaseResourceConfig',  function(baseResourceConfig) {
	
    var getParams = [];
    var formats = { 
    			  'array' : true,
    			  'array_keys' : true,
    			  'array_key_value' : true,
    			  'json' : true,
    }
    
    //private functions
    /**
     * https://github.com/jbeuckm/drupal-client/blob/master/lib/field.js
     */
    function isArray(value) {
  	  return Object.prototype.toString.call( value ) === '[object Array]';
  	}
    
    //public functions 
    
    //define method
    var prepareAndSetGetParam = function(values, key, format) {
    	
        var self = this;
    	
		//validate key
		if(key) { 
			key = (key)?key:false;
			if(key === false) {return false;}
		} else { return false; }
		
		//validate values
		values = (values || values === 0)?values:false;
		
		//validate values
		if(values === false) {return false;}
		else if (Object.getOwnPropertyNames(values).length <= 0 && parseInt(values) === NaN) { return false; }
		
		 
		//normal param
		if(!format) {
			if(values || values === 0) { self.getParams.push(key + '=' + values); }
			return true;
		}
		
		//validate format
		if(!formats[format]) { 
			return false; 
		}
		
		//json
		//example: exposed_filter=value
		if(format === 'json') {
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(k + '=' + value) }
			});
			return true;
		}
		//array
		//example: fields=value1, vaule2, value3, 
		if(format === 'array' && Object.getOwnPropertyNames(values).length > 0) {
		
			var arrayValues = [];
			angular.forEach(values, function(value, k) {
				if(value !== false) { this.push(k); }
			}, arrayValues);	
			if(arrayValues.length) { self.getParams.push(key + '=' + arrayValues.join(',')); }
			return true;
		}
		//array_keys
		//example: exposed_filter1=key1
		if(format === 'array_keys') {
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(key + '=' + k) }
			});
			return true;
		}

		//array_key_value
		//example: parameters[key1]=value1
		if(format === 'array_key_value') {
			
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(key+"["+k+"]="+ value); }
			});
			return true;
		}
		
	};
	
	/**
	 * https://github.com/jbeuckm/drupal-client/blob/master/lib/field.js
	 * Create the basic field structure for uploading a field.
	 */
	function structureField(value, _label, language) {

	  // record optional label string or default to "value"
	  var label = _label || "value";
	  var language_key = (language)? function() {return language}:function() {return baseResourceConfig.LANGUAGE_NONE};

	  if (isArray(value)) {

	    var field_array = [];
	    for (var i= 0, l=value.length; i<l; i++) {
	      var item = {};
	      item[label] = value[i];

	      field_array.push(item);
	    }
	    return {
	      und: field_array
	    };
	  }

	  if (value instanceof Date) {

	    var obj = {
	      value: {
	        date: (value.getMonth()+1)+'/'+value.getDate()+'/'+value.getFullYear()+' - '+value.getHours()+':'+value.getMinutes()+':'+value.getSeconds()
	      }
	    };

	    return {
	    	und: [
	        obj
	      ]
	    };
	  }

	  // field value given with label(s) already built
	  if (typeof value == "object") {
	    return {
	    	und: [
	        value
	      ]
	    }
	  }


	  var item = {};
	  item[label] = value;

	  return {
		  und: [
	      item
	    ]
	  };
	}

	/**
	 * https://github.com/jbeuckm/drupal-client/blob/master/lib/field.js
	 * Do the custom serialization for sending drupal views contextual filter settings
	 *
	 * @param {Object} obj
	 */
	function serializeDrupalViewsFilter(obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj[p]  instanceof Array) {

	      for (var i = 0, l = obj[p].length; i < l; i++) {
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][i]));
	      }
	    }
	    else {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join("&");
	}
	
	
	//merge new items to stored list by over nid
	var mergeItemsIntoList = function(newItems, currentItems) {
		   var uniqueNodes = [];
 			
 			angular.forEach(newItems, function(newItem) {
 				isUnique = true;
 				angular.forEach(currentItems, function(currentItems, nid) {
 					if(newItem.nid == currentItems.nid) { isUnique = false; }
 				}, isUnique);
 				 
 				if(isUnique) {
 					currentItems[newItem.nid] = newItem;
 					uniqueNodes[newItem.nid] = newItem;
 				}	
 			}, uniqueNodes);
 			
 			return uniqueNodes.concat(currentItems);
	};
	
	//loads recent meetings and adds to meetings array
	var loadRecent = function(rangeOptions, requestOptions, itemList) {
		var defer = $q.defer();
		var result = { 	rangeOptions 	: rangeOptions,
						requestOptions	: requestOptions,
						itemList		: itemList
		};
		
		if(result.rangeOptions.pageFirst > 0) { result.rangeOptions.pageFirst = 0 }
		result.requestOptions.page =  result.rangeOptions.pageFirst;
		
		ViewsResource.retrieve(meetingViewName, result.requestOptions).then(
		    		//success
		    		function(newItems) { 
		    			result.itemList = mergeItemsIntoList(newItems, result.itemList);
		    			defer.resolve(result);
		    		},
		    		//error
		    		function(error) { 
		    			result.error = error;
		    			defer.reject(result);
	 				}
		);
		return defer.promise;
	}
	
	//loads meetings and adds to meetings array
	var loadMore = function() {
		var defer = $q.defer();
		if(maxPage === undefined) {
		   pageLast++,
		   viewsOptions.page =  pageLast;
		   
		   ViewsResource.retrieve(meetingViewName, viewsOptions).then(
		    		//success
		    		function(newNodes) { 
		    			if(newNodes.length != 0) {
		    				mergeNodes(newNodes);
		    			} 
		    			else {
		    				viewsOptions.page--;
		    				pageLast = viewsOptions.page;
		    				maxPage  = viewsOptions.page;
		    			}
	    				defer.resolve(meetings);
		    		},
		    		//error
		    		function(error) { 
		    			defer.reject(error);
		    		}
		   );
	   } 
	   //no more nodes to load
	   else {
		  defer.resolve(meetings);
	   }
	   return defer.promise;
	}
	
	
	

	return {
		prepareAndSetGetParam : prepareAndSetGetParam,
		getParams : getParams,
		structureField : structureField,
		serializeDrupalViewsFilter : serializeDrupalViewsFilter		
	};
	
}]);