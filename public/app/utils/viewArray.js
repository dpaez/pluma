var viewarray = ( function(Backbone) {
  var views = {};

  var ViewArray = function(){
    _.extend(views, Backbone.Events);
    return this;
  };

  ViewArray.prototype = {
    constructor : ViewArray,
    add: function( viewInstance ){
      views[ viewInstance.toString() ] = viewInstance;
      this.trigger( 'add:children' );
    },
    remove: function( viewInstance ){
      views[ viewInstance.toString() ] = undefined;
      this.trigger( 'remove:children' );
    }


  }

} )(Backbone);
