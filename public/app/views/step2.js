/**
 * Extends ParentView
 */

PlumaApp.StepTwoView = PlumaApp.ParentView.extend({

  el: '#step-two',
  template: '#duino-container-tpl',

  launch: function(){
    console.log( 'launching step 2' );
    this.$el.parent().siblings().hide('fast');
    this.$el.show();
    this.render();
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    return this;
  }


});