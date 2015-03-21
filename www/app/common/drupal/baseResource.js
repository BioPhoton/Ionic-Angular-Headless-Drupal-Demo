/**
 * Base functionality of drupay services
 */
var drupalBaseModules = angular.module('drupalBaseModules', ['drupal.configurations']);

drupalBaseModules.factory('baseResource', function() {
	
    var getParams = [];
    var formats = { 
    			  'array' : true,
    			  'array_keys' : true,
    			  'array_key_value' : true,
    			  'json' : true,
    }
    //define method
    var prepareAndSetGetParam = function(values, key, format) {
    	
        var self = this;
    	
		//validate key
		if(key) { 
			key = (key)?key:false;
			if(key === false) {return false;}
		} else { return false; }
		
		//validate values
		if(values) { 
			values = (values || values === 0)?values:false;
			if(values === false) {return false;}
			else if (Object.getOwnPropertyNames(values).length <= 0) { return false; }
		} else { return false; }
		
		
		//normal param
		if(!format) {
			if(values) { getParams.push(key + '=' + values); }
			return true;
		}
		
		//validate format
		if(!formats[format]) { 
			console.log('invalide format'); 
			return false; 
		}
		
		//json
		//exposed_filter=value
		if(format === 'json') {
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(k + '=' + value) }
			});
			return true;
		}
		//array
		//fields=value1, vaule2, value3, 
		if(format === 'array') {
			var arrayValues = [];
			angular.forEach(values, function(value, k) {
				if(value !== false) { this.push(k); }
			}, arrayValues);
			
			self.getParams.push(key + '=' + arrayValues.join(','))
			return true;
		}
		//array_keys
		//exposed_filter=key1
		if(format === 'array_keys') {
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(key + '=' + k) }
			});
			return true;
		}

		//array_key_value
		//parameters[key1]=value1
		if(format === 'array_key_value') {
			
			angular.forEach(values, function(value, k) {
				if(value) { self.getParams.push(key+"['"+k+"']="+ value); }
			});
			return true;
		}
		
	};
	
	return {
		prepareAndSetGetParam : prepareAndSetGetParam,
		getParams : getParams
	};
	
});