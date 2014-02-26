'use strict';
PlumaApp.GestureCreationView = Backbone.ModalView.extend({

  template: '#leap-creation-tpl',

  events: {
    'click #createGesture' :  'createGesture',
    'submit form' :           'createGesture'
  },

  render: function(){
    var template = TemplateCache.get( this.template );
    var html = template( this.component );
    this.$el.html( html );
    return this;
  },

  getFormValues: function(){
    return {
      name: $( '#gesture-name' ).val()
    };
  },

  createGesture: function( e ){
    e.preventDefault();
    var data = this.getFormValues() || undefined;
    // simple data validation
    if ( (typeof data === 'undefined') || (!data.name) ){
      $( '.error' ).text( 'Por favor ingrese un nombre para el gesto.' ).fadeIn('fast');
      setTimeout(function(){
        $( '.error' ).fadeOut('fast');
      }, 2000);
    }
    // trigger (leaptrainer) create event
    PlumaApp.trigger( 'plumaleap:create', data.name );
    console.log( 'new gesture name: ', data.name );
    this.hideModal();
  }

});