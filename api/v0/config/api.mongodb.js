var assert = require('assert');
	MongoClient = require('mongodb').MongoClient,
	// url         = 'mongodb://2school666:25ch001666@ds043324.mongolab.com:43324/2school',
	url         = 'mongodb://localhost/test';

module.exports.ejecute = function (handler) {
	MongoClient.connect(url, handler);
};

// Test connection
module.exports.testConnection = function(callback){
	console.log("	Connecting to mongodb ···");
    module.exports.ejecute(function(err, db) { 
        assert.equal(null, err);
        	console.log("	Connection to mongodb ···················· OK \n");
			console.log("	Server Started ··························· OK \n");
	        console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n");
        db.close();
    });
};

module.exports.testConnection();

