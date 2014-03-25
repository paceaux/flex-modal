var express = require('express'),
	app = express();

//website variables

var port = 8080,
	directory = '/',
	defaultPage = '/flexModal-demo.html';

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + directory));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: false
	}));
	app.use(app.router);
});

app.get('/', function (req, res) {
	res.redirect(defaultPage);
});
app.listen(port);
console.log("listening on port %s", port);