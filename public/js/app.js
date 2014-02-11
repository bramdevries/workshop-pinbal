/**
 * pinball - 
 * @version v0.0.1
 */
(function(){
var pinball = {};
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i + 1);
    return accum;
});
this.templates=this.templates||{},this.templates.back=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<a href="#" data-action="back" class="btn back">Back</a>'}),this.templates=this.templates||{},this.templates.controls=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="actions">\n  <a href="/" data-action="trigger" data-trigger="1" class="btn">Trigger 1</a>\n  <a href="/" data-action="trigger" data-trigger="2" class="btn">Trigger 2</a>\n  <a href="/" data-action="trigger" data-trigger="3" class="btn">Trigger 3</a>\n  <a href="/" data-action="trigger" data-trigger="4" class="btn">Trigger 4</a>\n</div>'}),this.templates=this.templates||{},this.templates.failedConnection=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="failed center">\n  <p class="help">Could not connect to the Arduino, try reconnecting it.</p>\n  <a href="#" data-action="retry" class="btn">Try Again.</a>\n</div>'}),this.templates=this.templates||{},this.templates.home=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="actions">\n  <a href="/" data-action="play" class="btn">Play</a>\n  <a href="/" data-action="controls" class="btn">LED Controls</a>\n  <a href="/" data-action="about" class="btn">About</a>\n</div>'}),this.templates=this.templates||{},this.templates.loading=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="spinner">\n  <div class="spinner-container container1">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container2">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container3">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n</div>'}),this.templates=this.templates||{},this.templates.players=Handlebars.template(function(e,t,a,s,i){function n(e){var t="";return t+='\n  <a href="#" class="btn" data-action="select" data-player="'+p(typeof e===o?e.apply(e):e)+'">Player '+p(typeof e===o?e.apply(e):e)+"</a>\n"}this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{};var r,l,c,d="",o="function",p=this.escapeExpression,h=this,m=a.helperMissing;return d+="<h1>Select Player</h1>\n\n",c={hash:{},inverse:h.noop,fn:h.program(1,n,i),data:i},r=a.times||t&&t.times,l=r?r.call(t,t&&t.players,c):m.call(t,"times",t&&t.players,c),(l||0===l)&&(d+=l),d}),this.templates=this.templates||{},this.templates.servoTest=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<h1>Servo Testing</h1>\n\n<form action="/" method="POST">\n  <fieldset>\n    <div class="input">\n      <label for="angle">Degrees</label>\n      <input type="range" name="angle" id="angle" min="0" max="180">\n    </div>\n    <div class="input">\n      <button id="submit" type="submit" class="btn">Adjust angle</button>\n    </div>\n  </fieldset>\n</form>'});
pinball.ControlsView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.controls,
  hasBack: true,
  events: {
    'click [data-action="trigger"]': 'triggerClickedHandler'
  },
  initialize: function() {
    this.previousView = pinball.HomeView;
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  triggerClickedHandler: function(e) {
    e.preventDefault();
    var trigger = $(e.currentTarget).data('trigger');

    this.app.socket.emit('arduino.controls', {trigger: trigger});
  }
});
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
/**
 * Player selection screen: Show the amount of connected Arduino's.
 */
pinball.HomeView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'home',
  template: templates.players,
  events: {
    'click [data-action="select"]': 'playerSelected',
  },
  initialize: function(options) {
    this.players = options.players;
  },
  playerSelected: function(e) {
    e.preventDefault();
    var player_id = $(e.currentTarget).data('player');
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
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
  hasBack: true,
  events: {
    'click #submit': 'submitForm'
  },
  initialize: function() {
    _.bindAll(this, 'submitForm');
    this.previousView = pinball.HomeView;
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
    'click [data-action="play"]': 'playClickedHandler',
    'click [data-action="controls"]': 'controlsClickedHandler',
    'click [data-action="back"]': 'backClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'connectedHandler', 'fetchedPlayers');

    this.socket = io.connect(window.location);
    this.socket.on('arduino.players', this.fetchedPlayers);
  },
  fetchedPlayers: function(data) {
    this.players = data.players;
    this.changeView(new pinball.HomeView({players: this.players}));
  },
  connect: function() {

    this.timeout = setTimeout(this.timeoutHandler, 10000);
    this.loader.start('Connecting with an Arduino');

    this.socket.on('arduino.connected', this.connectedHandler);
  },
  changeView: function(v) {
    v.app = this;
    this.currentview = v;
    this.$el.html(v.render().$el);
    this.showBack(v.hasBack);
  },
  showBack: function(show) {
    if (show) {
      this.$el.append(templates.back());
    }
    else {
      this.$el.find('.back').remove();
    }
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
  },
  controlsClickedHandler: function(e) {
    e.preventDefault();
    this.changeView(new pinball.ControlsView());
  },
  backClickedHandler: function(e) {
    e.preventDefault();
    this.changeView(new this.currentview.previousView());
  }
});
var app = new pinball.App();

$('body').prepend(app.render().$el);})();