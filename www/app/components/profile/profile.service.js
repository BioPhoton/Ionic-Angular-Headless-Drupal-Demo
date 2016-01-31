;
(function () {

  angular
    .module('drupalionicDemo.profile.service', [])
    .factory('ProfileService', ProfileService);

  ProfileService.inject = ['$q', '$filter', '$rootScope', 'DrupalApiConstant', 'DrupalHelperService', 'UserResource', 'AuthenticationService', 'AuthenticationChannel']

  function ProfileService($q, $filter, $rootScope, DrupalApiConstant, DrupalHelperService, UserResource, AuthenticationService, AuthenticationChannel) {

    var profile = false,
      scope = $rootScope.$new();

    AuthenticationChannel.subCurrentUserUpdated(scope, saveProfileData);

    //profile service object
    var profileService = {
      getProfile: getProfile
    };

    return profileService;

    /////////////////////////////////////////////////////////////


    function getProfile() {

      var defer = $q.defer();

      //return profile form cache
      if (angular.isObject(profile) && typeof Object.keys(profile)[0] !== 'undefined') {
        return $q.resolve(profile);
      }

      var currentUser = AuthenticationService.getCurrentUser();

      if (currentUser.uid != 0) {

        UserResource
          .retrieve({uid: currentUser.uid})
          .success(function (data) {
            saveProfileData(data);
            defer.resolve(profile);
          })
          .catch(function (error) {
            defer.reject(error);
          });

      }

      return defer.promise;
    }


    function saveProfileData(newProfile) {
      var preparedProfile = newProfile;
      preparedProfile.pictureUrl = (preparedProfile.picture) ? DrupalHelperService.getDrupalPath() + 'sites/default/files/pictures/' + preparedProfile.picture.filename : false;
      profile = preparedProfile;
    }


  }


})();
