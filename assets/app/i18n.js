var EN = {
	"Created" : "Created",
	"Edit" : "Edit"
};
var SK = {
	"Created" : "Vytvorene",
	"Edit" : "Upravit"
};

// ====================================================================

/*global angular:true */
var app = angular.module("single-page-app");
app.config([
	"$translateProvider",
	"CONFIG",
	function($translateProvider, CONFIG) {
		$translateProvider.preferredLanguage(CONFIG.locale);

		$translateProvider.translations("en", EN);
		$translateProvider.translations("sk", SK);
	}
]);
