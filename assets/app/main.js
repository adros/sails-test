var app = angular.module("single-page-app", [
	"ngRoute",
	"ui.bootstrap"
]);

var BASE_TITLE = document.title;

app.config(function($routeProvider) {

	$routeProvider//
	.when("/", {
		templateUrl : "/app/home.html",
		controller : "HomeCtrl"
	})//
	.when("/about", {
		templateUrl : "/app/about.html",
		controller : "AboutCtrl"
	})//
	.when("/tutorial", {
		templateUrl : "/app/tutorial.html"
	});

});

app.controller("HomeCtrl", [
	"$scope",
	"$http",
	function($scope, $http) {
		document.title = "Home | " + BASE_TITLE;
		$http.get("/company/")//
		.then(function(response) {
			console.log("ddddd", response.data);
			$scope.companies = response.data;
		})//
		["catch"](function(err) {
			alert("Error " + (err.message || err.statusText));
		});
		$scope.orderProp = "name";
	}
]);

app.controller("AboutCtrl", [
	"$scope",
	"$routeParams",
	function($scope, $routeParams) {
		document.title = "About | " + BASE_TITLE;
		return;
		$scope.phoneId = $routeParams.phoneId;
	}
]);