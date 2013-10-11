/**
 * Pluma Leap Trainer Module
 * Deps: leaptrainer.js (all the credit goes to: https://github.com/roboleary/LeapTrainer.js)
 */
PlumaApp.LeapTrainer = function( _, Backbone, LeapTrainer ) {

  // TODO: attach these variables to the PlumaApp object.
  var trainer,
    controller;

  function _init(){
    // New Leap controller instance
    controller = new Leap.Controller();
    // Start leap trainer
    trainer = new LeapTrainer.Controller( {controller: controller} );

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
    trainer.create(gestureName);
    trainer.startTraining(gestureName);
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