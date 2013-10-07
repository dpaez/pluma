/**
 * Extends ParentView
 */

PlumaApp.StepOneView = PlumaApp.ParentView.extend({

  el: '#step-one',
  
  currentPos: 1,

  launch: function(){
    this.render();
    this.$('#step-two').hide();
    this.$('#step-three').hide();
    this.$el.show();
  }


});