TemplateCache = {
  get: function(selector, data){
    if (!this.templates){ this.templates = {}; }

    var template = this.templates[selector];
    if (!template){
      var tmpl = $(selector).html();
      data = data || null;
      if (data){
        template = _.template(tmpl, data);
      }else{
        template = _.template(tmpl);
      }

      this.templates[selector] = template;
    }

    return template;
  }
}