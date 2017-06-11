var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/webdev");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected")
});
mongoose.Promise=require("q").Promise;

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
