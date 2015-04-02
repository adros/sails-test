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
		})
		.catch(res.serverError);
	},
	uploadImage : function(req, res) {

		var upstream = Promise.promisifyAll(req.file("image"));

		Promise.all([
			getAndCleanCompany(req.param("company")),
			uploadFile(upstream)
		])
		.spread(function(company, fileName) {
			company.image = fileName;
			return company.save();
		})
		.then(function(company) {
			res.send(company);
		})
		//.then(res.send.bind(res))
		.catch(res.serverError);

		function getAndCleanCompany(companyId) {
			return Company.findOne(companyId)
			.then(function(company) {
				if (company.image) {
					var img = company.image ;
					company.image = null;
					Promise.all([
						company.save(),
						blobAdapter().rmAsync(img)
					])
					.thenReturn(company);
				}
				return company;
			});
		}

		function uploadFile(upstream) {
			var reqFilename = upstream._files[0].stream.filename;

			return getCollection("fs.files")
			.then(function(files) {
				return Promise.promisifyAll(files.find({
					filename : {
						$regex : "^" + stripExt(reqFilename),
						$options : "i"
					}
				})).toArrayAsync();
			})
			.then(function(files) {
				var filename = getUniqueName(reqFilename, files);
				var opts = _.extend({}, sails.config.connections.mongoDB, {
					adapter : SkipperGridFS,
					filename : filename
				});
				return upstream.uploadAsync(opts)
				.thenReturn(filename);
			});
		}
	},
	downloadImage : function(req, res) {
		var filename = req.param("name");

		return getCollection("fs.files")
		.then(function(files) {
			return files.findOneAsync({
				filename : filename
			});
		})
		.then(function(fileInfo) {
			if (!fileInfo) {
				return res.notFound("image not found");
			}
			return blobAdapter().readAsync(filename)
			.then(function(file) {
				res.contentType(fileInfo.metadata.contentType);
				res.send(new Buffer(file));
			});
		})
		.catch(res.serverError);
	}
};

function stripExt(filename) {
	var parts = filename.split(".");
	parts.pop();return parts.join(".");
}

function blobAdapter() {
	return Promise.promisifyAll(SkipperGridFS(_.extend({}, sails.config.connections.mongoDB)));
}

function getCollection(coll) {
	var sailsMongo = Promise.promisifyAll(sails.adapters["sails-mongo"]);
	return sailsMongo.nativeAsync("mongoDB", coll)
	.then(Promise.promisifyAll);
}

function getUniqueName(filename, files) {
	var name = filename.split(".");
	var ext = name.pop();
	name = name.join(".");

	var usedNames = files.map(function(f) {
		return f.filename;
	});
	var i = 2;
	while (~usedNames.indexOf(filename)) {
		filename = name + "__" + (i++) + "." + ext;
	}
	return filename;
}
