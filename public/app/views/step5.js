/**
 * Extends ParentView
 */

PlumaApp.StepFiveView = PlumaApp.ParentView.extend({

  el: '#step-five',
  template: '#tester-container-tpl',

  launch: function(){
    console.log( 'launching step 5' );
    this.render();
    $('.step').hide( 0 );
    this.$el.show();
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    return this;
  }

});