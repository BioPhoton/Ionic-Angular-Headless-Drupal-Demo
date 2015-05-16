# Drupal-Ionic-AngularJS-API-Client
Headless / Decoupled Drupal with AngularJs and the Ionic Framework / SDK

This repo shows usecases of the [ng-drupal7-services](http://google.com) [www.wwewe (sf)] module

# Demo
http://www.drupalionic.org/app_demo/www/index.html

# Features
## Show tour on first visit only
## Redirect and auto login of new and registered users
## Access control for ui-router and elements
## Authentication Service
## Drupal Services3 Resource-Services demos

#install
npm install cordova gulp ionic
##Dependencies
$ bower install ngCordova -save
$ bower install angular-cookie -save
$ bower install angular-messages -save
ipCookies
##Plugins
$ cordova plugin add org.apache.cordova.network-information


##Drupal
#Modules
install services 3
services views

#Config export for services module

#account settungs
uncheck require email confirm


ApiClient config
```
drupalIonicAngularJSAPIClient
	.config( function (  drupalApiConfig ) {
		drupalApiConfig.api_endpoint += 'v1/';
});
```

##Debugging

Projectname => Ensure this value has maximum 32 characters
