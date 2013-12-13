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
    this.listenTo( this, 'render', this.attachComponents );
    this.listenTo( this, 'render', this.cleanGesturesBindings );
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

  cleanGesturesBindings: function(){
    PlumaApp.Storage.each(function( result ){
      if ( (result) && (result.type !== PlumaApp.TYPES['GESTURE']) ){ return; }
      PlumaApp.trainer.off( result.data.name );
    });
  },

  addGestures: function(){
    var $userGestures = this.$( '.user-gestures' );
    var tpl = _.template('<div data-event="<%= gestName %>", class="user-gest", draggable=true> <p> <%= gestName %> </p> </div>');
    $userGestures.empty();
    $userGestures.append( "<p>Gestos Seleccionados </p>");
    PlumaApp.Storage.each(function( result ){
      if ( (result) && (result.type !== PlumaApp.TYPES['GESTURE']) ){ return; }
      $userGestures.append( tpl({ gestName: result.data.name }) );
    });
  },

  attachComponents: function(){
    var $duinoComponents = this.$( '.duino-components' );

    var tpl = _.template('<div class="duino-comp", data-id="<%= componentID %>", data-type="<%= componentType %>", dropzone="link string:text/plain"><span><%= componentName %></span></div>');

    PlumaApp.Storage.each(function( result, idx ){
      if ( (result) && (result.type !== PlumaApp.TYPES['COMPONENT']) ){ return; }

      $duinoComponents.append( tpl({
        componentID: PlumaApp.KEYS['COMPONENT']( result.data.options ),
        componentType: result.componentType,
        componentName: result.componentType.toUpperCase(),
      }) );
    });
  },

  dragStartGesture: function( e ){
    var $gesture = $( e.currentTarget );
    e.originalEvent.dataTransfer.effectAllowed = 'link';
    e.originalEvent.dataTransfer.setData( 'string:text/plain', $gesture.data('event') );
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
    var componentID = $comp.data( 'id' );
    var componentType = $comp.data( 'type' );
    var action = 'defaultAction';
    var params;

    PlumaApp.Storage.get(componentID, function( result ){
      params = result.data.params;
    });

    PlumaApp.trainer.on( gestureName, function(){
      console.log( 'gesture-component binding triggered' );
      PlumaApp.socket.emit( 'plumaduino:component_do', {
        componentID: componentID,
        componentType: componentType,
        action: action,
        params: params
      } );
    });
    $comp.addClass( 'linked' );

    var $targetDrag = this.$el.find("[data-event='" + gestureName + "']");

    $targetDrag.addClass( 'linked ');

    setTimeout(function(){
      $comp.removeClass( 'linked' );
      $targetDrag.removeClass( 'linked' );
    }, 2000);
    console.log( 'Binding gesture with component: done.' );
    return false;
  }

});