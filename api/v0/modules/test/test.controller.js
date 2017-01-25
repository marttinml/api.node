var testModel 	= require('./test.model'),
    assert      = require('assert'),
    connection  = require('../../config/api.mongodb'),
    Log         = require('../../shared/log'),
    merge       = require('merge'),
    controller  = 'test',
    self        = module.exports;

self.create = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.create', body:req.body });
	connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        testModel.create(db, req.body, function(err, result, status) {
            assert.equal(null, err);
            db.close();
            log.end(result);
            //response
            res.status(status).jsonp(result);
        });
    });
};

self.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    var log = new Log.init({controller : controller, method:'Test.retrieve'});
    connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      testModel.retrieve(db, function(err, result, status) {
          db.close();
          log.end(result);
          res.status(200).jsonp(result);
      });
    });
};

self.update = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.update', body:req.body});
  connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          testModel.update(db, req.params.testId, req.body, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              log.end(result);
              //response
              res.status(status).jsonp(result);
          });
    });
};

self.detail = function (req, res) {
    var log = new Log.init({controller : controller, method:'Test.detail', body:req.params.testId});
    connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      testModel.detail(db, req.params.testId, function(err, result, status) {
          db.close();
          log.end(result);
          res.status(200).jsonp(result);
      });
    });
};

self.delete = function (req, res) {
  var log = new Log.init({controller : controller, method:'Test.delete', body:req.params.testId});
  connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          testModel.delete(db, req.params.testId, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              log.end(result);
              //response
              res.status(status).jsonp(result);
          });
    });
};

