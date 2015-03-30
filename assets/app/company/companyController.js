/*global angular:true */
var app = angular.module("single-page-app");

app.controller("CompanyCtrl", [
	"$scope",
	"$http",
	function($scope, $http) {
		document.title = "Companies | " + app.BASE_TITLE;
		$http.get("/company/")//
		.then(function(response) {
			$scope.companies = response.data;
		})//
		["catch"](app.errorHandler);
		$scope.orderProp = "name";
	}
]);

app.controller("CompanyDetailCtrl", [
	"$scope",
	"$routeParams",
	"$http",
	"$modal",
	function($scope, $routeParams, $http, $modal) {

		$scope.init = function() {
			document.title = "Company | " + app.BASE_TITLE;
			$http.get("/company/" + $routeParams.id)// 
			.then(function(response) {
				$scope.company = response.data;
				document.title = $scope.company.name + " | Company | " + app.BASE_TITLE;
			})//
			["catch"](app.errorHandler);
			$scope.orderProp = "name";
		};

		$scope.editEmployees = function(company) {
			$modal.open({
				templateUrl : "/app/company/employeesModal.html",
				controller : "EmployeesModalCtrl",
				size : "lg",
				resolve : {
					company : function() {
						return company;
					}
				}
			});
		};

		$scope.init();

	}
]);

app.controller("EmployeesModalCtrl", [
	"$scope",
	"$modalInstance",
	"$http",
	"company",
	function($scope, $modalInstance, $http, company) {
		$scope.company = company;
		$http.get("/person/?sort=age")// 
		.then(function(response) {
			$scope.allPersons = response.data;
			$scope.allPersonsHash = $scope.allPersons.reduce(function(_obj, item) {
				_obj[item.id] = item;
				return _obj;
			}, {});
			$scope.personOptions = $scope.allPersons.filter(employeesFilter.bind(null, company.employees.map(employeesToIds)));
		})//
		["catch"](app.errorHandler);

		///
		$scope.ok = function() {
			$modalInstance.close();
		};
		$scope.clear = function() {
			$http["delete"]("/company/" + company.id + "/employee/")// 
			.then(function() {
				$scope.company.employees = [];
				$scope.personOptions = $scope.allPersons;
			})//
			["catch"](app.errorHandler);

		};
		$scope.add = function() {
			var id = $scope.personId, company = $scope.company;
			if (!id) {
				return;
			}
			$http.post("/company/" + company.id + "/employee/" + id)// 
			.then(function() {
				company.employees.push($scope.allPersonsHash[id]);
				$scope.personOptions = $scope.allPersons.filter(employeesFilter.bind(null, company.employees.map(employeesToIds)));
				$scope.personId = null; //clear from model
			})//
			["catch"](app.errorHandler);
		};

		function employeesFilter(usedIds, person) {
			return usedIds.indexOf(person.id) == -1;
		}
		function employeesToIds(p) {
			return p.id;
		}
	}
]);