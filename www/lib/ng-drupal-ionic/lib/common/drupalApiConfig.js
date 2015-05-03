/**
 * 
 */
var drupalApiConfigurations = angular.module('drupal.configurations', []);

/* Constants for drupalApiService */
drupalApiConfigurations.constant("drupalApiConfig", {
      //					   
      // Drupal depending settings
      //
	
	  // Sites domain
	  drupal_instance	: 'http://your.site.name/',
	 
	  // Service endpoint 
	  api_endpoint : 'api/',

	  // By default, Drupal is configured with a session expiration time of 2000000 seconds which is 23 day 3 hr. 33 min. 20 sec
	  // To customize this install the session expire module => https://www.drupal.org/project/session_expire
	  // and also set same value here
  	  session_expiration_time : 2000000,
	  // Session Expriation untis (seconds because Drupals default time is in seconds)
	  session_expiration_unite : 'seconds',
	
	  //path to public folder
	  publicFilePath : "public://",
	  //path to public folder
	  privateFilePath : "private://",
	
});