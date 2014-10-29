/**
 * Interaction Property View: Mediated
 * Deps: LeapTrainer, Johnny-five, backbone
 */
'use strict';
PlumaApp.MediatedView = PlumaApp.BaseView.extend({

  template: '#interaction-mediated-tpl',

  events: {
    'click button': 'mediatedAction'
  },

  initialize: function(){
    this.listenTo( this, 'pause', this.pauseInteraction );
    this.pauseInteraction();
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    this.trigger( 'render ');
    return this;
  },

  mediatedAction: function(){
    var self = this;
    PlumaApp.trainer.resume();
    setTimeout(function(){
      self.trigger( 'pause' );
    }, 2500);
  },

  pauseInteraction: function(){
    PlumaApp.trainer.pause();
  }


})