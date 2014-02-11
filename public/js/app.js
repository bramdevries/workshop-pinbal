/**
 * pinball - 
 * @version v0.0.1
 */
(function(){
var pinball = {};
this.templates=this.templates||{},this.templates.failedConnection=Handlebars.template(function(e,i,n,t,s){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),s=s||{},'<div class="failed center">\n  <p class="help">Could not connect to the Arduino, try reconnecting it.</p>\n  <a href="#" data-action="retry" class="btn">Try Again.</a>\n</div>'}),this.templates=this.templates||{},this.templates.home=Handlebars.template(function(e,i,n,t,s){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),s=s||{},'<div class="actions">\n  <a href="/" data-action="play" class="btn">Play</a>\n  <a href="/" data-action="about" class="btn">About</a>\n</div>'}),this.templates=this.templates||{},this.templates.loading=Handlebars.template(function(e,i,n,t,s){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),s=s||{},'<div class="spinner">\n  <div class="spinner-container container1">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container2">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container3">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n</div>'}),this.templates=this.templates||{},this.templates.servoTest=Handlebars.template(function(e,i,n,t,s){return this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),s=s||{},'<h1>Servo Testing</h1>\n\n<form action="/" method="POST">\n  <fieldset>\n    <div class="input">\n      <label for="angle">Degrees</label>\n      <input type="range" name="angle" id="angle" min="0" max="180">\n    </div>\n    <div class="input">\n      <button id="submit" type="submit" class="btn">Adjust angle</button>\n    </div>\n  </fieldset>\n</form>'});
pinball.FailedConnectionView = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  id: 'connectionFailed',
  template: templates.failedConnection,
  initialize: function() {

  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.home,
  initialize: function() {

  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
pinball.LoadingView = Backbone.View.extend({
  tagName: 'div',
  className: 'loading-container center fade',
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
  events: {
    'click [data-action="retry"]': 'retryClickedHandler',
    'click [data-action="play"]': 'playClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'connectedHandler', 'timeoutHandler', 'retryClickedHandler');

    this.socket = io.connect(window.location);
    this.loader = new pinball.LoadingView(this.$el);

    this.connect();
  },
  connect: function() {

    this.timeout = setTimeout(this.timeoutHandler, 10000);
    this.loader.start('Connecting with an Arduino');

    this.socket.on('arduino.connected', this.connectedHandler);
  },
  changeView: function(v) {
    this.$el.html(v.render().$el);
    v.app = this;
  },
  connectedHandler: function() {
    this.loader.stop();
    clearTimeout(this.timeout);
    // Show initial view.
    this.changeView(new pinball.HomeView());
  },
  timeoutHandler: function(e) {
    this.changeView(new pinball.FailedConnectionView());
  },
  retryClickedHandler: function(e) {
    e.preventDefault();

    this.connect();
  },
  playClickedHandler: function(e) {
    e.preventDefault();
    this.changeView(new pinball.ServoTestView());
  }
});
var app = new pinball.App();

$('body').prepend(app.render().$el);})();