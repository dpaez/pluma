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

    // Create local lawnchair
    PlumaApp.GesturesDB = new Lawnchair( {name: 'GesturesDB'}, function(){} ); 

    // Create App Views
    app = new PlumaApp.AppView();
    step1 = new PlumaApp.StepOneView();
    step1.addChildView({ 
      view: PlumaApp.LeapView, 
      options: {el: '#gesture-sandbox'} 
    });
    // Not Implemented Yet
    step2 = new PlumaApp.StepTwoView();
    step2.addChildView({
      view: PlumaApp.DuinoView, 
      options: {el: '#duino-sandbox'}
    });
    // Not Implemented Yet
    //step3 = new PlumaApp.StepThreeView();

    PlumaApp.steps.push( step1 );
    PlumaApp.steps.push( step2 );
    //PlumaApp.steps.push( step3 );

    app.addChildView(step1);
    app.addChildView(step2);

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

  // Public API

  function publicStart(){
    _prepare();
    _start();
  };

  return {
    start: publicStart
  };

}( _, Backbone, jQuery, Lawnchair, PlumaApp );
