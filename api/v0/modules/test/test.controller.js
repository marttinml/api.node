var TestModel 	= require('./test.model'),
    assert      = require('assert'),
    Connection  = require('../../config/api.mongodb'),
    Log         = require('../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

module.exports.create = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.create', body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        TestModel.create(db, req.body, function(err, result, status) {
            assert.equal(null, err);
            db.close();
            log.end(result);
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    var log = new Log.init({controller : controller, method:'Test.retrieve'});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      TestModel.retrieve(db, function(err, result, status) {
          db.close();
          log.end(result);
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var log = new Log.init({controller : controller, method:'Test.detail', body:req.params.testId});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      TestModel.detail(db, req.params.testId, function(err, result, status) {
          db.close();
          log.end(result);
          res.status(200).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.update', body:req.body});
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          TestModel.update(db, req.params.testId, req.body, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              log.end(result);
              //response
              res.status(status).jsonp(result);
          });
    });
};

module.exports.delete = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.delete', body:req.params.testId});
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          TestModel.delete(db, req.params.testId, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              log.end(result);
              //response
              res.status(status).jsonp(result);
          });
    });
};

