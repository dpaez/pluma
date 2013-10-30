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
    PlumaApp.socket.on( 'plumaduino:components_attached', _.bind(this.attachComponents, this) );
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
  },

  attachComponents: function( components ){
    var $duinoComponents = this.$( '.duino-components' );
    _.each(components, function( component ) {
      var view = new PlumaApp.ComponentView( { component: component } );
      $duinoComponents.append( view.render().$el );
    });
  },

  componentReady: function( data ){
    console.log( 'Arduino component: %s is ready', data.componentType );
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
    var options = {};
    // TODO: these options objects should be created by the user...
    switch( componentType ){
      case 'lcd':
        options = {
          pins: [ 8, 9, 4, 5, 6, 7 ],
          rows: 2,
          cols: 16,
        };
        break;
      case 'servo':
        options = {
          pin: 14 // A0, when using it with a shield
        };
        break;
      default:
        break;
    }

    var data = {
      type: componentType,
      options : options
    };

    PlumaApp.socket.emit( 'plumaduino:create_component', data );
  }

});