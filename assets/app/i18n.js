var EN = {};
var SK = {
	"Created" : "Vytvorene",
	"Edit" : "Upravit",
	"Company" : "Spolocnost"
};

// ====================================================================

/*global angular:true */
var app = angular.module("single-page-app");
app.config([
	"$translateProvider",
	"$config",
	function($translateProvider, $config) {
		$translateProvider.preferredLanguage($config.locale);

		$translateProvider.translations("en", EN);
		$translateProvider.translations("sk", SK);
	}
]);

var TRANSLATIONS = {
	en : EN,
	sk : SK
};

app.factory("$i18n", [
	"$config",
	function($config) {
		var translation = TRANSLATIONS[$config.locale];
		return function(key) {
			return (key in translation) ? translation[key] : key;
		};
	}
]);