'use strict';

app.controller('ProfileCtrl', function(profile, about, images) {
	var prof = this;

	prof.currentUser = profile;
	prof.about = about;
	prof.images = images;
	
});