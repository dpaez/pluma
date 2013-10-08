TemplateCache = {
  get: function(selector){
    if (!this.templates){ this.templates = {}; }

    var template = this.templates[selector];
    if (!template){
      var tmpl = $(selector).html();
      template = _.template(tmpl);
      this.templates[selector] = template;
    }

    return template;
  }
}