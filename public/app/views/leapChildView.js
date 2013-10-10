/**
 * Child View: Leap trainer
 * Deps: Underscore, Backbone, trainer, text
 */
'use strict';

PlumaApp.LeapView = PlumaApp.BaseView.extend({

  el: '#leap-container',

  template: '#leap-tpl',

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

  newGesture: function(){
    console.log( 'calling new gesture' );
    //trigger (leaptrainer) create event
  },

  cancelNewGesture: function(){
    console.log( 'calling stop gesture' );
  },


});