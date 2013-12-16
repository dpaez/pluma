/**
 * Child View: Sandbox
 * Deps: LeapTrainer, Johnny-five, backbone
 */
'use strict';
PlumaApp.SandboxView = PlumaApp.BaseView.extend({

  template: '#sandbox-tpl',

  events: {
  },

  initialize: function(){
    this.listenTo( PlumaApp, 'plumaleap:gesture-component-fire', this.alertTrigger );
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  alertTrigger: function( data ){
    var msg = 'Gesto detectado: ' + data.gestureName + ' | ' + 'Componente activado: ' + data.component;
    this.$el.find( 'p' ).text( msg ).fadeIn( 'slow' ).fadeOut( 3000 );
  }


});