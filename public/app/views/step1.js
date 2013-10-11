/**
 * Extends ParentView
 */

PlumaApp.StepOneView = PlumaApp.ParentView.extend({

  el: '#leap-container',
  
  launch: function(){
    console.log( 'calling step 1' );
    this.render();
    this.$el.parent().siblings().hide( 'fast' );
    this.$el.show();
  },

});