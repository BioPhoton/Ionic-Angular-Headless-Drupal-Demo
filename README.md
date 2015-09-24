# Drupal-Ionic-AngularJS-API-Client
This repo is all about making clientside authed rest-calls easy to use.
(working version in branch 1.0.1)
# Features
## Show tour on first visit only
## Redirects for new and registered users
## Access control
## Authentication Service
## Drupal Services3 Resource-Services

#Workflow
- app lounge
- token (local storage or server)
- connect 
- start routing
???

#install
npm install cordova gulp ionic
##Dependencies
$ bower install ngCordova -save
$ bower install angular-cookie -save
$ bower install angular-messages -save

ipCookies

$ bower install https://github.com/BioPhoton/ng-drupal-7-services/tree/1.0.2 -save

##Plugins
$ cordova plugin add org.apache.cordova.network-information


##Drupal config

drupalIonicAngularJSAPIClient
	.config( function (  drupalApiConfig ) {
		drupalApiConfig.api_endpoint += 'v1/';
});

###account settings

###services
