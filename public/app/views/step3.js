/**
 * Extends ParentView
 */

PlumaApp.StepTwoView = PlumaApp.ParentView.extend({

  el: '#step-three',
  template: '#leapduino-tpl',

  launch: function(){
    console.log( 'launching step 3' );
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