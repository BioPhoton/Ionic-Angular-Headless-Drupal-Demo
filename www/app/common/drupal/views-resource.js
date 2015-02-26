var drupalResources = angular.module('common.drupal.views-resources', []);

/**
 * NodeResource
 * 
 * This service mirrors the Drupal node resource of the services 3.x module.
 * To use this you have to set following line in your Drupal CORS module settings
 * @TODO check
 * your_api_endpoint/node/*|<mirror>|POST|Content-Type
 * 
 **/
drupalResources.factory('ViewResource', function ($http, $q, DrupalAPISettings) {


  /*
   * 
   * Retrieve
   * 
   * Drupal CORS settings: 
   * "api_endpoint/node/*|<mirror>|GET|Content-Type"
   *  Note: . 
   * 
   * Retrieves a views datasource json.
   * 
   * Method: GET 
   * Url: http://drupal_instance/api_endpoint/views_datasource/view_path
   * Headers: Content-Type:application/json
   * 
   * @param {string} view_apth the path of the view
   * 
   * @return 	{Promise}
   * 
   * useage: ViewResource.retrieve().success(yourSuccessCallback).error(yourErrorCallback);
   */
  var retrieve = function (view_path) {
    var retrievePath = DrupalAPISettings.drupal_instance + DrupalAPISettings.api + DrupalAPISettings.resources.view_retrieve + view_path;
    var defer = $q.defer(),
            requestConfig = {
              method: 'GET',
              withCredentials: true,
              url: retrievePath,
            };

    if (!view_path) {
      defer.reject(['Param view path is required.']);
    }
    else {
      $http(requestConfig)
              .success(function (data, status, headers, config) {
                defer.resolve(data);
              })
              .error(function (data, status, headers, config) {
                defer.reject(data);
              });
    }
    return defer.promise;

  };


  //public methods	
  return {
    retrieve: retrieve,
  };

});
