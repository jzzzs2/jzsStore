(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"blog-user--succ\">\r\n  <img src=\"./img/mk.png\" alt=\"mk\">\r\n  <i class=\"glyphicon glyphicon-pencil\" data-router=\"content\"></i>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <a href=\"#\" class=\"blog-user--login\" data-type=\"login\" data-router=\"login\">登录</a> | <a href=\"#\" class=\"blog-user--reg\" data-type=\"regis\" data-router=\"regis\">注册</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isUser") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});
})();