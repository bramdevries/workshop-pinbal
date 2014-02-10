/**
 * pinball - 
 * @version v0.0.1
 */
(function(){
var pinball = {};
this.templates=this.templates||{},this.templates.loading=Handlebars.template(function(i,c,s,n,e){return this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,i.helpers),e=e||{},'<div class="spinner">\n  <div class="spinner-container container1">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container2">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container3">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n</div>'});
pinball.LoadingView = Backbone.View.extend({
  tagName: 'div',
  className: 'spinner-container',
  id: 'loader',
  template: templates.loading,
  initialize: function(el, message) {
    this.$parent = $(el);
    this.message = message || '';
  },
  render: function() {
    this.$el.html(this.template());
    this.$parent.html(this.$el);

    this.$el.append('<p class="help">' + this.message +'</p>');
  },
  start: function(message) {
    this.message = message;
    this.render();
    return this;
  },
  stop: function() {
    this.$el.remove();
    return this;
  }
});

pinball.App = Backbone.View.extend({
  tagName: "div",
  className: "container",
  id: "app",
  initialize: function() {
    _.bindAll(this, "connectedHandler");

    this.socket = io.connect(window.location);
    this.loader = new pinball.LoadingView(this.$el);
    this.loader.start('Connecting with Arduino');

    this.socket.on('arduino.connected', this.connectedHandler);
  },
  connectedHandler: function() {
    this.loader.stop();
  }
});
var app = new pinball.App();

$('body').prepend(app.render().$el);})();