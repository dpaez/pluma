/**
 * Child View: Leap trainer
 * Deps: Underscore, Backbone, trainer, text
 */
'use strict';

PlumaApp.LeapView = PlumaApp.BaseView.extend({

  id: 'gesture-sandbox',

  template: '#leap-trainer-tpl',

  events: {
    'click .start-trainer': 'newGesture',
    'click .stop-trainer': 'cancelNewGesture',
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

  newGesture: function(){
    console.log( 'calling new gesture' );
    //trigger (leaptrainer) create event
    PlumaApp.trigger( 'plumaleap:create', 'testGesture' );
  },

  cancelNewGesture: function(){
    console.log( 'calling stop gesture' );
  },



});