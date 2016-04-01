'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var session = require('express-session');

var ms = require('./node_modules/timestamp-ms/index.js');

var app = express();
require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

//routes(app, passport);

var port = process.env.PORT || 8080;

app.get('/:query', function(req, res){
	console.log('got query');
	var query = req.params['query'].toLowerCase();
	if ( ms.isTimestamp(query) ){
		console.log('timestamp found!');
		res.send( {"timestamp": query, "natural": ms.toNatural(query)} );
	}
	else if ( ms.isNatural(query) ){
		console.log('natural date found !');
		res.send( {"timestamp": ms.toTimestamp(query), "natural": query} );
	}
	else{
		console.log('nothing found...');
		res.send( {"timestamp": null, "natural": null} );
	}
}).get('/', function(req, res){
	console.log('got no query');
});

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});