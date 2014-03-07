'use strict';
PlumaApp.ComponentView = PlumaApp.BaseView.extend({

  template: '#duino-comp-tpl',
  className: 'duino-comp',

  events: {
    'click .component-setup' : 'setupComponent',
    'click .component-activate' : 'enableComponent'
  },

  initialize: function( options ){
    this.component = options.component;
    this.$el.addClass( this.component.componentType );
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

  setupComponent: function( e ){
    e.preventDefault();
    e.stopPropagation();
    var modalView = new PlumaApp.ComponentSetupView({
      component: this.component,
      showCloseButton:false
    });
    modalView.render().showModal();

  },

  enableComponent: function( e ){
    e.preventDefault();
    var $component = $( e.currentTarget );
    var componentType = $component.data( 'type' );
    var options = {};

    // DEPRECATED
    // switch( componentType ){
    //   case 'lcd':
    //     options = {
    //       pins: [ 8, 9, 4, 5, 6, 7 ],
    //       rows: 2,
    //       cols: 16,
    //     };
    //     break;
    //   case 'servo':
    //     options = {
    //       pin: '9' // A0, when using it with a shield
    //     };
    //     break;
    //   default:
    //     break;
    // }


    // DEPRECATED
    // var dbkey = 'config_' + componentType;
    // var data = {};
    // data.type = componentType;
    // PlumaApp.GesturesDB.get(dbkey, function( result ){
    //   data.options = result.data.options;
    // });

    // PlumaApp.socket.emit( 'plumaduino:create_component', data );
  }


});