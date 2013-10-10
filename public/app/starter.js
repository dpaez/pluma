/**
 * Pluma App igniter module
 */
var PlumaAppMain = function( _, Backbone, $, PlumaApp ) {

  var step1,
    step2,
    step3,
    leapView,
    steps,
    router;

  function _start(){
    // Create App Views

    step1 = new PlumaApp.StepOneView();
    leapView = new PlumaApp.LeapView();
    step1.addChildView(leapView);
    // Not Implemented Yet
    //step2 = new PlumaApp.StepTwoView();
    // Not Implemented Yet
    //step3 = new PlumaApp.StepThreeView();

    steps.push(step1);
    //steps.push(step2);
    //steps.push(step3);

    // Start Leap trainer
    PlumaApp.LeapTrainer.start();

    // Start router
    router = new PlumaApp.Router();
    Backbone.history.start({pushState: true});

    console.log('Starting Pluma App...');
  };

  function _prepare(){
    steps = [];
  };

  // Public API

  function publicStart(){
    _prepare();
    _start();
  };

  return {
    start: publicStart
  };

}( _, Backbone, jQuery, PlumaApp );
