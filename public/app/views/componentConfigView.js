'use strict';
PlumaApp.ComponentSetupView = Backbone.ModalView.extend({

  template: '#duino-comp-setup-tpl',

  events: {
    'click #confirm-setup' : 'updateComponent',
    'submit form': 'updateComponent',
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
    var $item;
    // create options hash
    _.each(allHashItems, function( hashItem ){
      $item = $( hashItem );
      try{
        var hashKey = $item.find( '.key' ).val() || '';
        var hashValue = $item.find( '.value' ).val() || '';
      }catch(e){
        console.log( e );
      }
      if ( (hashKey !== '') && (hashValue !== '') ){
        options[ hashKey.toLowerCase() ] = JSON.parse( hashValue );
      }
    });

    return {
      options: options,
      params: $( '#params' ).val() // this is simple by now...
    };
  },

  updateComponent: function( e ){
    e.preventDefault();
    e.stopPropagation();

    // data is a hash containing component config options and actions parameters
    var data = this.getFormValues();
    console.log( 'options data: ', data );

    var componentData = {};
    componentData.componentID = PlumaApp.KEYS['COMPONENT']( data.options );
    componentData.type = this.component.componentType;
    componentData.options = data.options;

    PlumaApp.Storage.save({
      key: componentData.componentID,
      data: data,
      componentType: this.component.componentType,
      type: PlumaApp.TYPES['COMPONENT']
    });

    PlumaApp.socket.emit( 'plumaduino:create_component', componentData );

    this.hideModal();
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