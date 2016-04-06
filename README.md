# Ionic Drupal 7 Services Example/Demo

####Demo of [Angular Drupal7 Services](https://github.com/BioPhoton/ng-drupal-7-services) in combination with the [Ionic SDK](https://github.com/driftyco/ionic)

This demo covers Authentication, CRUD operations on Nodes and Image upload from device camera.  


You can see a **[WEB DEMO](http://www.drupalionic.org/app_demo/)** of this repo  
or **DEMO-APP** over [Ionic View](http://view.ionic.io/) directly on your phone with this ID: **ccd889ce**.  


Also worth checking is this **DEMO:** [Drupal-API-Explorer](https://github.com/BioPhoton/ng-drupal-services-tests-with-ng). It covers every part of [Angular Drupal7 Services](https://github.com/BioPhoton/ng-drupal-7-services)

Following scenarios are covered:
- Detecting first visit ever and skip tour on second fisit
- Registration and redirect if already registered
- Authentication
- form client and server side validation with ngMessages
- Reauthentication on app start
- CRUD operations 
  - restrictions by user role 
- Image upload with camera plugin usage (or cordova plugin on chrome)
- Handle route access over access levels
- Directives for:
  - Validation
  - UI-Interaction over user data

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
  $ git checkout master
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
- Setup drupal with  services as described in [Angular Drupal7 Services - Setup Drupal](https://github.com/BioPhoton/ng-drupal-7-services#setup-for-drupal)
- Import the [article-feed view settings](https://github.com/BioPhoton/Ionic-Angular-Headless-Drupal-Demo/blob/dev/drupal/article_view_export.txt)
- Import the [permissions settings](https://github.com/BioPhoton/Ionic-Angular-Headless-Drupal-Demo/blob/dev/drupal/permissions_export.txt) with the [Export Roles & Permissions](https://www.drupal.org/project/export_roles_permissions) module
  In your Configuration -> People -> Permissions section enable following for authenticated users:
  - Node Article: create
  - Node Article: edit
  - Node Article: delete
  - Services: Save file information
  - Services: Perform unlimited index queries
- For a direct login after a user registers over the register form we need to  
  enable this in under Configuration -> People -> Account settings section.   Go there and leaf the "Require e-mail validation checkbox" unchecked.
- To enable User Profile Pictures go to Configuration > People > Account settings and enable user pictures in the personalization settings. see also [here](- https://www.drupal.org/node/22271)
- To receive the images of your node install the [imageinfo_cache](https://www.drupal.org/project/imageinfo_cache) module. This will create your imagestyles immediately after uploading an image to drupal.
