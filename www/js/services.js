angular.module('starter.services', [])

.factory('RecentsService', [function() {
	var recentsList = [];

	var getRecents = function() {
		return recentsList;
	};

	var addRecents = function(val) {
		recentsList.unshift(val);
		for (var i=1; i<recentsList.length; i++) {
			if (recentsList[i] === val) {
				recentsList.splice(i, 1);	// there's some bug here.  Add 3 items.  Click the same value as the middle item.  The last item is somehow removed.
			}
		}
		if (recentsList.length > 10) {
			recentsList.pop();
		}
	};

	return {
		get: getRecents,
		add: addRecents
	};
}])

.factory('DelayService', [function() {
	var delay = 1000; //milliseconds

	var getDelay = function(val) {
		return delay;
	};

	var setDelay = function() {
		delay = val;
	};

	return {
		get: getDelay,
		set: setDelay
	};
}])

.factory('IconsService', [function() {
	var iconsList = [
		{"type": "sport", "name": "football", "icon": "ion-ios7-football-outline"}
	];

	var getIcon = function(type, images) {
		for (var i=0; i<iconsList.length; i++) {
			for (var j=0; j<images.length; j++) {
				console.log('Checking in with:', type, images[j], iconsList[i]);
				if (iconsList[i].type === type && iconsList[i].name === images[j]) {
					console.log("Matched: ", iconsList[i]);
					return iconsList[i].icon;
				}
			}
		}
		return undefined;
	};

	return {
		get: getIcon
	};
}])
;
