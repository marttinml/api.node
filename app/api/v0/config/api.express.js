/*jslint node:true*/
var express         = require("express"),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    app             = express(),
    info            = {    
                        "API":"api.node",
                        "Version":"v0",
                        "Enviroment":"Pre-Production"
                    };

module.exports = function(){

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // CORDS
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.get('/', function(req, res) {
        res.json(info);
    });
    
    //bodyParse and override
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    require('api.router')(app);

    return app;
};