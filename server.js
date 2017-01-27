var MongoDB = require('./api/v0/config/api.mongodb'),
    express  = require('./api/v0/config/api.express'),
    app      = express();

var port = process.env.PORT || 2000;
app.listen(port, function () {
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log(" |     API REST [api.node] - http://localhost:" + port + "     | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log(" |     Owner: Martín Mtz 			       | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
    console.log("\n");
    console.log("\n");
});