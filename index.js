var express = require('Express');
var bodyParser = require('body-parser');

var app = express();

var api3 = require('./ethereum_test.js');

app.use('/api_ether', api3);

// app.use('/api', function(req, res, next){
//     console.log("A request for things received at " + Date.now());
//     next();
//  });

 app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

 var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
 app.listen(port);