/**
 * dashboard app
 */

var express = require( 'express' );
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

/**
 * App functionality
 */
app.get('/dash', function(req, res){
  res.render('dash');
});