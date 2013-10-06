PlumaApp.BaseView = Backbone.View.extend({

  constructor: function(){
    Backbone.View.call(this, options);
    this.viewUUID = this.guid();
  },

  s4: function(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },

  guid: function(){
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  render: function(){
    var data;

    if (this.serializeData){
      data = this.serializeData();
    }

    var renderedHTML = _.template(this.template, data);

    this.$el.html(renderedHTML);

    if (this.onRender){
      this.onRender();
    }
  }

});