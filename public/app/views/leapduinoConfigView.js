'use strict';
PlumaApp.LeapDuinoConfigView = Backbone.ModalView.extend({
  template: '#leapduino-setup-tpl',

  events: {

  },

  initialize: function( options ){
    this.gesture = options.gesture || { gesture: '' };
    this.component = options.component || { componentType: '' };
  },

  render: function(){
    var template = TemplateCache.get( this.template );
    var html = template( {component: this.component, gesture: this.gesture} );
    this.$el.html( html );
    return this;
  }

});
