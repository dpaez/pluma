/**
 * Child View: Leap trainer
 * Deps: Underscore, Backbone, trainer, text
 */
'use strict';

PlumaApp.LeapView = PlumaApp.BaseView.extend({

  //id: 'gesture-sandbox',

  template: '#leap-trainer-tpl',

  events: {
    'click .start-trainer' : 'newGesture',
    'click .reset'         : 'resetGesture',
    'click .delete'        : 'deleteGesture'
  },

  initialize: function(){
    this.listenTo( PlumaApp, 'plumaleap:leap-ready', this.leapReady );
    this.listenTo( PlumaApp, 'plumaleap:leap-connected', this.leapConnected );
    this.listenTo( PlumaApp, 'plumaleap:leap-disconnected', this.leapNotReady );
    this.listenTo( PlumaApp, 'plumaleap:training-started', this.trainingStarted );
    this.listenTo( PlumaApp, 'plumaleap:training-gest-recognized', this.trainingGestureRecognized );
    this.listenTo( PlumaApp, 'plumaleap:training-complete', this.trainingComplete );
    this.listenTo( PlumaApp, 'plumaleap:training-countdown', this.trainingCountdown );
    this.listenTo( PlumaApp, 'plumaleap:gesture-recognized', this.gestureRecognized );
    this.listenTo( PlumaApp, 'plumaleap:gesture-unknown', this.gestureUnknown );
    this.listenTo( PlumaApp, 'plumaleap:render-gestures', this.addCreatedGestures );
    this.listenTo( PlumaApp, 'plumaleap:frame', this.drawFrame );
    PlumaApp.isTraining = false;
    this.currentGesture = '';
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    PlumaApp.trigger( 'plumaleap:render-gestures' );

    PlumaApp.Points.init();
    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  leapNotReady: function(){
    this.writeWarning( 'Leap no esta listo.' );
    this.$el.fadeOut( 'slow' );
  },

  leapReady: function(){
    this.$el.fadeIn( 'slow' );
  },

  leapConnected: function(){
    console.log( 'Leap Device is connected' );
  },

  drawFrame: function( frame ) {
    PlumaApp.Points.draw( frame );
  },

  newGesture: function(){
    console.log( 'calling new gesture' );
    this.cleanUI();
    var dataView = new PlumaApp.GestureCreationView();
    dataView.render().showModal( {showCloseButton:false} );
  },

  trainingStarted: function(){
    this.writeMsg( 'Grabando gesto...' );
    PlumaApp.isTraining = true;
  },

  trainingGestureRecognized: function(){
    this.writeMsg( 'Gesto detectado, realicelo una vez mas por favor.' );
  },

  trainingCountdown: function( count ){
    var msg = 'Grabando gesto en: ' + count;
    this.writeMsg( msg );
  },

  trainingComplete: function( gestureName, gestureJSON ){
    var that = this,
      pack;

    if ( gestureJSON ){
      pack = LZString.compressToUTF16( gestureJSON );
    }

    var data = {
      name: gestureName,
      json: pack
    };
    PlumaApp.isTraining = false;
    this.currentGesture = gestureName;
    this.writeMsg( 'Gesto aprendido!' );

    PlumaApp.Storage.put(
      gestureName,
      {
        data: data,
        type: PlumaApp.TYPES['GESTURE']
      }
    );

    setTimeout(function(){
        that.writeMsg('Pruebe el gesto...');
      }, 2000);
    PlumaApp.trigger( 'plumaleap:render-gestures' );
  },

  gestureRecognized: function( gestData ){
    var hit = Math.min(parseInt(100 * gestData.hit), 100);
    var msg = 'Gesto:' + gestData.name + ' detectado con confianza: ' + hit;
    this.writeInfo( msg );
  },

  gestureUnknown: function( gestData ){
    if ( PlumaApp.isTraining ) { return; }
    this.writeWarning( 'Gesto desconocido detectado.' );
  },

  writeMsg: function( msg ){
    this.$( '#trainer-feedback' ).text( msg );
  },

  writeInfo: function( msg ){
    this.$( '#leap-feedback' ).removeClass().text( msg ).fadeIn( 'fast' ).fadeOut( 3000 );
  },

  writeWarning: function( msg ){
    this.$( '#leap-feedback' ).addClass( 'warning' ).text( msg ).fadeIn( 'fast' ).fadeOut( 3000 );
  },

  cleanUI: function(){
    this.$( '#leap-feedback' ).text('');
  },

  addCreatedGestures: function(){
    var $userGestures = this.$( '.known-gestures-list' );
    var tpl = _.template('<div data-event="<%= gestName %>", class="user-gest"> <p> <%= gestName %> </p> <span class="reset"> Reset </span> <span class="delete"> Delete </span> </div>');
    $userGestures.empty();

    PlumaApp.Storage.each(function( key, result ){
      if ( ( result.type === PlumaApp.TYPES['GESTURE'] ) && ( result.data.json ) ) {

        var decompressed = LZString.decompressFromUTF16(result.data.json);

        if ( ( decompressed ) && ( typeof decompressed === 'string' ) ){
          PlumaApp.trainer.fromJSON( decompressed );
          $userGestures.append( tpl({ gestName: result.data.name }) );
        }
      }
    });
  },

  resetGesture: function( e ){
    e.preventDefault();

    var $gestEl,
      gestureName;

    $gestEl = $( e.currentTarget ).parent();  // to get the element with the data-event

    gestureName = $gestEl.data( 'event' );

    console.log( 'calling reset gesture: ', gestureName );

    PlumaApp.trigger( 'plumaleap:reset', gestureName );

    this.cleanUI();
  },

  deleteGesture: function( e ){
    e.preventDefault();

    var $gestEl,
      gestureName;

    $gestEl = $( e.currentTarget ).parent(); // to get the element with the data-event
    gestureName = $gestEl.data( 'event' );

    PlumaApp.trainer.off( gestureName );
    delete PlumaApp.trainer.gestures[ gestureName ];
    PlumaApp.Storage.forward( 'remove', [gestureName] );
    $gestEl.remove();

  }

});