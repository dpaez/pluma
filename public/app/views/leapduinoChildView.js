/**
 * Child View: Duino + Gestures
 * Deps: Underscore, Backbone, johnny-five, socket.io, leaptrainer
 */
'use strict';
PlumaApp.LeapDuinoView = PlumaApp.BaseView.extend({

  template: '#leapduino-tpl',

  events: {
    'dragstart .user-gest': 'dragStartGesture',
    'dragover .duino-comp': 'dragOverComp',
    'drop .duino-comp': 'dropEndComp'
  },

  initialize: function(){
    this.listenTo( this, 'render', this.addGestures );
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    this.trigger( 'render ');
    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  addGestures: function(){
    var $userGestures = this.$( '.user-gestures' );
    var tpl = _.template('<div id="<%= gestID %>", class="user-gest", draggable=true> <p> <%= gestName %> </p> </div>');
    $userGestures.empty();
    PlumaApp.GesturesDB.get('gesture', function( result ){
      $userGestures.append( tpl({ gestID: result.data, gestName: result.data }) );
    });
  },

  dragStartGesture: function( e ){
    var $comp = $( e.currentTarget );
    e.originalEvent.dataTransfer.effectAllowed = 'link';
    e.originalEvent.dataTransfer.setData( 'string:text/plain', $comp.attr('id') );
  },

  dragOverComp: function( e ){
    var $comp = $( e.currentTarget );
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    $comp.addClass( 'over' );
    e.originalEvent.dataTransfer.dropEffect = 'link';
    return false;
  },

  dropEndComp: function( e ){
    var $comp = $( e.currentTarget );
    $comp.removeClass( 'over' );
    var gestureName = e.originalEvent.dataTransfer.getData( 'string:text/plain' );
    var action = 'default-action';
    PlumaApp.trainer.on( gestureName, function(){
      console.log( 'gesture-component binding triggered' );
      PlumaApp.socket.emit( 'plumaduino:component_do', {
        type: $comp.attr( 'id' ),
        action: action,
        params: 'BOOM!'
      } );
    });
    console.log( 'Binding gesture with component: done.' );
    return false;
  }

});