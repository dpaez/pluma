/**
 * App Backbone Router
 */
'use strict';

var PlumaApp = PlumaApp || {};

PlumaApp.Router = Backbone.Router.extend({
  
  routes: {
    '': 'launchStepOne',
    'step1': 'launchStepOne',
    'step2': 'launchStepTwo',
    'step3': 'launchStepThree'
  },

  launchStepOne: function(){
    console.log('STEP 1');
    step1.launch();
  },

  launchStepTwo: function(){
    // TODO
    console.log('STEP 2');
    
  },

  launchStepThree: function(){
    // TODO
    console.log('STEP 3');
  }

});