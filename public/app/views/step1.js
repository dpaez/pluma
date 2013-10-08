/**
 * Extends ParentView
 */

PlumaApp.StepOneView = PlumaApp.ParentView.extend({

  el: '#step-one',
  
  currentPos: 1,

  launch: function(){
    this.render();
    this.$el.siblings().hide('fast');
    this.$el.show();
  }


});