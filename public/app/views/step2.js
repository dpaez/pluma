/**
 * Extends ParentView
 */

PlumaApp.StepTwoView = PlumaApp.ParentView.extend({

  el: '#duino-container',
  
  launch: function(){
    this.$el.parent().siblings().hide('fast');
    this.$el.show();
    this.render();
  }


});