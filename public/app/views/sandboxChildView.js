/**
 * Child View: Sandbox
 * Deps: LeapTrainer, Johnny-five, backbone
 */
'use strict';
PlumaApp.SandboxView = PlumaApp.BaseView.extend({

  template: '#sandbox-tpl',

  events: {

  },

  metaphor: undefined,

  initialize: function(){
    this.listenTo( PlumaApp, 'plumaleap:gesture-component-fire', this.alertTrigger );
    this.listenTo( this, 'render', this.loadMetaphor );
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    this.trigger( 'render ');
    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  alertTrigger: function( data ){
    var msg = 'Gesto detectado: ' + data.gestureName + ' | ' + 'Componente activado: ' + data.component;
    this.$el.find( 'p' ).text( msg ).fadeIn( 'fast' ).fadeOut( 3000 );
    this.metaphor.defaultAction();
  },

  loadMetaphor: function(){
    if ( (!PlumaApp.Metaphor) || (typeof PlumaApp.Metaphor === 'undefined') ){
      console.error( 'No metaphor selected.' );
      return;
    }

    this.metaphor = new PlumaApp.Metaphor( {el:$('#choosen_metaphor')} );
    this.metaphor.render();

  }




});