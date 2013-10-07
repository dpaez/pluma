PlumaApp.ParentView = PlumaApp.BaseView.extend({

  constructor: function( options ){
    PlumaApp.BaseView.call( this, options );

    this.childViews = [];

    this.listenTo(this, 'add:children', this.childrenAdded);
  },

  events: {
    'click .next-step': 'nextStep',
    'click .prev-step': 'prevStep'
  },

  nextStep: function(){
    if (this.currentPos >= steps.length){ return; }

    this.remove();

    steps[this.currentPos++].launch();

  },

  prevStep: function(){
    if (this.currentPos <= steps.length){ return; }
    
    this.remove();

    steps[this.currentPos--].launch();
  },

  addChildView: function( view ){
    if ( !(view instanceof View) ) {
      throw new Error("Child view must be a Backbone.View");
    }
    this.childViews.push( view );
    this.trigger('add:children', view);
    return view;
  },

  // Removes any childViews associated with this view
  // by `addSubview`, which will in-turn remove any
  // children of those views, and so on.
  removeChildViews: function(){
    var children = this.childViews;
    if ( !children ) return this;
    for ( var i = 0, l = children.length; i<l; i++ ) {
      children[i].remove();
    }
    this.childViews = [];
    return this;
  },

  // Extends the view's remove, by calling `removeSubviews`
  // if any childViews exist.
  remove: function(){
    PlumaApp.BaseView.prototype.remove.call(this);
    if ( this.childViews ) this.removeChildViews();
  },

  /**
   * [childrenAdded render and append a new childView]
   * @param  {[type]} childView [Backbone View]
   */
  childrenAdded: function( childView ){
    var view = this.renderView( childView );
    this.$el.append( view.$el );
  },

  renderView: function( View ){
    view.render();
    return view;
  },

  render: function(){

    var html = [];

    this.removeChildViews();

    _.each(this.childViews, function( childView ){
      var view = this.renderView( childView );
      html.push( view.$el );
    }, this );

    this.$el.html(html);

    return this;

  }

});