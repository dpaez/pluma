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
    PlumaApp.socket.on( 'plumaduino:create_component', _.bind(this.addComponent, this) );
    this.listenTo( PlumaApp, 'plumaduino:create_component', this.addComponent );
    this.listenTo( this, 'render', this.attachComponents );
    this.listenTo( this, 'render', this.addComponents );
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
    // this.updateBoard( 'enabled' );
  },

  addComponents: function(){
    // add saved components
    var $userComponents = this.$( '.known-components-list' );

    var tpl = _.template('<div class="duino-comp <%= componentType %>", data-id="<%= componentID %>", data-type="<%= componentType %>"><span class="title"><%= componentName %> | <%= componentID %></span><span class="delete"> Delete </span></div>');

    PlumaApp.Storage.each(function( key, result ){
      if ( (result) && (result.type !== PlumaApp.TYPES['COMPONENT']) ){ return; }
      $userComponents.append( tpl({ 
          componentID: PlumaApp.KEYS['COMPONENT']( result.data.options ),
          componentType: result.componentType,
          componentName: result.componentType.toUpperCase(), 
        })
      );
    });
  },

  addComponent: function( comp ){
    var $userComponents = this.$( '.known-components-list' );

    var tpl = _.template('<div class="duino-comp <%= componentType %>", data-id="<%= componentID %>", data-type="<%= componentType %>"><span><%= componentName %> | <%= componentID %></span><span class="delete"> Delete </span></div>');
    $userComponents.append( tpl({ 
        componentID: comp.componentID,
        componentType: comp.type,
        componentName: comp.type.toUpperCase(), 
      })
    );
  },

  attachComponents: function(){
    var components;
    components = PlumaApp.Storage.fetch( 'components' );

    var $duinoComponents = this.$( '.user-components-list' );
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
    //TODO: check this....its old
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