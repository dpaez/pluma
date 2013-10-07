/**
 * Application entry point
 */
( function( _, Backbone, $, StepOneView ){

  var step1,
    step2,
    step3,
    steps;

  step1 = new StepOneView();

  // Not Implemented Yet
  //step2 = new PlumaApp.StepTwoView();
  // Not Implemented Yet
  //step3 = new PlumaApp.StepThreeView();

  steps = [];

  steps.push(step1);
  //steps.push(step2);
  //steps.push(step3);

}( _, Backbone, jQuery, PlumaApp.StepOneView ) );


