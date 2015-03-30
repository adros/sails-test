/*global angular:true */
var app = angular.module("single-page-app", [
	"config",
	"ngRoute",
	"ngCookies",
	"ui.bootstrap",
	"blockUI",
	"pascalprecht.translate"
]);

var BASE_TITLE = app.BASE_TITLE = document.title;

app.config(function($routeProvider) {

	$routeProvider//
	.when("/", {
		templateUrl : "/app/home.html",
		controller : "HomeCtrl"
	})//
	.when("/company/", {
		templateUrl : "/app/company/companyList.html",
		controller : "CompanyCtrl"
	})//
	.when("/company/:id", {
		templateUrl : "/app/company/companyDetail.html",
		controller : "CompanyDetailCtrl"
	})//
	.when("/tutorial", {
		templateUrl : "/app/tutorial.html"
	});

});

app.controller("HomeCtrl", [
	"$scope",
	"$http",
	function($scope/*, $http*/) {
		document.title = "Home | " + BASE_TITLE;
		$scope.orderProp = "name";
	}
]);

app.controller("MenuController", [
	"$scope",
	"$location",
	"$cookies",
	function($scope, $location, $cookies) {
		$scope.isActive = function(key) {
			var p = $location.path();
			console.log("p", p);
			switch (key) {
			case "home":
				return p == "/";
			case "new":
				return p.indexOf("/new") >= 0;
			case "company":
				return p.indexOf("/company") >= 0 && p.indexOf("/new") == -1;
			}
		};
		$scope.stopEvent = function(evt) {
			//do not bubble  - used to prevent closing menu, when click on drop down
			evt.stopPropagation();
		};
		$scope.setLang = function(locale) {
			$cookies.locale = locale;
			window.location.reload();
		};
	}
]);

app.errorHandler = function(err) {
	alert("Error " + (err.message || err.statusText));
};