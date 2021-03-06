/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes : {
		name : {
			type : "string",
			required : true
		},
		employees : {
			collection : "person",
			via : "companies"
		},
		shortName : {
			type : "string"
		},
		image : {
			type : "string"
		}
	}
};
