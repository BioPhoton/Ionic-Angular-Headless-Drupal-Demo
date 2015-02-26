angular.module('drupalIonicAngularJSAPIClient.configuration', [])
        .constant('DrupalAPISettings', {
        	
          drupal_instance: 'https://www---ionic-e7ch2k53a4qd6.eu.platform.sh/',
          api: 'bettracks_app/v3/',
          resources: {
            node: 'node/',
            node_retrieve : 'node/',
            node_index : 'node?',
            system_connect: 'system/connect',
            token: 'services/session/token',
            user_login: 'user/login',
            user_logout: 'user/logout',
            user_register: 'user/register',
            view_retrieve: 'views_datasource/',
          },
          formats: {
            json: '.json',
            xml: '.xml'
          },
          
           roles :[
               'anonymous user',
               'authenticated user',
               'administrator'],

           accessLevels : {
               'public' : "*",
               'anon': ['anonymous user'],
               'user' : ['authenticated user', 'administrator'],
               'admin': ['admin']
           },      
          
          terms_and_conditions_nid: 68,
        });

        