/* Drupals api depending services*/
//______________________________________________
var accessControl = angular.module('common.accesss-control', ['ngCookies']);

/**
 * AccessControlService
 * 
 */
accessControl.service('AccessControlService', function($rootScope, $http, $q, drupalApiServiceConfig) {
	
	var authorize = function(accessLevel, role) {
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
	};
	
	return {
		authorize : authorize,
	}
	
});

accessControl.directive('accessLevel', ['AccessControlService', function(Auth) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var prevDisp = element.css('display')
                , userRole
                , accessLevel;
            $scope.user = Auth.user;
            $scope.$watch('user', function(user) {
                if(user.role)
                    userRole = user.role;
                updateCSS();
            }, true);

            attrs.$observe('accessLevel', function(al) {
                if(al) accessLevel = $scope.$eval(al);
                updateCSS();
            });

            function updateCSS() {
                if(userRole && accessLevel) {
                    if(!AccessControlService.authorize(accessLevel, userRole))
                        element.css('display', 'none');
                    else
                        element.css('display', prevDisp);
                }
            }
        }
    };
}]);