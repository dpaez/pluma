/**
 * Child View: Duino Gestures
 * Deps: Underscore, Backbone, johnny-five, socket.io
 */
'use strict';

PlumaApp.DuinoView = PlumaApp.BaseView.extend({

  //id: 'duino-sandbox',

  template: '#duino-gestures-tpl',

  events: {

  },

  initialize: function(){
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

});