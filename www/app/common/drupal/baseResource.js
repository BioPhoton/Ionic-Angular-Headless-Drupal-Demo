/**
 * Base functionality of drupay services
 */
var drupalBaseModules = angular.module('drupalBaseModules', ['drupal.configurations']);

drupalBaseModules.factory('baseResource', 
                                     function() {
	
	
    // instantiate our initial object
    var baseResource = function() {
        this.getParams = [];
    };
    
    //define method
    baseResource.prototype.prepareAndSetGetParam = function(key, values, type) {
    	
    	// Generally, javascript callbacks, like here the $http.get callback,
        // change the value of the "this" variable inside it
        // so we need to keep a reference to the current instance "this" :
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
		//validate type
		if(type) { if(type != 'array' && type != 'json' && type != 'array_keys') { return false; } }
		
		//normal param
		if(!type) {
			getParams.push(key + '=' + values);
			return true;
		}
		//json
		if(type === 'json') {
			angular.forEach(values, function(value, k) {
				self.getParams.push(k + '=' + value)
			});
			return true;
		}
		//array
		if(type === 'array') {
			var arrayValues = [];
			angular.forEach(values, function(value, k) {
				if(value !== false) { this.push(k); }
			}, arrayValues);
			
			self.getParams.push(key + '=' + arrayValues.join(','))
			return true;
		}
		//array_keys
		if(type === 'array_keys') {
			angular.forEach(values, function(value, k) {
				if(value !== false) { self.getParams.push(key + '=' + k) }
			});
			return true;
		}
		//array_key_value
		if(type === 'array_key_value') {
			angular.forEach(values, function(value, k) {
				self.getParams.push(key+"['"+k+"']="+ value);
			});
			return true;
		}
		
	};
	

	return baseResource;
	
});