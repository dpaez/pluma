/**
 * Extends ParentView
 */

PlumaApp.StepOneView = PlumaApp.ParentView.extend({

  el: '#step-one',
  template: '#leap-container-tpl',

  launch: function(){
    console.log( 'launching step 1' );

    this.render();
    this.$el.parent().siblings().hide( 'fast' );
    this.$el.show();
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    return this;
  }

});