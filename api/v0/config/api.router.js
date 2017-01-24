module.exports = function (app) {
    var test = require('../modules/test/test.controller');
    
    app.route('/v0/test').post(test.create);
    app.route('/v0/test').get(test.retrieve);
    app.route('/v0/test/:testId').get(test.detail);
    app.route('/v0/test/:testId').put(test.update);
    app.route('/v0/test/:testId').delete(test.delete);
};