/**
 * App Config File
 */

//dependencies

var path = require('path'),
  stylus = require('stylus');


module.exports = function( app, express ) {


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

  app.set('views', __dirname);
  app.set('view engine', 'jade');

  app.use(express.static(path.join(__dirname, 'public')));


  if ( app.get('env') === 'development' ){
    app.use(express.errorHandler());
  }

}