;
(function () {
  'use strict';

  angular.module('drupalionicDemo.routes', ['ngStorage',
    'drupalionicDemo.app.controller',
    'drupalionicDemo.tour.controller',
    'drupalionicDemo.register.controller',
    'drupalionicDemo.login.controller',
    'drupalionicDemo.profile.controller',
    'drupalionicDemo.articleFeed.controller',
    'drupalionicDemo.articleFeed.articleDetail.controller',
    'drupalionicDemo.articleFeed.service'])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$stateProvider', '$urlRouterProvider', '$localStorageProvider', 'AuthenticationServiceConstant'];

  /** @ngInject */
  function configFunction($stateProvider, $urlRouterProvider, $localStorageProvider, AuthenticationServiceConstant) {

    // http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
    // Prevent $urlRouter from automatically intercepting URL changes;
    // this allows you to configure custom behavior in between location changes and route synchronization
    //
    //We use this in the in the modules .run function
    $urlRouterProvider.deferIntercept();

    //routing configurations

    //set default URL
    if (!$localStorageProvider.get('isRegistered')) {
      $urlRouterProvider.otherwise('app/register');
    }
    else {
      $urlRouterProvider.otherwise('app/login');
    }


    //set states
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app/app.view.html",
        controller: 'AppController as app'
      })

      .state('app.tour', {
        url: '/tour',
        views: {
          'menuContent': {
            templateUrl: 'app/components/tour/tour.view.html',
            controller: 'TourController as tour'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'app/components/login/login.view.html',
            controller: 'LoginController as login'
          }
        }
      })

      .state('app.register', {
        url: '/register',
        views: {
          'menuContent': {
            templateUrl: 'app/components/register/register.view.html',
            controller: 'RegisterController as register'
          }
        }
      })

      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'app/components/profile/profile.view.html',
            controller: 'ProfileController as profile'
          }
        },
        data: {
          'access': AuthenticationServiceConstant.accessLevels.user
        }
      })

      .state('app.articleFeed', {
        url: '/article-feed',
        views: {
          'menuContent': {
            templateUrl: 'app/components/articleFeed/articleFeed.view.html',
            controller: 'ArticleFeedController as articleFeed'
          }
        },
        resolve: {
          actualArticles: function (ArticleFeedService, $rootScope) {
            $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading initial articles...</p>"}});
            return ArticleFeedService.getAll().finally(function () {
              $rootScope.$broadcast('loading:hide');
            });
          }
        }
      })

      .state('app.articleDetail', {
        url: '/article-feed/:nid?title',
        views: {
          'menuContent': {
            templateUrl: 'app/components/articleFeed/articleDetail/articleDetail.view.html',
            controller: 'ArticleDetailController as articleDetail'
          }
        },
        resolve: {
          articleDetail: function (ArticleFeedService, $stateParams) {
            return ArticleFeedService.get({nid: $stateParams.nid});
          }
        }
      })

    ;

  };

  runFunction.$inject = ['$rootScope', 'AuthenticationService', '$state', '$localStorage', 'DrupalApiConstant', '$urlRouter', '$ionicLoading'];


  /** @ngInject */
  function runFunction($rootScope, AuthenticationService, $state, $localStorage, DrupalApiConstant, $urlRouter, $ionicLoading) {

    $rootScope.$on('loading:show', loadingShowCallback);

    $rootScope.$on('loading:hide', loadingHideCallback);

    //http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
    //location change logic => before any view is rendered
    $rootScope.$on('$locationChangeStart', locationChangeStartCallback)

    //state change logic
    $rootScope.$on("$stateChangeStart", stateChangeStartCallback);

    ////////////

    // show ionicLoading overlay with args of event
    function loadingShowCallback(event, args) {
      $ionicLoading.show((args && 'loading_settings' in args) ? args.loading_settings : {});
    }

    // hide ionicLoading overlay
    function loadingHideCallback(event, args) {
      $ionicLoading.hide()
    }

    //we need this to have out current auth state before any other thing in router happens
    function locationChangeStartCallback(e) {


      if (AuthenticationService.getLastConnectTime() > 0) {
        //sync the current URL to the router

        $urlRouter.sync();
        return;
      }

      // Prevent $urlRouter's default handler from firing
      e.preventDefault();
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connect with System...</p>"}});
      // init or refresh Authentication service connection
      AuthenticationService
        .refreshConnection()
        .then(
        function (success) {
          $rootScope.$broadcast('loading:hide');

          //sync the current URL to the router
          $urlRouter.sync();
        }
      )
        .catch(
        function (error) {

          $rootScope.$broadcast('loading:hide');
          //sync the current URL to the router
          $urlRouter.sync();
        }
      );

      // Configures $urlRouter's listener *after* your custom listener
      //$urlRouter.listen();
    };

    function stateChangeStartCallback(event, toState, toParams, fromState, fromParams) {


      // if its the users first visit to the app show the apps tour
      if (toState.name !== 'app.tour') {

        if (!$localStorage.firstVisit) {
          event.preventDefault();
          $state.go('app.tour');
          return;
        }

      }

      //redirects for logged in user away from login or register and show its profile instead
      if (toState.name == 'app.login' || toState.name == 'app.register') {
        if (AuthenticationService.getConnectionState()) {
          event.preventDefault();
          $state.go('app.profile');
          return;
        }
      }

      //redirect if user is unauthorized
      if (('data' in toState) && ('access' in toState.data) && !AuthenticationService.isAuthorized(toState.data.access)) {
        event.preventDefault();
        if ($localStorage.isRegistered) {
          $state.go('app.login');
        } else {
          $state.go('app.register');
        }

        return;
      }
    }

  }


})();
