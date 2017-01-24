var autoIncrement     = require("mongodb-autoincrement"),
    collection        = "test",
    sequenceBusiness  = "test",
    Response          = require("../../shared/response").response;
    Validator         = require("../../shared/validator");
    Schema            = require("./test.schema");
    self = module.exports;

// parse
self.parseDataToTest = function(data, business){
  business = business || {};
  business.testId     = business.testId || business.testId;
  business.name           = data.name           || business.name;
  business.description    = data.description    || business.description;
  business.date           = data.date           || business.date          || new Date();
  business.lastModified   = new Date();
  return business;
};
// C
module.exports.create = function(db, data, callback) {
  var modelBySchema = Validator.modelBySchema(data, Schema),
      handler;
  if(modelBySchema.valid){
    autoIncrement.getNextSequence(db, sequenceBusiness, function (err, testId) {
      var test = self.parseDataToTest(data);
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
    response.failed(modelBySchema.errors)
    callback(null, response, 202);
  }
};
// R
module.exports.retrieve = function(db, callback) {
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

module.exports.detail = function(db, id, callback) {
   var result = {}; 
   id = (hex.test(id))? ObjectId(id) : id;
   var cursor = db.collection('test').find({ _id : id });
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result = doc;
      } else {
         callback(result);
      }
   });
};

module.exports.update = function(db, id, data, callback) {
  id = (hex.test(id))? ObjectId(id) : id;
  db.collection('test').updateOne(
        { _id : id },
        {
          $set: {
            title:data.title,
            description:data.description
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
            callback(err, data, 200);
        }
    );
};

module.exports.delete = function(db, id, callback) {
  id = (hex.test(id))? ObjectId(id) : id;
  module.exports.detail(db, id, function(result){
      db.collection('test').deleteMany(
        { _id : id },
        function(err, results) {
            callback(err, result, 200);
        }
    );
  });
   
};