/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*global Company:true */

module.exports = {
	addEmployee : function(req, res) {
		var company = req.param("company"), employee = req.param("employee");

		Company.findOne(company).populate("employees")//
		.then(function(company) {
			if (!company) {
				return res.notFound("company not found");
			}
			company.employees.add(employee);

			return company.save()//
			.then(res.send.bind(res, {}));
		})//
		.caught(res.serverError);
	},
	removeAllEmployees : function(req, res) {
		var company = req.param("company");

		Company.findOne(company).populate("employees")//
		.then(function(company) {
			if (!company) {
				return res.notFound("company not found");
			}
			company.employees=[];
			return company.save()//
			.then(res.send.bind(res, {}));
		})//
		.caught(res.serverError);
	}
};
