var app = require('./express');
var myApp = require('./blogserver/app');
myApp(app);


var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret:"something here"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require("./session/app");

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
require ("./test/app.js")(app);
require ("./assignment/app");
var port = process.env.PORT || 3000;

app.listen(port);