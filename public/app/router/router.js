/**
 * App Backbone Router
 */
'use strict';

var PlumaApp = PlumaApp || {};

PlumaApp.Router = Backbone.Router.extend({
  
  routes: {
    'step1': 'launchStepOne',
    'step2': 'launchStepTwo',
    'step3': 'launchStepThree'
  },

  launchStepOne: function(){
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