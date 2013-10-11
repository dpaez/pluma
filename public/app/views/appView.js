/**
 * Extends ParentView
 */

PlumaApp.AppView = PlumaApp.ParentView.extend({

  el: '#app-container',

  events: {
    'click .next-step': 'nextStep',
    'click .prev-step': 'prevStep'
  },

  firstStep: function(){
    PlumaApp.steps[ 0 ].launch();
  },

  nextStep: function(){
    var nextStep = PlumaApp.currentPos + 1;

    if ( nextStep >= PlumaApp.steps.length ){ return; }

    PlumaApp.steps[ PlumaApp.currentPos ].remove();

    PlumaApp.steps[ nextStep ].launch();

    PlumaApp.currentPos = nextStep;
  },

  prevStep: function(){
    var prevStep = PlumaApp.currentPos - 1;

    if ( prevStep < 0 ){ return; }

    PlumaApp.steps[PlumaApp.currentPos].remove();

    PlumaApp.steps[ prevStep ].launch();

    PlumaApp.currentPos = prevStep;
  }


});