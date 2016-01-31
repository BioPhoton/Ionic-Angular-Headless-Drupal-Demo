# Angular Drupal7 Services Ionic Demo

####Deom of [Angular Drupal7 Services](https://github.com/BioPhoton/ng-drupal-7-services) Services in combination with the [Ionic SDK](https://github.com/driftyco/ionic)

This demo covers Authentication, CRUD operations on Nodes and Image upload from device camera.
You can see a live demo of this repo here or over Ionic View directli on your phone with this id **ccd889ce**.  
Also worth checking [Drupal-API-Explorer](https://github.com/BioPhoton/ng-drupal-services-tests-with-ng) which covers every part of [Angular Drupal7 Services](https://github.com/BioPhoton/ng-drupal-7-services)

Following scenarios are covered:
- Detecting first visit ever and skip tour on second fisit
- Registration
- Authentication
- Reauthentication on app start
- CRUD operations
- Image upload with camera plugin usage
- Handle route access 
- Using helper directives 

##Setup
For general information visit the official [ionic guide](http://ionicframework.com/docs/guide/).

###Setup environment 

- nodeJs
It's required to have node installed. If you don't have you will find it [here](https://nodejs.org/en/download/).
Download and install the version for your OS.

- ionic
To use the ionic-CLI and run cordova commands install ionic and cordova globaly over nmp.
You also need to install bower to load the required libs. Paste following command to you console to install all three with a single line.
```bash
$ npm install -g ionic cordova bower
```
###Setup project for desktop development

1. Check out the project
  ```bash
  $ git clone https://github.com/BioPhoton/Ionic-Angular-Headless-Drupal-Demo.git [project name]
  ```
  Check that the current user have write permissions to the newly created folder.
  Then cd into the folder and check out the dev branch
  ```bash
  $ cd [project_name]  
  $ git checkout dev
  ```

2. Setup node_modules  
  In the ckecked out branch there is a package.json file   
  which contains all required node modules required for the gulp tasks as well   as the platforms and plugins of cordova  
  ```bash
  $ npm install
  ```
3. Load bower lib's  
  As all the thrid party libs are not in the repository we have to load them over bower  
  ```bash
  $ bower update  
  ```
  Now you are ready to test it on desktop. Run following command:  
  ```bash
  $ ionic serve  
  ```
  
###Setup project for mobile development

To build your project for platforms or debugging over console setup codrova platforms and plugins.
These are defined in the package.json file
```bash
$ ionic state restore  
$ ionic resources
```
This will create the platforms folder and loads codrova android and ios platform.
It also creates the plugins folder and loads the plugins defined in package.json

To run the project on your mobile phone do following
```bash
$ ionic run android --device
```

or

```bash
$ ionic run ios --device
```

###View remote

To easily share project progress we use [ionic view](http://view.ionic.io/) view to accomplish this.
You can view it over the ionic app_id located in ionic.project in the root folder.  
app ID: **ccd889ce**


###Cordova Plugins

Following extra cordova libraries are installed:
```bash
$ cordova plugin add org.apache.cordova.camera --save
```

#Setup Drupal
- In you permissions section enable create edit and delete nodes for authenticated users
- For a direct login after a user registers over the register form we need to  
  enable this in under Configuration -> People -> Account settings section.   Go there and leaf the "Require e-mail validation checkbox" unchecked.
- To enable User Profile Pictures go to Configuration > People > Account settings and enable user pictures in the personalization settings. see also [here](- https://www.drupal.org/node/22271)
- To receive the images of your node install the [imageinfo_cache](https://www.drupal.org/project/imageinfo_cache) module. This will create your imagestyles immediately after uploading an image to drupal.
