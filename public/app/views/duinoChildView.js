/**
 * Child View: Duino Gestures
 * Deps: Underscore, Backbone, johnny-five, socket.io
 */
'use strict';
PlumaApp.socket = {};
PlumaApp.DuinoView = PlumaApp.BaseView.extend({

  //id: 'duino-sandbox',

  template: '#duino-gestures-tpl',

  events: {

  },
  
  initialize: function(){
    PlumaApp.socket = io.connect('http://localhost:8080');
    PlumaApp.socket.emit( 'plumaduino:board_status' );
    PlumaApp.socket.on( 'plumaduino:board_ready', this.boardReady );
    PlumaApp.socket.on( 'plumaduino:component_ready', this.compReady );
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

  boardReady: function(){
    console.log( 'Arduino UNO is ready' );
    PlumaApp.socket.emit( 'plumaduino:board_setup', {} );
    PlumaApp.socket.emit( 'plumaduino:create_component', 'lcd' );
  },

  compReady: function(){
    console.log( 'Arduino component is ready' );
    PlumaApp.socket.emit( 'plumaduino:execute_default' );

  }

});