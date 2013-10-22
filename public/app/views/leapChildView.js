/**
 * Child View: Leap trainer
 * Deps: Underscore, Backbone, trainer, text
 */
'use strict';

PlumaApp.LeapView = PlumaApp.BaseView.extend({

  //id: 'gesture-sandbox',

  template: '#leap-trainer-tpl',

  events: {
    'click .start-trainer':   'newGesture',
    'click .stop-trainer':    'cancelNewGesture',
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

  leapNotReady: function(){
    this.$el.faceOut( 'slow' );
  },

  leapReady: function(){
    this.$el.fadeIn( 'slow' );
  },

  leapConnected: function(){
    console.log( 'Leap Device is connected' );
  },

  newGesture: function(){
    console.log( 'calling new gesture' );
    //trigger (leaptrainer) create event
    PlumaApp.trigger( 'plumaleap:create', 'testGesture' );
    this.cleanUI();
  },

  trainingStarted: function(){
    this.writeMsg( 'Grabando gesto...' );
  },

  trainingGestureRecognized: function(){
    this.writeMsg( 'Gesto detectado, realicelo una vez mas por favor.' );
  },

  trainingCountdown: function( count ){
    var msg = 'Grabando gesto en: ' + count;
    this.writeMsg( msg );
  },

  trainingComplete: function( gestureName ){
    var that = this;
    this.writeMsg( 'Gesto aprendido!' );

    // PlumaApp.GesturesDB.exists( 'gesture', function( result ){
    //   if ( !result ){
    //     PlumaApp.GesturesDB.save( {key: 'gesture', data: gestureName } );
    //   }
    // });

    PlumaApp.GesturesDB.save( {key: 'gesture', data: gestureName } );

    setTimeout(function(){
        that.writeMsg('Pruebe el gesto...');
      }, 2000
    );
  },

  gestureRecognized: function( gestData ){
    var hit = Math.min(parseInt(100 * gestData.hit), 100);
    var msg = 'Gesto:' + gestData.name + ' detectado con confianza: ' + hit;
    this.writeInfo( msg );
  },

  gestureUnknown: function( gestData ){
    this.writeWarning( 'Gesto desconocido detectado.' );
  },

  writeMsg: function( msg ){
    this.$( '#trainer-feedback' ).text( msg );
  },

  writeInfo: function( msg ){
    this.$( '#leap-feedback' ).removeClass().text( msg );
  },

  writeWarning: function( msg ){
    this.$( '#leap-feedback' ).addClass( 'warning' ).text( msg );
  },

  cancelNewGesture: function(){
    console.log( 'calling reset gesture' );
    PlumaApp.trigger( 'plumaleap:reset', 'testGesture' );
    this.cleanUI();
  },

  cleanUI: function(){
    this.$( '#leap-feedback' ).text('');
  }



});