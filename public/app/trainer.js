/**
 * Pluma Leap Trainer Module
 * Deps: leaptrainer.js (all the credit goes to: https://github.com/roboleary/LeapTrainer.js)
 */
PlumaApp.trainer = {};
PlumaApp.controller = {};

PlumaApp.LeapTrainer = function( _, Backbone, Leap, LeapTrainer ) {

  function _modifyController(replacementController) {

    replacementController = LeapTrainer[replacementController];
    var fields = replacementController.overidden;
    var func;

    for (var field in fields) {
      func = replacementController.prototype[field];
      if (func) {
        if (func.bind) { func.bind(PlumaApp.trainer); }
        PlumaApp.trainer[field] = func;
      }
    }
  };

  function _init(){
    // New Leap controller instance
    PlumaApp.controller = new Leap.Controller();
    // Start leap trainer
    PlumaApp.trainer = new LeapTrainer.Controller({
      controller: PlumaApp.controller,
      //minRecordingVelocity: 600,
      //maxRecordingVelocity: 30,
      trainingGestures: 1,
      minGestureFrames: 5,
      convolutionFactor: 0,
      hitThreshold: 0.65,
      downtime: 1000,
    });

    _modifyController( 'HRController' );
    //_modifyController( 'CorrelationController' );

    // Specific module events
    PlumaApp.on({
      'plumaleap:create': _train,
      'plumaleap:reset': _reset,
    });

    // Leap Trainer Events
    PlumaApp.trainer.on( 'training-started', _trainingStarted );
    PlumaApp.trainer.on( 'training-gesture-saved', _trainingGestureRecognized );
    PlumaApp.trainer.on( 'training-complete', _trainingComplete );
    PlumaApp.trainer.on( 'training-countdown', _trainingCountdown );
    PlumaApp.trainer.on( 'gesture-recognized', _gestureRecognized );
    PlumaApp.trainer.on( 'gesture-unknown', _gestureUnknown );
    // Leap Controller Events
    PlumaApp.controller.on( 'connect', _leapConnected );
    PlumaApp.controller.on( 'deviceDisconnected', _leapDisconnected );
    PlumaApp.controller.on( 'ready', _leapReady );
    //PlumaApp.controller.on( 'frame', _leapFrame );

    PlumaApp.controller.connect();
  };

  function _train( gestureName ){
    PlumaApp.trainer.create( gestureName );
  };

  function _reset( gestureName ){
    PlumaApp.trainer.retrain( gestureName );
  };

  /*
  Leap Motion section
   */

  function _leapConnected(){
    PlumaApp.trigger( 'plumaleap:leap-connected' );
  };

  function _leapDisconnected(){
    PlumaApp.trigger( 'plumaleap:leap-disconnected' );
  };

  function _leapReady(){
    PlumaApp.trigger( 'plumaleap:leap-ready' );
  };

  function _leapFrame( frame ){
    console.log(frame);
  };

  /*
  Leap Training section
   */

  function _trainingCountdown( countdown ){
    PlumaApp.trigger( 'plumaleap:training-countdown', countdown );
  };

  function _trainingStarted( gestureName ){
    console.log('Training new gesture: ', gestureName);
    PlumaApp.trigger( 'plumaleap:training-started' );
  };

  function _trainingGestureRecognized( gestureName, trainingGestures ){
    var remaining = ( trainingGestures - trainingGestures.length );
    PlumaApp.trigger( 'plumaleap:training-gest-recognized' );
  };

  function _trainingComplete( gestureName, trainingGestures ){
    console.log( 'Training gesture complete for: ', gestureName );
    // Testing
    PlumaApp.trainer.distribute( trainingGestures );
    var gestureJSON = PlumaApp.trainer.toJSON( gestureName );
    PlumaApp.trigger( 'plumaleap:training-complete', gestureName, gestureJSON );
  };

  function _gestureRecognized( hit, gestureName ){
    console.log('Gesture recognized: %s with confidence: %d', gestureName, hit);
    PlumaApp.trigger( 'plumaleap:gesture-recognized', {name: gestureName, hit: hit} );
  };

  function _gestureUnknown( bestHit, closestGestureName ){
    PlumaApp.trigger( 'plumaleap:gesture-unknown', { name: closestGestureName, hit: bestHit } );
  };

  // Public API

  function publicStart(){
    _init();
  };

  return {
    start: publicStart
  };

}( _, Backbone, Leap, LeapTrainer );