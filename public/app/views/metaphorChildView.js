/**
 * Child View: Images, animations, etc to improve the sketching experience
 * Deps: Underscore, Backbone,
 */
'use strict';
PlumaApp.MetaphorView = PlumaApp.BaseView.extend({
  template: '#metaphor-tpl',

  metaphors: [],

  choosen: null,

  events: {
    'click .metaphor-item': 'selectMetaphor'
  },

  initialize: function(){
    this.listenTo( this, 'render', this.addMetaphors );
    //manually adding metaphors views...but later we should do this automatically with some discovering method.
    this.metaphors.push( PlumaApp.MetaphorSlideshowView );
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

  addMetaphors: function(){
    var $list = this.$el.find( '.metaphor-list' ),
      tpl;

    if ( !$list ){ return; }

    tpl = _.template('<div data-idx="<%= metaphorIndex %>" class="metaphor-data metaphor-item"> <h2> <%= metaphorName %> </h2> | <p> <%= metaphorDesc %> </p> | <img alt="<%= metaphorName %>" src="<%= metaphorThumbnail %> "> </div>');

    for ( var i=0; i < this.metaphors.length; i++ ){
      var mData = this.metaphors[ i ].prototype.getSummary();
      $list.append(
        tpl({
          metaphorIndex: i,
          metaphorName: mData.name,
          metaphorDesc: mData.description,
          metaphorThumbnail: mData.thumbnail
        })
      );
    }
  },

  selectMetaphor: function( e ){
    var $metaphor = $( e.currentTarget );
    e.preventDefault();

    if (! $metaphor ){ return; }

    PlumaApp.Metaphor = this.metaphors[ $metaphor.data('idx') ] || undefined;

    // blur all other options...
  }


});