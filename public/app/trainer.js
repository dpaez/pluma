/**
 * Pluma Leap Trainer Module
 * Deps: leaptrainer.js (all the credit goes to: https://github.com/roboleary/LeapTrainer.js)
 */
PlumaApp.trainer = {};
PlumaApp.controller = {};

PlumaApp.LeapTrainer = function( _, Backbone, LeapTrainer ) {

  function _init(){
    // New Leap controller instance
    PlumaApp.controller = new Leap.Controller();
    // Start leap trainer
    PlumaApp.trainer = new LeapTrainer.Controller( {controller: PlumaApp.controller} );

    // Specific module events
    PlumaApp.on({
      'plumaleap:create': _train,
      'training-countdown': _trainingCountdown,
      'training-started': _trainingStarted,
      'training-complete': _trainingComplete,
      'gesture-recognized': _gestureRecognized,
      'connect': _leapConnected
    });

  };

  function _train(gestureName){
    console.log('Calling leaptrainer create');
    PlumaApp.trainer.create(gestureName);
    PlumaApp.trainer.startTraining(gestureName);
  };

  function _leapConnected(){
    console.log('Leap Device is connected!');
  };

  function _trainingCountdown(){

  };

  function _trainingStarted(gestureName){
    console.log('Training new gesture: ', gestureName);
  };

  function _trainingComplete(gestureName, trainingGestures){
    console.log('Training gesture complete for: ', gestureName);
    console.log(trainingGestures);
  };

  function _gestureRecognized(hit, gestureName){
    console.log('Gesture recognized: %s with confidence: %d', [gestureName, hit]);
  };

  // Public API

  function publicStart(){
    _init();
  };

  return {
    start: publicStart
  };

}( _, Backbone, LeapTrainer );