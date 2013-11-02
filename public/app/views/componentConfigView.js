'use strict';
PlumaApp.ComponentSetupView = Backbone.ModalView.extend({

  template: '#duino-comp-setup-tpl',

  events: {
    'click #confirm-setup' : 'updateComponent',
    'click #addKeyVal' : 'addKeyVal'
  },


  initialize: function( options ){
    this.component = options.component || { componentType: '' };
  },

  render: function(){
    var template = TemplateCache.get( this.template );
    var html = template( this.component );
    this.$el.html( html );
    return this;
  },

  getFormValues: function(){
    var options = {};
    var allHashItems = this.$( '.hashitem' );

    // create options hash
    _.each(allHashItems, function( hashItem ){
      var $item = $( hashItem );
      try{
        var hashKey = $item.find( '.key' ).val() || '';
        var hashValue = $item.find( '.value' ).val() || '';
      }catch(e){
        console.log( e );
      }
      if ( (hashKey !== '') && (hashValue !== '') ){
        options[ hashKey ] = JSON.parse( hashValue );
      }
    });

    return {
      options: options,
      params: $( '#params' ).val() // this is simple by now...
    };
  },

  updateComponent: function( e ){
    e.preventDefault();

    // data is a hash which contains component options config and actions parameters
    var data = this.getFormValues();

    // emit data as event that parent ( duinoChildView ) should catch
    console.log( data );
    var dbkey = 'config_' + this.component.componentType;
    PlumaApp.GesturesDB.save( {key: dbkey, data: data } );

  },

  addKeyVal: function( e ){
    var $options = this.$(' .options ');
    var html = '<div class="hashitem">' +
    '<input type="text" placeholder="key" class="key">' +
    '<input type="text" placeholder="value" class="value">' +
    '</div>'+
    '<button id="addKeyVal" type="button"> Add key/val</button>';

    $options.find( '#addKeyVal' ).remove();

    $options.append( html );
  },



});