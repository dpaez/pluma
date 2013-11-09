/**
 * Pluma App igniter module
 */
var PlumaAppMain = function( _, Backbone, $, Lawnchair, PlumaApp ) {

  var app,
    step1,
    step2,
    step3,
    router;

  function _start(){

    // Define some globals constants

    PlumaApp.TYPES = {
      'GESTURE' : 0,
      'COMPONENT': 1,
      'CONFIG' : 2,
    };

    PlumaApp.SOCKETS = {
      'HOST': 'http://localhost',
      'PORT': '8080'
    };

    // Create local lawnchair
    PlumaApp.Storage = new Lawnchair( {name: 'PLUMA'}, function(){} );

    // Create a key generator
    PlumaApp.KEYS = {
      'COMPONENT': function( options, prefix ){
        if (!options){ return; }
        prefix = prefix || 'key_';
        var id = undefined;
        if ( options.pin ){ id = prefix + options.pin.toString() };
        if ( options.pins ){ id = prefix + options.pins.toString() };
        return id;
      },
    };

    // Create PlumaApp sockets
    PlumaApp.socket = io.connect( PlumaApp.SOCKETS.HOST + ':' + PlumaApp.SOCKETS.PORT );

    // PlumaApp sockets events
    PlumaApp.socket.emit( 'plumaduino:components_status' );
    PlumaApp.socket.on( 'plumaduino:components_attached', _.bind(_addComponents, this) );

    // Create App Views

    // General app view
    app = new PlumaApp.AppView();

    // step 1
    step1 = new PlumaApp.StepOneView();
    step1.addChildView({
      view: PlumaApp.LeapView,
      options: {el: '#gesture-sandbox'}
    });

    // step 2
    step2 = new PlumaApp.StepTwoView();
    step2.addChildView({
      view: PlumaApp.DuinoView,
      options: { el: '#duino-sandbox' }
    });

    // step 3
    step3 = new PlumaApp.StepThreeView();
    step3.addChildView({
      view: PlumaApp.LeapDuinoView,
      options: { el: '#leapduino-sandbox' }
    });

    // step 4
    step4 = new PlumaApp.StepFourView();
    step4.addChildView({
      view: PlumaApp.SandboxView,
      options: { el: '#tester-sandbox' }
    });

    PlumaApp.steps.push( step1 );
    PlumaApp.steps.push( step2 );
    PlumaApp.steps.push( step3 );
    PlumaApp.steps.push( step4 );

    app.addChildView( step1 );
    app.addChildView( step2 );
    app.addChildView( step3 );
    app.addChildView( step4 );

    // Start Leap trainer
    PlumaApp.LeapTrainer.start();

    // Start router
    router = new PlumaApp.Router();
    Backbone.history.start( {pushState: true} );
    console.log( '---------------------' );
    console.log( 'Starting Pluma App...' );

    app.firstStep();
  };

  function _prepare(){
    PlumaApp.currentPos = 0;
    PlumaApp.steps = [];
  };

  function _addComponents( components ){
    PlumaApp.Storage.save({
      key: 'components',
      data : components
    });
  };

  // Public API

  function publicStart(){
    _prepare();
    _start();
  };

  return {
    start: publicStart
  };

}( _, Backbone, jQuery, Lawnchair, PlumaApp );
