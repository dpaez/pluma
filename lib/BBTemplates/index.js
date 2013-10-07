/**
 * Underscore template loader app 
 */

var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/step1', function(req, res){
  res.render('leapTemplate');
});