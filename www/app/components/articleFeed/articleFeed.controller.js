;
(function () {

  angular.module('drupalionicDemo.articleFeed.controller', ['commons.directives.toggleByOwnUid', 'drupalionicDemo.articleFeed.service'])
    .controller('ArticleFeedController', ArticleFeedController);

  ArticleFeedController.$inject = ['$q', '$scope', '$state', '$filter', '$ionicListDelegate', '$ionicModal', 'DrupalHelperService', 'ArticleFeedService', 'AuthenticationService', 'actualArticles']

  function ArticleFeedController($q, $scope, $state, $filter, $ionicListDelegate, $ionicModal, DrupalHelperService, ArticleFeedService, AuthenticationService, actualArticles) {

    var vm = this;

    //vars

    vm.deleteVisible = false;

    vm.loadingDetail = false;
    vm.articles = actualArticles;
    //functions
    vm.doRefresh = doRefresh;
    vm.loadMore = loadMore;
    vm.openDetail = openDetail;

    //hide loading spinner on route change
    $scope.$on("$stateChangeSuccess", function () {
      vm.loadingDetail = false;
    });

    ///////////////////////////////

    /* List view */

    function doRefresh() {
      ArticleFeedService.loadRecent().then(
        function (allNodes) {
          vm.articles = allNodes;
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        },
        function (data) {
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function loadMore() {
      ArticleFeedService.loadMore().then(
        function (allNodes) {
          vm.articles = allNodes;
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },
        function (data) {
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    function openDetail(articleToOpen) {
      vm.loadingDetail = articleToOpen.nid;

      $state.go('app.articleDetail', {
        nid: articleToOpen.nid,
        title: articleToOpen.title
      });
    };

    /*Create Modal*/
    vm.deletingArticle = false;
    vm.saveingArticle = false;
    vm.openCreateModal = openCreateModal;
    vm.closeCreateModal = closeCreateModal;
    vm.takeImage = takeImage,
      vm.saveArtilce = saveArtilce;
    vm.deleteArticle = deleteArticle;

    //new node
    vm.newImage = {};
    vm.newArticle = {};

    // init the createModal
    $ionicModal.fromTemplateUrl('app/components/articleFeed/templates/create.modal.html',
      function (modal) {
        vm.createModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      }
    );

    //
    function takeImage(options) {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      ionic.Platform.ready(function () {

        navigator.camera.getPicture(
          function (result) {
            vm.newArticle.field_image.base64 = result;
            $scope.$apply();
          },
          function (err) {
          },
          options
        );

      });

    }

    // Open our new task modal
    function openCreateModal(article, linstIndex) {
      vm.newArticle = {};
      vm.articleModalMode = 'create';

      //setup drupal field structure
      vm.newArticle = angular.extend(vm.newArticle, {
          type: 'article',
          title: 'Title...',
          body: DrupalHelperService.structureField({'value': 'full', 'summary': 'summ'}),
          field_image: {base64: false}
        }
      );

      vm.createModal.show();
    };

    // Close the new task modal
    function closeCreateModal() {
      vm.createModal.hide();
    };

    function saveArtilce(article) {

      vm.savingArticle = true;
      ArticleFeedService
        .saveArtilce(article)
        .then(
        function (data) {
          vm.doRefresh();
        }
      )
        .finally(
        function (findata) {

          //update view
          vm.newArticle.field_image.base64 = false;
          vm.createModal.hide();
          vm.savingArticle = false;
        }
      );

    }

    function deleteArticle(article, linstIndex) {

      vm.deletingArticle = article.nid;
      ArticleFeedService
        .deleteArticle(article)
        .then(
        function (data) {
          vm.articles.splice(linstIndex, 1)
        }
      )
        .finally(function () {
          vm.deletingArticle = false;
        });

    }
  }

})();
