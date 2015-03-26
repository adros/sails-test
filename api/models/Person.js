/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection : "mongodbServer",
	attributes : {
		age : {
			type : "integer",
			required : true
		},
		address : {
			model : "address"
		},
		companies : {
			collection : "company",
			via : "employees"
		}
	}

};
