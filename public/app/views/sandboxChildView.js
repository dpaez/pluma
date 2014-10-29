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
    this.listenTo( this, 'metaphor-rendered', this.checkInteractionProps );
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
    this.trigger('metaphor-rendered');
  },

  checkInteractionProps: function(){
    var config = PlumaApp.Storage.fetch('interactionconfig');
    if ( config.mediatedFilter ){
      // The output is now mediated by an extra input (button)
      var div = document.createElement('div');
      div.id = 'mediatedAction';
      div.style.position = 'absolute';
      div.style.bottom = '2%';
      div.style.left = '45%';
      $( '#choosen_metaphor' ).append( div );
      this.mediatedInteraction = new PlumaApp.MediatedView( {el:$('#mediatedAction')} );
      this.mediatedInteraction.render();
    }
  }

});