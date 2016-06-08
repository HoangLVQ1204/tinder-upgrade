'use strict';

app.controller('SettingCtrl', function(Auth, $ionicPopup) {
	var sett = this;

	sett.maxAge = window.localStorage.getItem('maxAge') || 25;
	
	sett.men = JSON.parse(window.localStorage.getItem('men'));
	sett.men = sett.men === null? true : sett.men;

	sett.women = JSON.parse(window.localStorage.getItem('women'));
	sett.women = sett.women === null? true : sett.women;

	sett.changeMaxAge = function() {
		window.localStorage.setItem('maxAge', sett.maxAge);
	};

	sett.selectMen = function() {
		window.localStorage.setItem('men', sett.men);
	};

	sett.selectWomen = function() {
		window.localStorage.setItem('women', sett.women);
	};

	sett.logout = function() {
		$ionicPopup.confirm({
			title: 'Logout',
			template: 'Do you want to logout?'
		})
		.then(function(res) {
			if (res) {
				Auth.logout();
			}
		});
		
	};

});