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
  },

  loadMetaphor: function(){
    if ( (!PlumaApp.Metaphor) || (typeof PlumaApp.Metaphor === 'undefined') ){
      console.Error( 'No metaphor selected.' );
      return;
    }

    var metaphor = new PlumaApp.Metaphor( {el:$('#choosen_metaphor')} );
    metaphor.render();
    console.log( 'loading metaphor: ', metaphor );

  }




});