/**
 * Child View: Arduino
 * Deps: Underscore, Backbone, johnny-five, socket.io
 */
'use strict';
PlumaApp.socket = {};
PlumaApp.DuinoView = PlumaApp.BaseView.extend({

  //id: 'duino-sandbox',

  template: '#duino-tpl',

  events: {
    'click .component-button' : 'enableComponent'
  },

  initialize: function(){
    // Pluma socket events
    PlumaApp.socket = io.connect('http://localhost:8080');
    PlumaApp.socket.emit( 'plumaduino:board_status' );
    PlumaApp.socket.on( 'plumaduino:board_ready', _.bind(this.boardReady, this) );
    PlumaApp.socket.on( 'plumaduino:component_ready', _.bind(this.componentReady, this) );
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
    // make arduino status an object constant property
    this.updateBoard( 'enabled' );
    PlumaApp.socket.emit( 'plumaduino:board_setup', {} );
  },

  componentReady: function( data ){
    console.log( 'Arduino component is ready' );
    // PlumaApp.socket.emit( 'plumaduino:execute_default' );
    this.updateComponent( data.componentType, 'enabled' );
  },

  updateBoard: function( status ){
    var $board = this.$( '.duino-status' );

    switch ( status ){
      case 'enabled':
        $board.css({'background-color': 'green'});
        break;

      case 'disabled':
        $board.css({'background-color': 'red'});
        break;

      default:
        break;
    }
  },

  updateComponent: function( id, status ){
    var datatype = "[data-type='" + id + "']";
    var $component = this.$( '.component-button' + datatype );

    switch ( status ){
      case 'enabled':
        $component.css({'background-color': 'black'});
        break;

      case 'disabled':
        $component.css({'background-color': 'red'});
        break;

      default:
        break;
    }
  },

  enableComponent: function( e ){
    e.preventDefault();
    var $component = $( e.currentTarget );
    var componentType = $component.data( 'type' );
    PlumaApp.socket.emit( 'plumaduino:create_component', componentType );
  }

});