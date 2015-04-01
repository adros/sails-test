/*global Company, sails, Buffer */
var _ = require("lodash");
var Promise = require("bluebird");
var SkipperGridFS = require("skipper-gridfs");

module.exports = {
	addEmployee : function(req, res) {
		var company = req.param("company"),
			employee = req.param("employee");

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
			company.employees = [];
			return company.save()//
			.then(res.send.bind(res, {}));
		})//
		.caught(res.serverError);
	},
	uploadAvatar : function(req, res) {
		var conf = _.extend({}, sails.config.connections.mongoDB, {
			adapter : SkipperGridFS
		});
		new Promise(function(resolve, reject) {
			req.file("avatar").upload(conf, function(err, filesUploaded) {
				if (err) {
					return reject(err);
				}
				resolve(filesUploaded);
			});
		})
		.then(function(filesUploaded) {
			res.send(filesUploaded);
		});
	},
	download : function(req, res) {
		var blobAdapter = SkipperGridFS(_.extend({}, sails.config.connections.mongoDB));

		blobAdapter.read("da12ae37-9fdb-4603-b4b2-84f3a8752c10.png", function(error, file) {
			if (error) {
				res.json(error);
			} else {
				res.contentType('image/png');
				res.send(new Buffer(file));
			}
		});
	}
};
