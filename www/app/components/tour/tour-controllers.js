var tourControllers = angular.module('tour.controllers', [])

tourControllers.controller('TourCtrl', ['$scope', '$state', '$localstorage', '$ionicSlideBoxDelegate',
  function ($scope, $state, $localstorage, $ionicSlideBoxDelegate) {
    $scope.start = function () {
      $localstorage.setItem('firstVisit', 1);
      console.log('first visit set to true'); 
      $state.go('app.register');
    }
 
  $scope.data = {
    numViewableSlides : 0,
    slideIndex : 0,
    initialInstruction : true,
    secondInstruction : false,
    slides : [
    {
      'template' : 'app/components/tour/slides/firstSlide.html',
      'viewable' : true
    },
    
    {
      'template' : 'app/components/tour/slides/secondSlide.html',
      'viewable' : true
    },

    {
      'template' : 'app/components/tour/slides/thirdSlide.html',
      'viewable' : true
    },
    {
        'template' : 'app/components/tour/slides/fourthSlide.html',
        'viewable' : false
     },
  ]
  };
  
  var countSlides = function() {
    $scope.data.numViewableSlides = 0;
    angular.forEach($scope.data.slides, function(slide) {
      if(slide.viewable === true) $scope.data.numViewableSlides++;
    })
  }
  
  countSlides();
  
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  
  $scope.showBonus = function() {
    var index = '';
    angular.forEach($scope.data.slides, function(slide, i) {
    	if(slide.template == 'app/components/tour/slides/fourthSlide.html') {index = i; return;}	
    }, index);
    $scope.data.slides[index].viewable = true;
    countSlides();
    $scope.data.initialInstruction = false
    $scope.data.secondInstruction = true;

    $ionicSlideBoxDelegate.update();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.data.slideIndex = index;
  };
  
}]);
