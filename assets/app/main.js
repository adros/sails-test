/*global angular:true */
var app = angular.module("single-page-app", [
	"ngRoute",
	"ui.bootstrap",
	"blockUI"
]);

var BASE_TITLE = app.BASE_TITLE = document.title;

app.config(function($routeProvider) {

	$routeProvider//
	.when("/", {
		templateUrl : "/app/home.html",
		controller : "HomeCtrl"
	})//
	.when("/company/", {
		templateUrl : "/app/company/company.html",
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

app.errorHandler = function(err) {
	alert("Error " + (err.message || err.statusText));
};