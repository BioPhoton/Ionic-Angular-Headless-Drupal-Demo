/**
 * AccessControlModule
 * 
 */
var accessControlModule = angular.module('common.accesss-control', ['ApiAuthModules']);

/**
 * AccessControlConfig
 * 
 */
accessControlModule.constant("accessControlConfig", {
	   		roles :[
               'anonymous user',
               'authenticated user',
               'administrator'],

           accessLevels : {
               'public' : "*",
               'anon': ['anonymous user'],
               'user' : ['authenticated user'],
               'admin': ['administrator']
           },      
});

/**
 * AccessControlService
 * 
 */
accessControlModule.service('AccessControlService', function($rootScope, $http, $q, ApiAuthService) {
	
	var authorize = function(accessLevel, roles) {
		 //if no user is given set unauthorized user
		 currentUser = ApiAuthService.getCurrentUser();
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

accessControlModule.directive('accessLevel', ['AccessControlService', 'ApiAuthChannel', 'ApiAuthService', 
                                function(AccessControlService,   ApiAuthChannel,   ApiAuthService) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
        	
        	$scope.user = ApiAuthService.getCurrentUser();
        	var prevDisp = element.css('display')
                , userRoles = $scope.user.roles 
                , accessLevel;

                ApiAuthChannel.onCurrentUserUpdated($scope, function (user){
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
