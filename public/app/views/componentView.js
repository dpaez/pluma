'use strict';
PlumaApp.ComponentView = PlumaApp.BaseView.extend({

  template: '#duino-comp-tpl',
  className: 'duino-comp',

  events: {
    'click .component-button' : 'enableComponent'
  },

  initialize: function( options ){
    this.component = options.component;
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template( this.component );
    this.$el.html( html );
    return this;
  },

  onRemove: function(){
    this.$el.empty();
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
          pin: 'A0' // A0, when using it with a shield
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