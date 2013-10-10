/**
 * Pluma Leap Trainer Module
 * Deps: leaptrainer.js (all the credit goes to: https://github.com/roboleary/LeapTrainer.js)
 */
PlumaApp.LeapTrainer = function( _, Backbone, LeapTrainer ) {


  var trainer,
    postman;

  function _init(){
    // Start leap trainer
    trainer = new LeapTrainer.Controller();
    postman = {};
    _.extend( postman, Backbone.Events );

    postman.on({
      'plumaleap:create': this._train,
    });

  };

  function _train(gestureName){
    trainer.create(gestureName);
  };

  // Public API

  function publicStart(){
    _init();
  };

  return {
    start: publicStart
  };

}( _, Backbone, LeapTrainer );