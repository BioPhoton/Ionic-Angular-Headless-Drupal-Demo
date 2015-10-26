module.exports = {
  bundle: {
    main : {
    	scripts : [
    	    //commons
			"app/commons/directives.toggleByOwnUid.js",	
			"app/commons/validation/validation.setValidAfterTouch.js",	
			
			//services
			"app/components/articleFeed/articleFeed.service.js",	

			//controller
			"app/app.controller.js",	
			"app/components/tour/tour.controller.js",
			"app/components/register/register.controller.js",	
			"app/components/login/login.controller.js",	
			"app/components/profile/profile.controller.js",	
			"app/components/articleFeed/articleFeed.controller.js",
			"app/components/articleFeed/articleDetail/articleDetail.controller.js",

			//app
			"app/app.config.js",	
			"app/app.routes.js",
			"app/app.js"
    	   ]
    },
    vendor: {
      scripts: [
        //angular and modules
        'lib/angular/angular.js',
        'lib/angular-ui-router/release/angular-ui-router.js',
        'lib/angular-cookies/angular-cookies.js',
        'lib/angular-messages/angular-messages.js',
        
        //third party libs
        "lib/ngstorage/ngStorage.js",
      
       
        //ng-drupal-7-services
        "lib/ng-drupal-7-services/src/commons/directives/directives.toggleByAccessLevel.js",
        "lib/ng-drupal-7-services/src/commons/commons.drupalApiConfig.js",

        "lib/ng-drupal-7-services/src/commons/commons.helperService.js",
        "lib/ng-drupal-7-services/src/commons/commons.validationConstant.js",
        "lib/ng-drupal-7-services/src/commons/commons.baseChannel.js",
        "lib/ng-drupal-7-services/src/commons/commons.baseResource.js",


        "lib/ng-drupal-7-services/src/commons/http/http.configurations.js",
        "lib/ng-drupal-7-services/src/commons/http/http.requestAcceptIntercepter.js",

        "lib/ng-drupal-7-services/src/commons/authentication/authentication.httpIntercepter.js",
        "lib/ng-drupal-7-services/src/commons/authentication/authentication.channelConstant.js",
        "lib/ng-drupal-7-services/src/commons/authentication/authentication.channel.js",
        "lib/ng-drupal-7-services/src/commons/authentication/authentication.serviceConstant.js",
        "lib/ng-drupal-7-services/src/commons/authentication/authentication.service.js",
        "lib/ng-drupal-7-services/src/commons/authentication/authentication.bundle.js",
             
        "lib/ng-drupal-7-services/src/resources/system/system.resourceConstant.js",
        "lib/ng-drupal-7-services/src/resources/system/system.resource.js",
        "lib/ng-drupal-7-services/src/resources/system/system.channelConstant.js",
        "lib/ng-drupal-7-services/src/resources/system/system.channel.js",

        "lib/ng-drupal-7-services/src/resources/user/user.resourceConstant.js",
        "lib/ng-drupal-7-services/src/resources/user/user.resource.js",
        "lib/ng-drupal-7-services/src/resources/user/user.channelConstant.js",
        "lib/ng-drupal-7-services/src/resources/user/user.channel.js",
        "lib/ng-drupal-7-services/src/resources/user/user.bundle.js",

        "lib/ng-drupal-7-services/src/resources/node/node.resourceConstant.js",
        "lib/ng-drupal-7-services/src/resources/node/node.resource.js",
        "lib/ng-drupal-7-services/src/resources/node/node.channelConstant.js",
        "lib/ng-drupal-7-services/src/resources/node/node.channel.js",
        "lib/ng-drupal-7-services/src/resources/node/node.bundle.js",

        "lib/ng-drupal-7-services/src/resources/file/file.resourceConstant.js",
        "lib/ng-drupal-7-services/src/resources/file/file.resource.js",
        "lib/ng-drupal-7-services/src/resources/file/file.channelConstant.js",
        "lib/ng-drupal-7-services/src/resources/file/file.channel.js",
        "lib/ng-drupal-7-services/src/resources/file/file.bundle.js",

        "lib/ng-drupal-7-services/src/resources/views/views.resourceConstant.js",
        "lib/ng-drupal-7-services/src/resources/views/views.resource.js",
        "lib/ng-drupal-7-services/src/resources/views/views.channelConstant.js",
        "lib/ng-drupal-7-services/src/resources/views/views.channel.js",
        "lib/ng-drupal-7-services/src/resources/views/views.operatorsConstant.js",
        "lib/ng-drupal-7-services/src/resources/views/views.bundle.js"
        
        ]
    }
  }
};

