/**
 * Child View: Duino + Gestures
 * Deps: Underscore, Backbone, johnny-five, socket.io, leaptrainer
 */
'use strict';
PlumaApp.LeapDuinoView = PlumaApp.BaseView.extend({

  template: '#leapduino-tpl',

  events: {
    'dragstart .user-gest': 'dragStartGesture',
    'drop .duino-comp': 'dropEndComp'
  },

  initialize: function(){
    this.listenTo( this, 'render', this.addGestures );
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

  addGestures: function(){
    var $userGestures = this.$( '.user-gestures' );
    var tpl = _.template('<div id=<%= gestID %>, class="user-gest", draggable=true> <p> <%= gestName %> </p> </div>');
    $userGestures.empty();
    PlumaApp.GesturesDB.get('gesture', function( record ){
      $userGestures.append( tpl({ gestID: record, gestName: record }) );
    });

  },

  dragStartGesture: function( e ){
    var $el = $( e.currentTarget );
    e.dataTransfer.setData( 'string:text/plain', $el.attr('id') );
    e.dataTransfer.effectAllowed = 'link';
  },

  dropEndComp: function( e ){
    var $el = $( e.currentTarget );
    var gestureName = e.dataTransfer.getData( 'string:text/plain' );
    var action = 'default-action';
    PlumaApp.trainer.on( gestureName, function(){
      PlumaApp.socket.emit( 'plumaduino:component-do', {
        type: $el.attr('id'),
        action: action
      });
    });
  }

});