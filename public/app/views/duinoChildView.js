/**
 * Child View: Arduino
 * Deps: Underscore, Backbone, johnny-five, socket.io
 */
'use strict';
PlumaApp.socket = {};
PlumaApp.DuinoView = PlumaApp.BaseView.extend({

  //id: 'duino-sandbox',

  template: '#duino-tpl',


  initialize: function(){
    // Pluma socket events
    PlumaApp.socket.emit( 'plumaduino:board_status' );
    PlumaApp.socket.on( 'plumaduino:board_ready', _.bind(this.boardReady, this) );
    PlumaApp.socket.on( 'plumaduino:component_ready', _.bind(this.componentReady, this) );
    // DEPRECATED, moved to starter.js
    //PlumaApp.socket.on( 'plumaduino:components_attached', _.bind(this.attachComponents, this) );

    this.listenTo( this, 'render', this.attachComponents );
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );

    this.trigger( 'render' );

    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  boardReady: function(){
    console.log( 'Arduino UNO is ready' );
    // make arduino status an object constant property
    this.updateBoard( 'enabled' );
  },

  attachComponents: function(){
    var components = [];
    PlumaApp.Storage.get('components', function( result ){
      components = result.data;
    });
    var $duinoComponents = this.$( '.duino-components' );
    _.each(components, function( component ) {
      var view = new PlumaApp.ComponentView( { component: component } );
      $duinoComponents.append( view.render().$el );
    });
  },

  componentReady: function( data ){
    console.log( 'Arduino component: %s is ready', data.componentType );
    //this.updateComponent( data.componentType, 'enabled' );
  },

  updateBoard: function( status ){
    var $board = this.$( '.duino-board' );

    switch ( status ){
      case 'enabled':
        $board.removeClass( 'blur' );
        break;

      case 'disabled':
        $board.addClass( 'blur' );
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

});