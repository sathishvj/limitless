angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, RecentsService) {
	/*
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
	*/

	$scope.expandRecents = true;

	$scope.populateMenu = function()  {
		$http.get('http://api.frrole.com/categories').then(function(resp) {
			$scope.categories = resp.data.results[0].categories.sort();
			//console.log($scope.categories);
		});

		$http.get('http://api.frrole.com/v1/trending-topics?location=world&timeinterval=3&apikey=Limitless-gkEQg5x6lk5blOl1fx6x53b6cc146b0b4').then(function(resp) {
			$scope.trending = resp.data.results;
			//console.log($scope.trending);
		});

		$scope.recents = RecentsService.get();
	};
	$scope.populateMenu();


	$scope.showMain = function(val, dontAdd) {
		if (!dontAdd) {
			RecentsService.add(val);
			$scope.recents = RecentsService.get();
		}
		
	};

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainCtrl', function($scope, $stateParams) {
})
;
