# Drupal-Ionic-AngularJS-API-Client
This repo is all about making clientside authed rest-calls easy to use.

#Setup Client

##System requirements
Cordova CLI: 5.3.3
Gulp version:  CLI version 3.8.11
Gulp local:   Local version 3.9.0
Ionic Version: 1.1.0
Ionic CLI Version: 1.6.4
Ionic App Lib Version: 0.3.8
OS: Windows 7 SP1
Node Version: v0.12.6

##Browser
$ npm install
$ bower update
$ ionic setup sass
$ ionic serve

##Phone
$ cordova platform add android
$ cordova platform add ios

###Cordova Plugins
$ cordova plugin add org.apache.cordova.camera


##Run app on device
$ ionic run android --device -l-c


#Setup Drupal

- In you permissions section enable create edit and delete for authenticated users


##Modules
- https://www.drupal.org/project/imageinfo_cache
- https://www.drupal.org/node/22271
- For a direct login after a user registers over the register form we need to enable this in the admins  Configuration -> People -> Account settings section.






