/**
 * Child View: Concrete metaphor view -> slideshow
 * Deps: Underscore, Backbone,
 */
'use strict';
PlumaApp.MetaphorSlideshowView = PlumaApp.BaseView.extend({
  template: '#metaphor-slideshow-tpl',

  images: [ '../../images/0.jpg', '../../images/1.jpg', '../../images/2.jpg', '../../images/3.jpg' ],

  //images: [],

  currentImage: null,

  idx: 0,

  name: 'Slideshow Metaphor',

  description: 'Creates a slideshow view with a simple right-left behavior',

  thumbnail: '../../images/slideshow_view.png',

  events: {
    'click .go-right' : 'goRight',
    'click .go-left'  : 'goLeft'
  },

  initialize: function(){
    this.listenTo( this, 'render', this.showImage );

    // for (var i = 0; i < this.imagesNames.length; i++){
    //   this.images[ i ] = document.createElement( 'image' );
    //   this.images[ i ].src = this.imagesNames[i];
    // };

    this.currentImage = this.images[ 0 ];
  },

  onRender: function(){
    var template = TemplateCache.get( this.template );
    var html = template();
    this.$el.html( html );
    this.trigger( 'render' );
    return this;
  },

  onRemove: function(){
    this.$el.empty();
  },

  showImage: function(){
    var $place = this.$el.find( '#my_placeholder' );
    $place.fadeOut( 'slow' );
    $place.find( 'img' ).attr( 'src', this.currentImage );
    $place.fadeIn( 'fast' );
  },

  goRight: function(){
    console.log( 'going right...' );
    this.idx = ( this.idx === this.images.length ) ? 0 : ++this.idx;
    this.currentImage = this.images[ this.idx ];

    this.showImage();
  },

  goLeft: function(){
    console.log( 'going left...' );
    this.idx = ( this.idx === 0 ) ? this.images.length - 1 : --this.idx;
    this.currentImage = this.images[ this.idx ];

    this.showImage();
  },

  getSummary: function(){
    return {
      'name':         this.name,
      'description':  this.description,
      'thumbnail':    this.thumbnail
    };
  },

  defaultAction: function(){
    this.goLeft();
  }


});