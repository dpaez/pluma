/**
 * Extends ParentView
 */

PlumaApp.AppView = PlumaApp.ParentView.extend({

  el: '#app-container',
  
  events: {
    'click .next-step': 'nextStep',
    'click .prev-step': 'prevStep'  
  },

  nextStep: function(){
    console.log('Calling next step');
    if ( PlumaApp.currentPos >= PlumaApp.steps.length ){ return; }

    //this.remove();
    PlumaApp.steps[PlumaApp.currentPos].remove();

    PlumaApp.steps[PlumaApp.currentPos++].launch();

  },

  prevStep: function(){
    console.log('Calling prev step');
    if ( PlumaApp.currentPos <= PlumaApp.steps.length ){ return; }

    //this.remove();
    PlumaApp.steps[PlumaApp.currentPos].remove();
    
    PlumaApp.steps[PlumaApp.currentPos--].launch();
  }


});