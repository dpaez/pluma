/**
 * Module dependencies.
 * General Stuff
 */
'use strict';

var express = require('express')
  , path = require('path')
  , stylus = require('stylus');

var app = express();

// Lets see if this will remain here or not...
app.configure(function(){

  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true);
  }

  app.set('port', process.env.PORT || 3000);

  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));

  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


/**
 * sub apps
 */
var dash = require('./lib/dashboard');

app.use(dash);

app.listen(app.get('port'));
console.log("Express server listening on port " + app.get('port'));

