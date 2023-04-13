(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"form-group\">\r\n        <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":64},"end":{"line":11,"column":72}}}) : helper)))
    + "</label>\r\n        <div class=\"col-sm-6\">\r\n          <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"inputType") || (depth0 != null ? lookupProperty(depth0,"inputType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inputType","hash":{},"data":data,"loc":{"start":{"line":13,"column":23},"end":{"line":13,"column":36}}}) : helper)))
    + "\" class=\"form-control\"placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeHolder") || (depth0 != null ? lookupProperty(depth0,"placeHolder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeHolder","hash":{},"data":data,"loc":{"start":{"line":13,"column":71},"end":{"line":13,"column":86}}}) : helper)))
    + "\">\r\n        </div>\r\n      </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <button type=\"submit\" class=\"btn btn-default\" data-btn-type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":19,"column":69},"end":{"line":19,"column":77}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"resName") || (depth0 != null ? lookupProperty(depth0,"resName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resName","hash":{},"data":data,"loc":{"start":{"line":19,"column":79},"end":{"line":19,"column":90}}}) : helper)))
    + "</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog-modal-wrap\">\r\n  <div class=\"blog-modal-head\">\r\n    <h3>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h3>\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" data-btn-type=\"close\"><span\r\n        aria-hidden=\"true\" data-btn-type=\"close\">&times;</span></button>\r\n  </div>\r\n  <div class=\"blog-modal-content\">\r\n    <form class=\"form-horizontal\" action=\"#\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"formData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":16,"column":15}}})) != null ? stack1 : "")
    + "      <div class=\"form-group\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"btns") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":20,"column":17}}})) != null ? stack1 : "")
    + "      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();