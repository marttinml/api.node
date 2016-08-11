var ObjectId = require('mongodb').ObjectID;
var collectionName = "responder_encuesta";


module.exports.create = function(db, data, callback) {
  //var valid = Util.validateModel(data, { required:['key'], number:['key'], string:['name','description'] });
  var valid = true;
  
  if(valid){
      db.collection(collectionName).insertOne( {
          encuesta        : data.encuesta,
          preguntas       : data.preguntasList,
          tipoEncuesta    : data.tipoEncuesta,
          usuario         : 0,
          date            : new Date()
      }, function(err, result){
          result.ops[0].id = result.ops[0]._id;
          delete result.ops[0]._id;
          delete result.ops[0].date;  
          callback(err, result.ops[0], 200);
      } );

  }else{
    callback(null, 'Invalid Model', 201);
  }
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection(collectionName).find({});
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.push(doc);
      } else {
         callback(result);
      }
   });
};

module.exports.detail = function(db, id, callback) {
   var result = [];
   var cursor = db.collection(collectionName).find({ _id : ObjectId(id) });
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.push(doc);
      } else {
         callback(result[0]);
      }
   });
};

module.exports.update = function(db, id, data, callback) {
   db.collection(collectionName).updateOne(
        { _id : ObjectId(id) },
        {
          $set: data,
          $currentDate: { "lastModified": true }
        },function(err, results) {
            callback(err, data, 200);
        }
    );
};

module.exports.replace = function(db, id, data, callback) {
   db.collection(collectionName).replaceOne(
        { _id : ObjectId(id) },
        data
        ,function(err, results) {
            data.id = id;
            callback(err, data, 200);
        }
    );
};

module.exports.delete = function(db, id, callback) {
  
  module.exports.detail(db, id, function(result){
      db.collection(collectionName).deleteMany(
        { _id : ObjectId(id) },
        function(err, results) {
            callback(err, results, 200);
        }
    );
  });
   
};

module.exports.indicadores = function(db, id, callback) {
   var result = {encuesta:id, mensaje:"", respondida:0};
   var cursor = db.collection(collectionName).find(
      { 
        "encuesta.id" : Number(id)
      }
    );
   
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.respondida++;
      } else {
         result.respondida = result.respondida + " Veces";
         callback(result);
      }
   });
};