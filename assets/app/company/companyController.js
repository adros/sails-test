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
	"$i18n",
	"$upload",
	function($scope, $routeParams, $http, $modal, $i18n, $upload) {

		$scope.init = function() {
			document.title = $i18n("Company");

			$http.get("/company/" + $routeParams.id)//
			.then(function(response) {
				$scope.company = response.data;
				document.title = [
					$scope.company.name,
					$i18n("Company"),
					app.BASE_TITLE
				].join(" | ");
			})//
			["catch"](app.errorHandler);
		};

		$scope.editEmployees = function(company) {
			$modal.open({
				templateUrl : "/app/company/employeesModal.html",
				controller : "EmployeesModalCtrl",
				backdrop : "static",
				size : "lg",
				resolve : {
					company : function() {
						return company;
					}
				}
			});
		};

		$scope.upload = function(files) {
			if (files && files.length) {
				var file = files[0];
				$upload.upload({
					url : "/company/uploadAvatar",
					file : file,
					fileFormDataName : "avatar"
				})
				.success(function(data, status, headers, config) {
					debugger;
					console.log("file " + config.file.name + "uploaded. Response: " +
						JSON.stringify(data));
				});
			}
		};

		$scope.init();
	}
]);

app.controller("CompanyEditCtrl", [
	"$scope",
	"$routeParams",
	"$http",
	"$location",
	function($scope, $routeParams, $http, $location) {
		$scope.init = function() {
			document.title = "Company | " + app.BASE_TITLE;
			$scope.title = "Edit company";
			$http.get("/company/" + $routeParams.id)//
			.then(function(response) {
				var company = $scope.company = response.data;

				company.createdAt && (company.createdAt = new Date(company.createdAt));

				$scope.title = company.name;//for title, keep same afetr change in name
				document.title = company.name + " | Company | " + app.BASE_TITLE;
			})//
			["catch"](app.errorHandler);
		};

		$scope.save = function() {
			if ($scope.form.$invalid) {
				return;
			}
			$http.put("/company/" + $scope.company.id, $scope.company)//
			.then(function() {
				$location.path("/company/" + $scope.company.id);
			})//
			["catch"](app.errorHandler);
		};

		$scope.init();
	}
]);

app.controller("CompanyCreateCtrl", [
	"$scope",
	"$routeParams",
	"$http",
	"$location",
	function($scope, $routeParams, $http, $location) {
		$scope.init = function() {
			document.title = "New company | " + app.BASE_TITLE;
			$scope.title = "New company";
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		};

		$scope.save = function() {
			if ($scope.form.$invalid) {
				return;
			}
			$http.post("/company/", $scope.company)//
			.then(function(response) {
				$location.path("/company/" + response.data.id);
			})//
			["catch"](app.errorHandler);
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
			var id = $scope.personId,
				company = $scope.company;
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
