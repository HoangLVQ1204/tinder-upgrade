'use strict';

app.factory('Like', function(FURL, $firebaseArray) {

	var ref = firebase.database().ref();

	var Like = {

		allLikesByUser: function(uid) {
			return $firebaseArray(ref.child('likes').child(uid));
		},

		addLike: function(uid1, uid2) {
			return ref.child('likes').child(uid1).child(uid2).set(true);
		},

		removeLike: function(uid1, uid2) {
			return ref.child('likes').child(uid1).child(uid2).remove();
		}
	};

	return Like;

});