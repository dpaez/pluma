'use strict';
PlumaApp.LeapDuinoConfigView = Backbone.ModalView.extend({
  template: '#leapduino-setup-tpl',

  events: {
    'click #confirmLeapDuinoConfig' : 'updateLeapDuino',
    'submit form': 'updateLeapDuino'
  },

  initialize: function( options ){
    this.gesture = options.gesture || { gesture: '' };
    this.componentID = options.component || { componentType: '' };
    this.component = PlumaApp.Storage.fetch( this.componentID ) || undefined;
  },

  render: function(){
    var template = TemplateCache.get( this.template );
    var html = template( {component: this.component, gesture: this.gesture} );
    this.$el.html( html );
    return this;
  },

  updateLeapDuino: function( e ){
    e.preventDefault();
    e.stopPropagation();

    var data,
      gestureComponentData,
      stored;

    data = this.getFormValues();

    // create new gesture + component config object
    gestureComponentData = {};

    gestureComponentData.gestureComponentID = this.gesture + this.componentID;
    gestureComponentData.componentID = this.componentID;
    gestureComponentData.componentType = this.component.componentType;
    gestureComponentData.gesture = this.gesture;
    gestureComponentData.data = data;
    // update storage with it
    PlumaApp.Storage.put(
      gestureComponentData.gestureComponentID,
      {
        data: data,
        componentID: this.component.componentID,
        gestureID: this.gesture,
        type: PlumaApp.TYPES['CONFIG_LEAPDUINO']
      }
    );

    // trigger gesture + component events
    PlumaApp.socket.emit( 'plumaduino:update_component', gestureComponentData );
    PlumaApp.trigger( 'plumaduino:update_component', gestureComponentData );

    this.hideModal();
  },

  getFormValues: function(){
    var values = {};
    var $configItems = $( '.item-config' );

    values.instantFilter = $configItems.find( '#instant-filter' ).val() || undefined;
    values.powerFilter = $configItems.find( '#power-filter' ).val() || undefined;
    values.discreteFilter = $configItems.find( '#discrete-filter' ).val() || false;
    values.continousFilter = $configItems.find( '#continous-filter' ).val() || false;

    return values;
  }

});
