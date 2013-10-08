/**
 * Module dependencies.
 * General Stuff
 */
'use strict';

var express = require('express')

var app = express();

/**
 * configure app
 */ 
require('./config')(app, express);

/**
 * sub apps
 */
var dash = require('./lib/dashboard');

app.use(dash);

app.listen(app.get('port'));
console.log("Express server listening on port " + app.get('port'));

