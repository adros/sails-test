/**
* Address.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes : {
		street : {
			type : "string",
			required : true
		},
		number : {
			type : "integer",
			required : true
		},
		person : {
			model : "person",
			required : true
		}
	}
};
