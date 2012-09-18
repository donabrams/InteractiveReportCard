var PORT = process.env.PORT || 8006;
var express = require('express');

var app = express.createServer();
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.bodyParser());
app.use(require("stylus").middleware({
		debug: true,
    src: __dirname,
    dest: __dirname,
    compress: true
}));
// HTTP handlers here!
app.use("/", express.static(__dirname));
//start the express http server
var httpServer = app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});