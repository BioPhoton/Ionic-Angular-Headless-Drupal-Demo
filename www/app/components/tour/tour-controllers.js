var tourControllers = angular.module('tour.controllers', [])

tourControllers.controller('TourCtrl', ['$rootScope', '$scope', '$state', '$localstorage', '$ionicSlideBoxDelegate',
                               function ($rootScope,   $scope,   $state,   $localstorage,   $ionicSlideBoxDelegate) {
    $scope.start = function () {
    	
      $localstorage.setItem('firstVisit', true);
      $rootScope.firstVisit = true;
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
	    
	   
	  ]
  };
  
  var countSlides = function() {
    $scope.data.numViewableSlides = 0;
    angular.forEach($scope.data.slides, function(slide) {
      if(slide.viewable === true) $scope.data.numViewableSlides++;
    })
  }
  
  countSlides();
  
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  
  $scope.showBonus = function() {
	$scope.data.slides.push({
		        'template' : 'app/components/tour/slides/fourthSlide.html',
		        'viewable' : true
	});
    $ionicSlideBoxDelegate.update();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.data.slideIndex = index;
  };
  
}]);
