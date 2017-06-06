var app = require('./express');
var myApp = require('./blogserver/app');
myApp(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
require ("./test/app.js")(app);
require ("./assignment/app");
var port = process.env.PORT || 3000;

app.listen(port);