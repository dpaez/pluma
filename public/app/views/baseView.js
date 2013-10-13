'use strict';

var PlumaApp = PlumaApp || {};

_.extend(PlumaApp, Backbone.Events);

PlumaApp.BaseView = Backbone.View.extend({

  constructor: function( options ){
    Backbone.View.call( this, options );
    this.viewUUID = this.guid();
  },

  s4: function(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },

  guid: function(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' +  this.s4() + '-' + this.s4() + this.s4() + this.s4();
  },

  render: function(){
    var data;

    if (this.serializeData){
      data = this.serializeData();
    }

    // Deprecated
    //var renderedHTML = _.template(this.template, data);

    var template = TemplateCache.get( this.template );
    var renderedHTML = template();

    this.$el.html( renderedHTML );

    if (this.onRender){
      this.onRender();
    }

    return this;

  }
});