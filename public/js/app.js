/**
 * pinball - 
 * @version v0.0.1
 */
(function(){
var pinball = {};
this.templates=this.templates||{},this.templates.loading=Handlebars.template(function(e,i,n,s,t){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),t=t||{},'<div class="spinner">\n  <div class="spinner-container container1">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container2">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container3">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n</div>'}),this.templates=this.templates||{},this.templates.servoTest=Handlebars.template(function(e,i,n,s,t){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),t=t||{},'<form action="/" class="container" method="POST">\n  <fieldset>\n    <legend>\n      <h2>Servo Test</h2>\n      <p>Set the degrees below.</p>\n    </legend>\n    <input type="range" name="angle" id="angle" min="0" max="180">\n    <button id="submit" type="submit">Adjust angle</button>\n  </fieldset>\n</form>'});
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
pinball.ServoTestView = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  id: 'servoTest',
  template: templates.servoTest,
  events: {
    'click #submit': 'submitForm'
  },
  initialize: function() {
    _.bindAll(this, 'submitForm');
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  submitForm: function(e) {
    e.preventDefault();
    var angle = this.$el.find('#angle').val();
    this.app.socket.emit('arduino.change', {angle: angle});
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
  changeView: function(v) {
    this.$el.html(v.render().$el);
    v.app = this;
  },
  connectedHandler: function() {
    this.loader.stop();

    // Show initial view.
    this.changeView(new pinball.ServoTestView());
  }
});
var app = new pinball.App();

$('body').prepend(app.render().$el);})();