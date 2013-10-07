/**
 * App Backbone Router
 */

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
  },

  launchStepThree: function(){
    // TODO
  }

});