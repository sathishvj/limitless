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
	  {"type": "technology", "name": "ionic", "icon": "ion-ionic"},
      {"type": "emotion", "name": "heart", "icon": "ion-heart"},
      {"type": "emotion", "name": "heartbroken", "icon": "ion-heart-broken"},
      {"type": "transport", "name": "airplane", "icon": "ion-paper-airplane"},
      {"type": "office", "name": "paperclip", "icon": "ion-paperclip"},
      {"type": "office", "name": "briefcase", "icon": "ion-briefcase"},
      {"type": "weather", "name": "cloud", "icon": "ion-cloud"},
      {"type": "time", "name": "calendar", "icon": "ion-calendar"},
      {"type": "time", "name": "clock", "icon": "ion-clock"},
      {"type": "finance", "name": "cash", "icon": "ion-cash"},
      {"type": "emotion", "name": "happy", "icon": "ion-happy"},
      {"type": "emotion", "name": "sad", "icon": "ion-sad"},
      {"type": "sport", "name": "victory", "icon": "ion-trophy"},
      {"type": "misc", "name": "trophy", "icon": "ion-trophy"},
      {"type": "sport", "name": "podium", "icon": "ion-podium"},
      {"type": "education", "name": "university", "icon": "ion-university"},
      {"type": "transport", "name": "plane", "icon": "ion-plane"},
      {"type": "transport", "name": "jet", "icon": "ion-jet"},
      {"type": "weather", "name": "rain", "icon": "ion-ios7-rainy"},
      {"type": "weather", "name": "thunderstorm", "icon": "ion-ios7-thunderstorm"},
      {"type": "weather", "name": "snowy", "icon": "ion-ios7-snowy"},
      {"type": "weather", "name": "cloudy-night", "icon": "ion-ios7-cloudy-night"},
      {"type": "entertainment", "name": "musical-notes", "icon": "ion-ios7-musical-notes"},
      {"type": "entertainment", "name": "musical-note", "icon": "ion-ios7-musical-note"},
      {"type": "entertainment", "name": "mic", "icon": "ion-ios7-mic"},
      {"type": "entertainment", "name": "volume-high", "icon": "ion-ios7-volume-high"},
      {"type": "entertainment", "name": "volume-low", "icon": "ion-ios7-volume-low"},
      {"type": "entertainment", "name": "film", "icon": "ion-ios7-film"},
      {"type": "misc", "name": "lightbulb", "icon": "ion-ios7-lightbulb"},
      {"type": "entertainment", "name": "wineglass", "icon": "ion-ios7-wineglass"},
      {"type": "social", "name": "facebook", "icon": "ion-social-facebook"},
      {"type": "technology", "name": "github", "icon": "ion-social-github"},
      {"type": "sport", "name": "football", "icon": "ion-ios7-football"},
      {"type": "social", "name": "linkedin", "icon": "ion-social-linkedin"}
	];

	var getIcon = function(type, images) {
		for (var i=0; i<iconsList.length; i++) {
			for (var j=0; j<images.length; j++) {
				//console.log('Checking in with:', type, images[j], iconsList[i]);
				if (iconsList[i].type === type && iconsList[i].name === images[j]) {
					//console.log("Matched: ", iconsList[i]);
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
