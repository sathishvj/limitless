angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, RecentsService, $state) {
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
		}, function(errResp) {
			console.log('AppCtrl:populateMenu(): error getting categories: ', errResp);
		});

		$http.get('http://api.frrole.com/v1/trending-topics?location=world&timeinterval=3&apikey=Limitless-gkEQg5x6lk5blOl1fx6x53b6cc146b0b4').then(function(resp) {
			$scope.trending = resp.data.results;
			//console.log($scope.trending);
		}, function(errResp) {
			console.log('AppCtrl:populateMenu(): error getting trending topics: ', errResp);
		});

		$scope.recents = RecentsService.get();
	};
	$scope.populateMenu();


	$scope.showMain = function(val, dontAdd) {
		if (!dontAdd) {
			RecentsService.add(val);
			$scope.recents = RecentsService.get();
		}
	
		$state.go('app.main', {tag: val});
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

.controller('MainCtrl', function($scope, $stateParams, $timeout, DelayService, IconsService, $http) {
	console.log($stateParams);
	$scope.tag = $stateParams.tag?$stateParams.tag.replace('#', ''):$stateParams.tag;
	$scope.showTrials = true;

	var testData = [
		{
			text: 'Brazil beats Colombia in WorldCup football',
			//fmtText: '<span class="fmt-big">Brazil </span>beats Colombia in WorldCup football',
			images: ['football', 'brazil', 'colombia', 'trophy', 'happy']
		},
		{
			text: 'Hanging with my friends tonight - karaoke, wine, and fun',
			images: ['wineglass', 'happy']
		},
		{
			text: 'New movie out this weekend. Facebook event invite. You people come.',
			images: ['movie', 'facebook', 'calendar']
		},
		{
			text: 'Railway fare hike is killing the common man.',
			images: ['transport', 'cash', 'sad']
		}
		];

	$scope.currentItem = {};
	$scope.currentIndex = -1;
	$scope.data = [];

	$scope.process = function() {
		if ($scope.tag === 'demoLimitless') {
			console.log('Showing with demo data.');
			$scope.data = getFmtText(testData);
			//$scope.data = testData;
			$scope.show($scope.data);
			return;
		}

		// get the data via api if required
		var url = "http://api.frrole.com/v1/topic-details?apikey=Limitless-gkEQg5x6lk5blOl1fx6x53b6cc146b0b4&tweetcount=25&query=" + $scope.tag;
		console.log(url);
		$http.get(url).then(function(resp) {
			// process the data here
			console.log(resp.data.results.tweets);
			$scope.data = parseImages(getFmtText(resp.data.results.tweets));
			$scope.show($scope.data);
		},
		function(errResp) {
			console.log('Error getting data: ', errResp);
		});

		
	};

	var parseImages = function(objs) {
		if (!objs || objs.length <= 1) {
			return objs;
		}

		var imgObjs = [];

		for (var i=0; i<objs.length; i++) {
			var parts = objs[i].text.split(" ");
			var imgs = [];
			for (var j=0; j<parts.length; j++) {
				//console.log(parts[j]);
				switch (parts[j].trim().toLowerCase().replace('#', '')) {
					case "facebook":
						imgs.push('facebook');
						break;
					case "neymar":
					case "messi":
					case "brazil":
					case "soccer":
					case "football":
						imgs.push('football');
						break;
					case "alcohol":
					case "wine":
					case "liquor":
						imgs.push('wineglass');
						break;
					case "air":
					case "flight":
					case "airport":
					case "plane":
						imgs.push('airplane');
						break;
					case "cloud":
						imgs.push('cloud');
						break;
					case "film":
					case "cinestars":
					case "movie":
					case "movie":
						imgs.push('film');
						break;

				}
			}
			objs[i].images = imgs;
			//console.log(objs[i].images);
			imgObjs.push(objs[i]);
		}
		//console.log('Fmt objs:', imgObjs);
		return imgObjs;

	};

	var getFmtText = function(objs) {
		if (!objs || objs.length === 0) 
		{
			return [{
					fmtText: 'Choose a topic in the menu on the left.',
					images: []
				}];
		}
		var fmtObjs = [];

		for (var i=0; i<objs.length; i++) {
			var parts = objs[i].text.split(" ");
			for (var j=0; j<parts.length; j++) {
				var l = parts[j].length;

				if (l <= 2) {
					parts[j] = '<span class="fmt-extra-small">'+parts[j]+'</span>';
				} else if (l>2 && l<=4) {
					parts[j] = '<span class="fmt-small">'+parts[j]+'</span>';
				} else if (l>7) {
					if (parts[j].match(/^[A-Z][a-z]+$/)) {
						parts[j] = '<span class="fmt-extra-big">'+parts[j]+'</span>';
					} else {
						parts[j] = '<span class="fmt-big">'+parts[j]+'</span>';
					}
				} else {
					parts[j] = '<span class="fmt-normal">'+parts[j]+'</span>';
				}
				
			}
			objs[i].fmtText = parts.join(" ");
			//console.log(objs[i].fmtText);
			fmtObjs.push(objs[i]);
		}
		console.log('Fmt objs:', fmtObjs);
		return fmtObjs;
	};

	var tweetIndex = 0;
	var nextTweet = function() {
		do {
				if (!$scope.data || $scope.data.length === 0) {
					console.log('Canceling timeout because no data.');
					if (tout) { $timeout.cancel(tout); }
				}
				console.log('Changing item', tweetIndex,  $scope.data[tweetIndex]);
				//$scope.currentItem = getFmtText($scope.data[tweetIndex]);
				$scope.currentItem = $scope.data[tweetIndex];
				$scope.currentIndex = tweetIndex;
				tweetIndex++;
				if (tweetIndex >= $scope.data.length) {tweetIndex = 0;}
		} while(true);
	};

	var tout;
	$scope.show = function() {
		//tout = $timeout(nextTweet, DelayService.get());
		$scope.currentIndex = 0;
		$scope.currentItem = $scope.data[$scope.currentIndex];
	};

	$scope.$watch(DelayService.get, function(newVal, oldVal) {
		if (newVal === oldVal) {console.log("Delay changed", newVal, oldVal); return;}
		console.log('Canceling timeout because delay changed.');
		if (tout) { $timeout.cancel(tout); }
	});
	$scope.process();

	$scope.nextItem = function() {
		$scope.currentIndex++;
		if ($scope.currentIndex >= $scope.data.length) {
			$scope.currentIndex = 0;
		}
		$scope.currentItem = $scope.data[$scope.currentIndex];
	};

	$scope.previousItem = function() {

		$scope.currentIndex--;
		if ($scope.currentIndex < 0) {
			$scope.currentIndex = $scope.data.length - 1;
		}
		$scope.currentItem = $scope.data[$scope.currentIndex];
	};

	$scope.getIcon = function(type) {
		if (!$scope.currentItem || !$scope.currentItem.images || !$scope.currentItem.images.length) {return ""};
		//console.log('Checking icons with:', type, $scope.currentItem.images); 
		var icon = IconsService.get(type, $scope.currentItem.images);
		return icon===undefined?"":icon;
	};
})
;
