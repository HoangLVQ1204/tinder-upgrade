'use strict';

app.factory('Match', function(FURL, $firebaseArray, $ionicPopup) {

	var ref = new Firebase(FURL);

	var Match = {

		allMatchesByUser: function(uid) {
			return $firebaseArray(ref.child('matches').child(uid));
		},

		checkMatch: function(uid1, uid2) {
			var check = ref.child('likes').child(uid2).child(uid1);

			check.on('value', function(snap) {
				if (snap.val() != null) {
					ref.child('matches').child(uid1).child(uid2).set(true);
					ref.child('matches').child(uid2).child(uid1).set(true);

					$ionicPopup.alert({
						title: 'Matched',
						template: 'Yay, you guys are matched!'
					});
				}
			})
		},

		removeMatch: function(uid1, uid2) {
			ref.child('matches').child(uid1).child(uid2).remove();
			ref.child('matches').child(uid2).child(uid1).remove();
		}

	};

	return Match;

});