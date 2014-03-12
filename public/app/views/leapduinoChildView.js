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
    'dragleave .duino-comp': 'dragLeaveComp',
    'dragend': 'dragEndComp',
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

  // TODO: check this
  cleanGesturesBindings: function(){
    PlumaApp.Storage.each(function( key, result ){
      if ( (result) && (result.type !== PlumaApp.TYPES['GESTURE']) ){ return; }
      PlumaApp.trainer.off( result.data.name );
    });
  },

  addGestures: function(){
    var $userGestures = this.$( '.user-gestures' );

    var tpl = _.template('<div class="user-gest", data-event="<%= gestName %>", draggable="true"> <p> <%= gestName %> </p> </div>');

    PlumaApp.Storage.each(function( key, result ){
      if ( (result) && (result.type !== PlumaApp.TYPES['GESTURE']) ){ return; }
      $userGestures.append( tpl({ gestName: result.data.name }) );
    });
  },

  attachComponents: function(){
    var $duinoComponents = this.$( '.duino-components' );

    var tpl = _.template('<div class="duino-comp <%= componentType %>", data-id="<%= componentID %>", data-type="<%= componentType %>", dropzone="link string:text/plain"><span class="title"><%= componentName %> | <%= componentID %></span></div>');

    PlumaApp.Storage.each(function( key, result ){
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
    var $target = $( e.target );
    e.originalEvent.dataTransfer.effectAllowed = 'link';

    $target.addClass( 'ghost' );

    e.originalEvent.dataTransfer.setData( 'string:text/plain', $gesture.data('event') );
  },

  dragOverComp: function( e ){
    var $comp = $( e.currentTarget );
    if ( e.preventDefault ) e.preventDefault(); // allows us to drop
    $comp.addClass( 'over' );
    e.originalEvent.dataTransfer.dropEffect = 'link';
    return false;
  },

  dragLeaveComp: function( e ){
    var $comp = $( e.currentTarget );

    if ( e.preventDefault ) e.preventDefault(); // allows us to drop

    $comp.removeClass( 'over' );

    return false;
  },

  dragEndComp: function( e ){
    var $comp = $( e.target );
    $comp.removeClass( 'ghost' );
  },

  dropEndComp: function( e ){
    var $comp = $( e.currentTarget );
    var gestureName = e.originalEvent.dataTransfer.getData( 'string:text/plain' );
    var componentID = $comp.data( 'id' );
    var componentType = $comp.data( 'type' );
    var action = 'defaultAction';
    var params;
    var result;
    var $targetDrag;
    var newColor;

    $comp.removeClass( 'over' );

    result = PlumaApp.Storage.fetch( componentID );
    params = result.data.params;

    PlumaApp.trainer.on( gestureName, function(){
      console.log( 'gesture-component binding triggered: %s %s', gestureName, componentID );
      PlumaApp.socket.emit( 'plumaduino:component_do', {
        componentID: componentID,
        componentType: componentType,
        action: action,
        params: params
      } );
      PlumaApp.trigger( 'plumaleap:gesture-component-fire', {gestureName: gestureName, component: componentID} );
    });

    $targetDrag = this.$el.find("[data-event='" + gestureName + "']");
    newColor = this.getRandomColor();
    this.addBoxShadow( $comp, newColor );
    this.addBoxShadow( $targetDrag, newColor );

    $comp.addClass( 'linked' );
    $targetDrag.addClass( 'linked' );

    console.log( 'Binding gesture with component: done.' );
    return false;
  },

  addBoxShadow: function( element, color ){

    if ( 'object' !== typeof element ){
      return;
    }
    color = color || 'green';

    var dynShadow = '';
    var shadowBase = '0 0 1px'; // horizontal vertical blur
    var posShadow = Number(element.attr( 'pos-shadow' ) || 1);
    var oldShadow = ( element.attr('old-shadow') )? element.attr( 'old-shadow' ) : element.css( 'box-shadow' );

    posShadow += 2;

    element.attr( 'pos-shadow', posShadow );

    dynShadow = shadowBase + ' ' + (posShadow).toString() + 'px' + ' ' + color;

    if ( oldShadow === 'none' ){
       oldShadow = '';
    }

    if ( !oldShadow ){
      oldShadow = dynShadow;
    }else{
      oldShadow = oldShadow + ',' + dynShadow;
    }
    console.log( 'old-shadow: ', oldShadow );

    element.attr( 'old-shadow', oldShadow );

    element.css( 'box-shadow', oldShadow );

    return element;
  },

  getRandomColor: function(){
    var x = Math.round( 0xffffff * Math.random() ).toString(16);
    var z1 = '000000'.substring(0, (6-x.length) );
    var randomColor= '#' + z1 + x;
    return randomColor;
  }


});