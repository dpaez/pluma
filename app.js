/**
 * Module dependencies.
 * General Stuff
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus');

var app = express();

// /* Lets see if this will remain here or not */
app.configure(function(){

  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true);
  }

  app.set('port', process.env.PORT || 3000);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(express.cookieParser('your secret here'));
//   app.use(express.session());
//   app.use(app.router);
//  app.use(require('stylus').middleware(__dirname + '/public'));
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

// http.createServer(app).listen(app.get('port'), '0.0.0.0', function(){
//   console.log("Express server listening on port " + app.get('port'));
// });
