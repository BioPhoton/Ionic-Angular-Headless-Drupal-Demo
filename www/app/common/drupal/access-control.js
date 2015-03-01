/* Drupals api depending services*/
//______________________________________________
var accessControl = angular.module('common.accesss-control', ['common.drupal.api-services']);

/**
 * AccessControlService
 * 
 */
accessControl.service('AccessControlService', function($rootScope, $http, $q, drupalApiServiceConfig, DrupalAuthenticationService) {
	
	var authorize = function(accessLevel, roles) {
		 //if no user is given set unauthorized user
		 currentUser = DrupalAuthenticationService.getCurrentUser();
		 //
	     if(roles === undefined) {
			roles = currentUser.roles; 
         }
	    
	     //
	     if(accessLevel == '*') { return true;}
	     
	     var isGranted = false;
		 for (var i = 0; i < accessLevel.length; i++) {
			 for (var prop in roles) {
				if(accessLevel[i] == currentUser.roles[prop]) {
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

accessControl.directive('accessLevel', ['AccessControlService', 'drupalApiNotificationChannel', 'DrupalAuthenticationService', 
                                function(AccessControlService,   drupalApiNotificationChannel,   DrupalAuthenticationService) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
        	
        	$scope.user = DrupalAuthenticationService.getCurrentUser();
        	var prevDisp = element.css('display')
                , userRoles = $scope.user.roles 
                , accessLevel;

            drupalApiNotificationChannel.onCurrentUserUpdated($scope, function (user){
            	console.log('onCurrentUserUpdated accessLevel');
            	$scope.user = user;
                userRoles = $scope.user.roles;
                updateCSS();
            });

            attrs.$observe('accessLevel', function(al) {
            	   var parsed = [];
                if(al) 
                {
                	accessLevel = $scope.$eval(al);
            	}
                updateCSS();
            });

            function updateCSS() {
            	
            
            	
                if(userRoles && accessLevel) {
                    if(!AccessControlService.authorize(accessLevel))
                        element.css('display', 'none');
                    else
                        element.css('display', prevDisp);
                }
            }
        }
    };
}]);