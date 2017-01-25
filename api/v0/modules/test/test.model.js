var autoIncrement     = require("mongodb-autoincrement"),
    Response          = require("../../shared/response").response;
    Validator         = require("../../shared/validator");
    date              = require("../../shared/date");
    Schema            = require("./test.schema");
    collection        = "test",
    sequence          = "test",
    self = module.exports;

// parse
self.parse = function(data, test){
  test = test || {};
  test.testId       = test.testId         || test.testId;
  test.name         = data.name           || test.name;
  test.description  = data.description    || test.description;
  test.date         = data.date           || test.date          || date.new();
  test.lastModified = date.new();
  return test;
};
// C
self.create = function(db, data, callback) {
  var modelBySchema = Validator.modelBySchema(data, Schema),
      handler;
  if(modelBySchema.valid){
    autoIncrement.getNextSequence(db, sequence, function (err, testId) {
      var test = self.parse(data);
      test.testId = testId;
      handler = function(err, results){
      self.detail(db, testId, function(err,result,status){
        var response = new Response();
        results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
      };
      db.collection(collection).insertOne(test, handler);
    });
  }else{
    var response = new Response();
    response.failed(modelBySchema.errors,202,"Model does not match with schema");
    callback(null, response, response.error.code);
  }
};
// R
self.retrieve = function(db, callback) {
   var result = [],
      status = 200,
      handler;
   handler = function(err, result){
      !result.length && (function(){
          status = 202;
          result = [];
        })();
        callback(err,result,status);
    };
   db.collection(collection).find({},{ _id: false }).toArray(handler);
};

self.detail = function(db, testId, callback) {
  testId = Number(testId);
   var result = {},
      status = 200,
      handler;
  handler = function(err, result){
    !result && (function(){
      status = 202;
      result = {};
    })();
    callback(err,result,status);
  };
  db.collection(collection).findOne({ testId : testId }, { _id:false },handler);
};

self.update = function(db, testId, data, callback) {
  testId = Number(testId);
  var modelBySchema = Validator.modelBySchema(data, Schema),
      handler;
  if(modelBySchema.valid){
    self.detail(db, testId, function(err, test, status){
      test = self.parse(data, test);
      handler = function(err, results) {
        self.detail(db, testId, function(err,result,status){
          var response = new Response();
          results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
      };
      db.collection(collection).updateOne( { testId : testId }, test, handler);
    });
  }else{
    var response = new Response();
    response.failed(modelBySchema.errors)
    callback(null, response, 202);
  }
};

self.delete = function(db, testId, callback) {
  testId = Number(testId);
  self.detail(db, testId, function(err, result, status){
    var handler = function(err, results) {
            var response = new Response();
            results.result.n ? response.successful(result) : response.failed(results.result);
            callback(err, response, status);
        };
      db.collection(collection).deleteMany( { testId : testId }, handler);
    });
};