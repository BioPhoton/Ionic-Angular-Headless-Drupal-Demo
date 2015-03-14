/**
 * 
 */
var drupalApiService = angular.module('drupal.configurations', []);

/* Constants for drupalApiService */
drupalApiService.constant("drupalApiConfig", {
   //					   
   // Drupal depending settings
   //
	
	  // Your sites domain
	  drupal_instance	: 'http://dev-drupal-headless-ionic.pantheon.io/',
	 
	  // Your service endpoints  
	  api_endpoints		:  {
		  //Default Enpoint settings
	  	  default : {
			  path : 'api/v1/'
		  },
		  // Endpoint api/v1/
		  // Machine-readable name of the endpoint
		  api_v1 : { path: 'api/v1/' },
	  },

	// By default, Drupal ships with a session expiration time of 2000000 seconds which is 23 day 3 hr. 33 min. 20 sec
	// To customize this install the session expire module => https://www.drupal.org/project/session_expire
	// and also set same value here
	session_expiration_time : 10000 //2000000
});