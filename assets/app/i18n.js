/*global angular:true */
var app = angular.module("single-page-app");

app.config([
	"$translateProvider",
	"CONFIG",
	function($translateProvider, CONFIG) {
		$translateProvider.translations("en", {
			"Created" : "Createdd"
		});
		$translateProvider.translations("sk", {
			"Created" : "Vytvorene"
		});
		$translateProvider.preferredLanguage(CONFIG.locale);
	}
]);
