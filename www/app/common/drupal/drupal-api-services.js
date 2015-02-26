/**
 *  Drupals api depending services
 * 
 * CORS settings on server:
 * api/v3/*|<mirror>|POST|Content-Type,Authorization,X-CSRF-TOKEN|true
 * services/session/token|<mirror>|POST, GET|Content-Type,Authorization,X-CSRF-TOKEN|true
 * 
 */
//______________________________________________
var drupalApiServices = angular.module('common.drupal.drupalApiServices', ['ngCookies']);


/*https://github.com/fnakstad/angular-client-side-auth/blob/master/client/js/routingConfig.js*/

drupalApiServices.factory('AuthenticationService', ['$rootScope', '$cookieStore', '$localstorage', '$http', '$q', 'DrupalAPISettings',
  function ($rootScope, $cookieStore, $localstorage, $http, $q, DrupalAPISettings, ACLService) {

    var token = $localstorage.getItem('token') || '';

    if (token) {
      $http.defaults.headers.common.Authorization = token;
      $http.defaults.headers.post['X-CSRF-TOKEN'] = token;
    }

    var storeAuthData = function (data, password) {
      $localstorage.setItem('hasLoggedIn', 1);
      $localstorage.setItem('uid', data.user.uid);
      $localstorage.setObject('user', data.user);
      $localstorage.setItem('username', data.user.name);
      $localstorage.setItem('password', password);
      $localstorage.setItem('token', data.token);
      $localstorage.setItem('sessid', data.sessid);
      $localstorage.setItem('session_name', data.session_name);

      $cookieStore.put(data.session_name, data.sessid);

      $rootScope.isAuthed = true;
    };

    var deleteAuthData = function (data, password) {
      //delete token
      delete $http.defaults.headers.common.Authorization;
      //delete cookies data
      $cookieStore.remove($localstorage.getItem('session_name'));
      //delete local storage data
      $localstorage.removeItem('uid');
      $localstorage.removeObject('user');
      $localstorage.removeItem('username');
      $localstorage.removeItem('password');
      $localstorage.removeItem('token');
      $localstorage.removeItem('sessid');
      $localstorage.removeItem('session_name');

      $rootScope.isAuthed = false;
    };
    
    var service = {
     //	
	 authorize: function(accessLevel, role) {
		 //if no user is given set unauthorized user
		 currentUser = $localstorage.getObject('user', { uid: 0, roles: {1: "anonymous user"}});
		 //
	     if(role === undefined) {
			role = currentUser.roles[1]; 
         }
	    
	     //
	     if(accessLevel == '*') { return true;}
	     
	     var isGranted = false;
		 for (var i = 0; i < accessLevel.length; i++) {
			 for (var prop in currentUser.roles) {
				if(accessLevel[i] == currentUser.roles[prop]) {
					 accessLevel, role
					 isGranted = true;
				}
			 }
	     }
         return isGranted;
	  },
	    
      viewtest: function () {
        var defer = $q.defer(),
                pathToTestView = DrupalAPISettings.drupal_instance + 'bettracks_app/v3/views_datasource/trackers';

        this.token().then(
                function (newToken) {
                  //token success
                  $http({
                    url: pathToTestView,
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": newToken,
                    }
                  })
                          //testView success
                          .success(function (data) {
                            defer.resolve(data);
                          })
                          //token error
                          .error(function (data) {
                            defer.reject(data);
                          });
                },
                //token error
                        function () {
                          defer.reject(data);
                        }
                );

                return defer.promise;
              },
      /*
       * getNode
       *
       * Retrieves a node.
       *
       * Method: GET
       * Url: http://drupal_instance/api_endpoint/node/{NID}
       * Headers: Content-Type:application/json
       *
       * @param {Integer} nid The nid of the node to retrieve., required:true, source:path
       *
       * @return {Promise}
       *
       * useage: ViewsResource.retrieve().success(yourSuccessCallback).error(yourErrorCallback);
       */
      getNode: function (nid) {

        var pathToNode = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.node + nid,
                defer = $q.defer();
        $http({
          method: 'GET',
          url: pathToNode,
          headers: {
            "Content-Type": "application/json",
          }
        })
                .success(function (data, status, headers, config) {
                  defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                  defer.reject(data);
                });

        return defer.promise;
      },
      /*
       * token
       * 
       * Returns the CSRF token.
       * Method: POST
       * Url: http://drupal_instance/api_endpoint/user/token
       * Headers: Content-Type:application/json
       * 
       * @return 	{Promise}
       * 
       * useage: UserResource.token().then(yourSuccessCallback,yourErrorCallback);
       */
      token: function () {
        var defer = $q.defer(),
                pathToToken = DrupalAPISettings.drupal_instance + DrupalAPISettings.resources.token;

        $http({
          url: pathToToken,
          method: 'GET',
          withCredentials: true
        })
                .success(function (data) {
                  $localstorage.setItem('token', data);
                  $http.defaults.headers.common.Authorization = data;
                  $http.defaults.headers.post['X-CSRF-TOKEN'] = data;
                  defer.resolve(data);
                })
                .error(function (data) {
                  defer.reject(data);
                });

        return defer.promise;
      },
      /*
       * connect
       * 
       * Returns the details of currently logged in user.
       * 
       * Method: POST 
       * Url: http://drupal_instance/api_endpoint/system/connect
       * Headers: Content-Type:application/json
       * 
       * @return 	{Promise}
       * 
       * useage: SystemResource.connect().success(yourSuccessCallback).error(yourErrorCallback);
       */
      connect: function () {
        var defer = $q.defer(),
                pathToConnect = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.system_connect;
        this.token();
        $http({
          method: 'POST',
          url: pathToConnect,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
                .success(function (data, status, headers, config) {
                	//@TODO Move this line into event handler or so 
                	$localstorage.setObject('user', data.user);
                	defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                  defer.reject(data);
                });

        return defer.promise;
      },
      /*
       * */
      updataLoginstate : function () {
          var defer = $q.defer();
          
          this.connect().then(
                  function (data) {
                    var user_id = data.user.uid;
                    if (user_id == 0) {
                      $rootScope.isAuthed = false;
                      defer.reject(false);
                    }
                    else {
                    	 defer.reject(true);
                    	 $rootScope.isAuthed = true;
                    }

          });
          
		  return defer.promise;
		},
      
      /*
       * register
       *
       * Register a user
       * Method: POST
       * Url: http://drupal_instance/api_endpoint/user/register
       * Headers: Content-Type:application/json
       *
       * @param {Array} account The user object, required:true, source:post body
       * account = { username: 'your username', mail : 'your email', pass : 'xxxxx'}
       *
       * @return {Promise}
       *
       * useage: UserResource.login(account).then(yourSuccessCallback,yourErrorCallback);
       */
      register: function (account) {
        var defer = $q.defer(),
                pathToRegister = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.user_register;

        $http({
          method: 'POST',
          url: pathToRegister,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            name: account.username,
            pass: account.password,
            mail: account.email
          },
        })
                .success(function (data, status, headers, config) {
                  $rootScope.$broadcast('event:auth-registerConfirmed', data);
                  defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                  $rootScope.$broadcast('event:auth-register-failed', status);
                  defer.reject(data);
                });

        return defer.promise;
      },
      /*
       * login
       * 
       * Login a user for a new session
       * Method: POST
       * Url: http://drupal_instance/api_endpoint/user/login
       * Headers: Content-Type:application/json
       * 
       * @param 	{String} username A valid username, required:true, source:post body
       * @param 	{String} password A valid password, required:true, source:post body
       * 
       * @return 	{Promise}
       * 
       * useage: UserResource.login(username, password).then(yourSuccessCallback,yourErrorCallback);
       */
      login: function (username, password) {
        var defer = $q.defer(),
                pathToLogin = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.user_login;

        $http({
          method: 'POST',
          url: pathToLogin,
          data: {
            username: username,
            password: password,
          },
        })
                .success(function (data, status, headers, config) {

                  $http.defaults.headers.common.Authorization = data.token;
                  $http.defaults.headers.post['X-CSRF-TOKEN'] = data.token;
                  $http.defaults.withCredentials = true;
                  storeAuthData(data);
                  
                  $rootScope.$broadcast('event:auth-loginConfirmed', {user: data.user});
                  defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                  
                  var error = "Login failed.";
                  if (status == 401) {
                    error = "Invalid Username or Password.";
                  } else if (status == 404) {
                    error = "Backend is not configured properly";
                  }
                  $rootScope.$broadcast('event:auth-login-failed', status);
                  defer.reject(data);
                });
        return defer.promise;
      },
      /*
       * logout
       * 
       * Logout a user session
       * Method: POST
       * Url: http://drupal_instance/api_endpoint/user/logout
       * Headers: Content-Type:application/json
       * 
       * @return 	{Promise}
       * 
       * useage: UserResource.logout(username, password).then(yourSuccessCallback,yourErrorCallback);
       */
      logout: function () {
        var defer = $q.defer(),
                pathToLogout = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.user_logout;

        $http({
          method: 'POST',
          withCredentials: true,
          url: pathToLogout,
        })
                .success(function (data, status, headers, config) {
                  deleteAuthData();
                  $rootScope.$broadcast('event:auth-logout-complete');
                  defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                  defer.reject(data);
                  $rootScope.$broadcast('event:auth-logout-failed');
                })
        return defer.promise;
      },
    };
    return service;
  }]);