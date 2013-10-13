PlumaApp.ParentView = PlumaApp.BaseView.extend({

  constructor: function( options ){
    PlumaApp.BaseView.call( this, options );

    this.childViews = [];

    this.listenTo( this, 'parent:renderDone', this.renderChildViews );
  },

  render: function(){

    if (this.onRender){
      this.onRender();
    } else {
      // When parent views does not have a template
      this.$el.empty();
    }

    this.trigger( 'parent:renderDone' );
  },

  appendChildViews: function(){
    _.each( this.childViews, function( view ){
      this.$el.append( view.$el );
    }, this );
  },

  renderChildViews: function(){
    _.each( this.childViews, function( View ){
      var view = new View();
      view.setElement( '#gesture-sandbox' );
      view.delegateEvents();
      this.$el.append( view.render().$el );
    }, this );
  },

  addChildView: function( view ){
    // TODO: Check this check
    // if ( !(view instanceof Backbone.View) ) {
    //   throw new Error( 'Child view must be a Backbone.View' );
    // }
    this.childViews.push( view );
    return view;
  },

  // Removes any childViews associated with this view
  // by `addChildView`, which will in-turn remove any
  // children of those views, and so on.
  removeChildViews: function( options ){
    var children = this.childViews;
    if ( ( !children ) || ( children.length ) ){ return this; }
    for ( var i = 0, l = children.length; i<l; i++ ) {
      children[i].remove();
    }
    this.childViews = [];
    return this;
  },

  remove: function(){
    //PlumaApp.BaseView.prototype.remove.call(this);
    if ( this.childViews ) this.removeChildViews();
  },

});