/**
 * Drupal Api authentication service
 */
var ApiAuthModules = angular.module('ApiAuthModules', ['drupal.configurations', 'SystemResourceModules', 'UserResourceModules', 'ipCookie']);


//@TODO config provider

/**
 *  Constants for ApiAuthModules 
 */
ApiAuthModules.constant("ApiAuthServiceConfig", {
   //					   
   // Drupal depending settings
   //

   //the drupals guest user obj
   anonymousUser : {"uid":0,"roles":{"1":"anonymous user"},"cache":0,"timestamp":Date.now()},
  
	//
	// Constants for ApiAuthService
	//
  	// ApiAuth
	//
	// Events: 
	authService_connectionStateUpdated  : 'event:drupal-authService-connectionStateUpdated',
	authService_currentUserUpdated		: 'event:drupal-authService-currentUserUpdated',

});

/*Notification channel for asystem resource */
ApiAuthModules.service('ApiAuthChannel', ['$rootScope', 'ApiAuthServiceConfig',
                                 function ($rootScope,   ApiAuthServiceConfig) {	
	//
    //Authentication service
    // 
    
    // Publish sonnectionState updated event
    var publishConnectionStateUpdated = function (state) {
        $rootScope.$broadcast(ApiAuthServiceConfig.authService_connectionStateUpdated, {state: state});
    };
    // Subscribe to sonnectionStateUpdated event
    var onConnectionStateUpdated = function($scope, handler) {
    	$scope.$on(ApiAuthServiceConfig.authService_connectionStateUpdated, function(event, args) {
	    handler(args.state);
	   });	
    };
    
    // Publish currentUser updated event
    var publishCurrentUserUpdated = function (user) {
        $rootScope.$broadcast(ApiAuthServiceConfig.authService_currentUserUpdated, {user: user});
    };
    // Subscribe to currentUserUpdated event
    var onCurrentUserUpdated = function($scope, handler) {
    	$scope.$on(ApiAuthServiceConfig.authService_currentUserUpdated, function(event, args) {
	    handler(args.user);
	   });	
    };
    
 // public methods
 return {	   
	   //ConnectionStateUpdated event
	   publishConnectionStateUpdated 	: publishConnectionStateUpdated,
	   onConnectionStateUpdated 		: onConnectionStateUpdated,
	   //CurrentUserUpdated event
	   publishCurrentUserUpdated		: publishCurrentUserUpdated,
	   onCurrentUserUpdated				: onCurrentUserUpdated,
 	};
}]);


ApiAuthModules.run( ['$rootScope', 'UserResourceChannel', 'ApiAuthService', 'ApiAuthServiceConfig', '$http',
             function($rootScope,   UserResourceChannel,   ApiAuthService,   ApiAuthServiceConfig,   $http) {
			
		$http.defaults.withCredentials = true; //cookies
		
		//on login request confirmed store data and set new token in request headers
		var onUserLoginConfirmedHandler = function(data) { 
			ApiAuthService.storeTokenData(data.token);
			ApiAuthService.storeSessionData(data);
			ApiAuthService.setConnectionState(true);
			ApiAuthService.setCurrentUser(data.user);
		};
		UserResourceChannel.onUserLoginConfirmed($rootScope, onUserLoginConfirmedHandler);
		
		//on logout request confirmed delete data and remove token from request headers
		var onUserLogoutConfirmedHandler = function(data) {
			//@TODO check if this is needed
			ApiAuthService.deleteTokenData();
			ApiAuthService.deleteSessionData();
			ApiAuthService.setConnectionState(false);
			ApiAuthService.setCurrentUser(ApiAuthServiceConfig.anonymousUser);
			
			ApiAuthService.refreshConnection();
		};
		UserResourceChannel.onUserLogoutConfirmed($rootScope, onUserLogoutConfirmedHandler);		
}]);

/**
 * ApiAuthService
 * 
 * This service mirrors the Drupal system resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * your_api_endpoint/system/*|<mirror>|POST|Content-Type,Authorization|true
 * 
**/
ApiAuthModules.service('ApiAuthService', [ '$rootScope', 'drupalApiConfig', 'ApiAuthServiceConfig', 'ApiAuthChannel', 'SystemResource', 'UserResource', '$localstorage', 'ipCookie', '$http', '$q',
                                   function($rootScope,   drupalApiConfig,   ApiAuthServiceConfig,   ApiAuthChannel,   SystemResource,   UserResource,   $localstorage,   ipCookie,   $http,   $q) {
 		
		//needed to use the $on method in the notification channel
		//http://stackoverflow.com/questions/16477123/how-do-i-use-on-in-a-service-in-angular
		var scope = $rootScope.$new(); // or $new(true) if you want an isolate scope
		var userIsConected = false,
			currentUser	 = ApiAuthServiceConfig.anonymousUser,
			lastConnectTime  = 0,
			sessionCookieOptions = { 	domain 			: drupalApiConfig.drupal_instance,
										path			: '/',
										expires			: drupalApiConfig.session_expiration_time,
										expirationUnit 	: drupalApiConfig.session_expiration_unite,
								   };
		
		var storeTokenData = function(newToken) {
			newToken = (newToken)?newToken:false;
		
			if(newToken !== false) { 
				
				if( newToken != $localstorage.getItem('token', false) ) {
					$localstorage.setItem('token', newToken);
				}
			
				$http.defaults.headers.common.Authorization = newToken;
				$http.defaults.headers.common['X-CSRF-TOKEN'] = newToken;

			}
			else { $localstorage.removeItem('token'); }
			 
		};

		var deleteTokenData = function() {
				$localstorage.removeItem('token');

				$http.defaults.headers.common.Authorization = undefined;
				$http.defaults.headers.common['X-CSRF-TOKEN'] = undefined;
		};
		
		
		var getLastConnectTime = function() {
			return lastConnectTime;
		}
		
		var getCurrentUser = function() {
			return currentUser;
		}
		//
		var setCurrentUser = function(newUser) {
			if(currentUser != newUser) {
			 
	        	currentUser = newUser;
	      	    ApiAuthChannel.publishCurrentUserUpdated(newUser);
	        }
		};
		
		var getConnectionState = function() {
			return userIsConected;
		};
		//
		var setConnectionState = function(newState) {
	        if(newState != userIsConected) {
	          userIsConected = newState;
	      	  ApiAuthChannel.publishConnectionStateUpdated(userIsConected);
	        }
		};
		
		var refreshToken = function () {
			var defer = $q.defer();
			
			//if refreshTokenFromLocalStorage is not possible
			var localStorageToken = refreshTokenFromLocalStorage();
			if(!localStorageToken) {
			
				//refresh token from server
				refreshTokenFromServer().then(
					
					//refreshTokenFromServer success
					function(token) {
						 defer.resolve(token);
					},
					//refreshTokenFromServer error
					function() {
						defer.reject(false);
					}
				);
			} 
			//if refreshTokenFromLocalStorage was possible
			else { defer.resolve(localStorageToken); }
			
			return defer.promise;
		}
		
		//if token is stored in local storage set token value to http headers
		//this function is needed when launging app to check if user has token already 
		var refreshTokenFromLocalStorage = function () {
			//load token from local storage or flase
			var token = $localstorage.getItem('token', false);
			
			if (token) {
				storeTokenData(token);
				return token
			}
			
			return false;
		};
		
		//request a new token from server => api_endpoint/user/token
		var refreshTokenFromServer = function () {
			var defer = $q.defer();
			
			UserResource.token().then(
				//UserResource.token success
				function(token){
					 storeTokenData(token);
					 defer.resolve(token);
				},
				//UserResource.token error
				function(data) {
					defer.reject(false);
				}
			);

			return defer.promise;
		};
		
		var refreshConnection = function () {
			var defer = $q.defer();
			
			//check token
			refreshToken().then(
					//initToken success
					function(token) {	
						
						SystemResource.connect().then(
								//SystemResource.connect success
					            function (data) {
					            	
					              var user_id = data.user.uid;
					              
					              if (user_id == 0) { 
					            	  setConnectionState(false); 
					              }
					              else {  
					            	  setConnectionState(true);
					              }
					             
					              storeSessionData(data);
				            	  setCurrentUser(data.user);
					              
					              defer.resolve(data);
					            },
					            //SystemResource.connect error
					            function(data) {
					            	setConnectionState(false);
					            	defer.reject(data);
					            }
							);
					},
					//initToken error
					function() {
						defer.reject(data);
					}
			);
			
			//check cookies
			return defer.promise;
		};
		
		var storeSessionData = function (data) { 
			//store local storage data
			$localstorage.setItem('sessid', data.sessid);
			$localstorage.setItem('session_name', data.session_name);			
			//store session cookies
			ipCookie(data.session_name, data.sessid, sessionCookieOptions);
			//set headers
			$http.defaults.withCredentials = true;

		};
		
		var deleteSessionData = function () {
			//delete session cookies
			ipCookie.remove($localstorage.getItem('session_name'), sessionCookieOptions.path);
			//remove headers
			$http.defaults.withCredentials = false;
			//delete local storage data
			$localstorage.removeItem('sessid');
			$localstorage.removeItem('session_name');
		};
		
		//public methods
		return {
			storeTokenData 						: storeTokenData,
			deleteTokenData						: deleteTokenData,
			refreshToken						: refreshToken,
			
			storeSessionData 					: storeSessionData,
			deleteSessionData 					: deleteSessionData,
			
			getConnectionState 					: getConnectionState,
			setConnectionState					: setConnectionState,
			
			getCurrentUser 						: getCurrentUser,
			setCurrentUser 						: setCurrentUser,
			
			refreshConnection 					: refreshConnection,
			getLastConnectTime 					: getLastConnectTime,
			
		};
}]);

