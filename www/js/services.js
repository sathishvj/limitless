angular.module('starter.services', [])

.factory('RecentsService', [function($scope) {
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
;
