/**
 * Child View: Leap trainer
 * Deps: Underscore, Backbone, Leapjs, text
 */
PlumaApp.LeapView = PlumaApp.BaseView.extend({
  el: '#leap-container',
  template: _.template($('#leap-tpl')),

  events: {
    'click .start-trainer': 'newGesture',
    'click .stop-trainer': 'cancelNewGesture',
  },

  onRender: function(){
    this.$el.html(this.template);
    return this;
  },

  newGesture: function(){
    console.log('calling new gesture');
  },

  cancelNewGesture: function(){
    console.log('calling stop gesture');
  }


});