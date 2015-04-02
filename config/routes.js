module.exports.routes = {
	"GET /" :  "AppController.index",
	"POST /company/:company/employee/:employee" : "CompanyController.addEmployee",
	"DELETE /company/:company/employee/" : "CompanyController.removeAllEmployees",
	"POST /company/:company/image/" : "CompanyController.uploadImage",
	"GET /company/images/:name" : "CompanyController.downloadImage"

};
