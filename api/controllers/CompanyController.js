/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	addEmployee : function(req, res) {
		//Person.findOne(req.query.id)//
		if (!req.query.person || !req.query.company) {
			return res.badRequest("person and company are required");
		}

		Company.findOne(req.query.company).populate("employees")//
		.then(function(company) {
			if (!company) {
				return res.notFound("company not found");
			}
			company.employees.add(req.query.person)

			return company.save()//
			.then(res.send.bind(res, {}));
		})//
		.caught(res.serverError);
	}
};
