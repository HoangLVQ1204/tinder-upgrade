'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebaseObject, $firebaseArray, $state, $http) {

	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {

		createProfile: function(uid, auth) {
			var profile = {
				name: auth.displayName,
				gender: auth.cachedUserProfile.gender,
				email: auth.email,
				avatar: auth.profileImageURL,
				// birthday: auth.cachedUserProfile.birthday,
				age: Auth.getAge(auth.cachedUserProfile.birthday),
				location: auth.cachedUserProfile.location.name
			};

			return ref.child('profiles').child(uid).set(profile);
		},

		getProfile: function(uid) {
			return $firebaseObject(ref.child('profiles').child(uid));
		},

		login: function() {
			return auth.$authWithOAuthPopup('facebook', {
				remember: "sessionOnly",
				scope: "public_profile, email, user_location, user_birthday, user_photos, user_about_me"
			})
			.then(function(authFacebook) {
				console.log(authFacebook);
				var user = Auth.getProfile(authFacebook.uid).$loaded();

				user.then(function(profile) {
					if (profile.name == undefined) {
						Auth.createProfile(authFacebook.uid, authFacebook.facebook);
					}
				});
			});
		},

		logout: function() {
			return auth.$unauth();
		},

		getAbout: function(access_token) {
			return $http.get('https://graph.facebook.com/me?fields=bio&access_token=' + access_token);
		},

		getImages: function(access_token) {
			return $http.get('https://graph.facebook.com/me/photos/uploaded?fields=source&access_token=' + access_token);
		},

		getAge: function(birthday) {
			return new Date().getFullYear() - new Date(birthday).getFullYear();
		},

		requireAuth: function() {
			return auth.$requireAuth();
		},

		getProfiles: function() {
			return $firebaseArray(ref.child('profiles'));
		},

		getProfilesByAge: function(age) {
			return $firebaseArray(ref.child('profiles').orderByChild('age').startAt(18).endAt(age));
		} 				

	};

	auth.$onAuth(function(authData) {
		if(authData) {
			console.log('Logged in!');
		} else {
			$state.go('login');
			console.log('You need to login.');
		}
	});

	return Auth;

});