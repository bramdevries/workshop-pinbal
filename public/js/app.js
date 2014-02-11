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
this.templates=this.templates||{},this.templates.back=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<a href="#" data-action="back" class="btn back">Back</a>'}),this.templates=this.templates||{},this.templates.controls=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="actions">\n  <a href="/" data-action="trigger" data-trigger="1" class="btn">Trigger 1</a>\n  <a href="/" data-action="trigger" data-trigger="2" class="btn">Trigger 2</a>\n</div>'}),this.templates=this.templates||{},this.templates.devices=Handlebars.template(function(e,t,a,s,i){function n(e,t){var s,i="";return i+='\n  <a href="#" class="btn" data-action="select" data-device_id="',(s=a.id)?s=s.call(e,{hash:{},data:t}):(s=e&&e.id,s=typeof s===c?s.call(e,{hash:{},data:t}):s),i+=h(s)+'">',(s=a.name)?s=s.call(e,{hash:{},data:t}):(s=e&&e.name,s=typeof s===c?s.call(e,{hash:{},data:t}):s),i+=h(s)+"</a>\n"}this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{};var l,r="",c="function",h=this.escapeExpression,d=this;return r+="<h1>Select Device</h1>\n\n",l=a.each.call(t,t&&t.devices,{hash:{},inverse:d.noop,fn:d.program(1,n,i),data:i}),(l||0===l)&&(r+=l),r}),this.templates=this.templates||{},this.templates.failedConnection=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="failed center">\n  <p class="help">Could not connect to the Arduino, try reconnecting it.</p>\n  <a href="#" data-action="retry" class="btn">Try Again.</a>\n</div>'}),this.templates=this.templates||{},this.templates.home=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="actions">\n  <a href="/" data-action="play" class="btn">Play</a>\n  <a href="/" data-action="controls" class="btn">LED Controls</a>\n  <a href="/" data-action="about" class="btn">About</a>\n</div>'}),this.templates=this.templates||{},this.templates.launch=Handlebars.template(function(e,t,a,s,i){this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{};var n="";return n+="<h1>Lanceren</h1>\n\n"}),this.templates=this.templates||{},this.templates.launcher=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="launcher">\n\n</div>'}),this.templates=this.templates||{},this.templates.loading=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<div class="spinner">\n  <div class="spinner-container container1">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container2">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n  <div class="spinner-container container3">\n    <div class="circle1"></div>\n    <div class="circle2"></div>\n    <div class="circle3"></div>\n    <div class="circle4"></div>\n  </div>\n</div>'}),this.templates=this.templates||{},this.templates.score=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},"<h1>Score</h1>"}),this.templates=this.templates||{},this.templates.servoTest=Handlebars.template(function(e,t,a,s,i){return this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.helpers),i=i||{},'<h1>Servo Testing</h1>\n\n<form action="/" method="POST">\n  <fieldset>\n    <div class="input">\n      <label for="angle">Degrees</label>\n      <input type="range" name="angle" id="angle" min="0" max="180">\n    </div>\n    <div class="input">\n      <button id="submit" type="submit" class="btn">Adjust angle</button>\n    </div>\n  </fieldset>\n</form>'});
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

    this.app.socket.emit('arduino.trigger', {trigger: trigger, access_token: this.app.access_token});
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
  template: templates.devices,
  events: {
    'click [data-action="select"]': 'deviceSelected',
  },
  initialize: function(options) {
    this.devices = options.devices;
  },
  deviceSelected: function(e) {
    e.preventDefault();
    this.app.device_id = $(e.currentTarget).data('device_id');
    this.app.socket.emit('arduino.selected', {device_id: this.app.device_id});

    // Go to launch setup.
    this.app.changeView(new pinball.LaunchView());
  },
  render: function() {
    this.$el.html(this.template({devices: this.devices}));
    return this;
  }
});
/**
 * Interface to set the force of the launch.
 * - Shows a graphic that will be filled for a specific percentage, when clicked it freezes and the current percentage will be used
 *   to determine the force of the launch.
 * - When that's done, we show the controls for the triggers.
 */
pinball.LaunchView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'launch',
  template: templates.launch,
  initialize: function(options) {
    _.bindAll(this, 'launcherSelectedHandler');
    this.launcher = new pinball.Launcher();
    this.launcher.emitter.on('launcher.selected', this.launcherSelectedHandler);
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
    this.$el.append(this.launcher.render().$el);
    return this;
  },
  launcherSelectedHandler: function(perc) {
    this.app.socket.emit('arduino.launcher_set', {percentage: perc});
  }
});
pinball.Launcher = (function(){
  function Launcher() {
    _.bindAll(this, 'update', 'animate', 'launcherClickedHandler');
    this.stopped = false;
    this.reverse = false;
    this.increment = 3;
    this.emitter = _.extend({}, Backbone.Events);
  }

  Launcher.prototype.render = function() {
    this.$el = $(templates.launcher());
    this.parentWidth = this.$el.parent();
    this.$el.on('click', this.launcherClickedHandler);
    this.update();
    return this;
  };

  Launcher.prototype.launcherClickedHandler = function(e) {
    e.preventDefault();
    this.stopped = true;

    this.emitter.trigger('launcher.selected', this.calculatePercentage());
  };

  Launcher.prototype.calculatePercentage = function() {
    var parent_width = this.$el.parent().width();
    var perc = (this.$el.width() / parent_width ) * 100;
    perc = (isNaN(perc)) ? 0 : perc;

    return perc;
  };

  /**
   * Increase the width of the launcher until it reaches 100%, then decrease it until it's 0% and vice versa.
   * @return {[type]} [description]
   */
  Launcher.prototype.animate = function() {
    var perc = this.calculatePercentage();

    if (perc === 100 || perc === 0) {
      this.reverse = !this.reverse;
    }

    var calc = (this.reverse) ? '-' : '+';

    this.$el.css({'width': calc + '=' + this.increment + '%'});
  };

  Launcher.prototype.update = function() {
    if (!this.stopped) {
      this.animate();
      requestAnimationFrame(this.update);
    }
  };

  return Launcher;
})();
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
pinball.ScoreView = Backbone.View.extend({
  tagName: 'div',
  className: 'container fade',
  id: 'score',
  template: templates.score,
  initialize: function(options) {
  },
  render: function() {
    this.$el.html(this.template({players: this.players}));
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
    'click [data-action="link"]': 'linkClickedHandler'
  },
  initialize: function() {
    _.bindAll(this, 'playtime', 'spectator');

    this.socket = io.connect(window.location);
    this.socket.on('arduino.playtime', this.playtime);
    this.socket.on('arduino.spectator', this.spectator);
  },
  spectator: function(e) {
    // Show the score screen.
    this.setView(new pinball.ScoreView());
  },
  playtime: function(data){
    // Show the launch screen.
    this.access_token = data.access_token;
    this.setView(new pinball.LaunchView());
  },
  setView: function(v) {
    v.app = this;
    this.$el.html(v.render().$el);
  },
  linkClickedHandler: function(e) {
    e.preventDefault();
    var view = $(e.currentTarget).data('view');
    switch(view) {
      case 'controls': this.setView(new pinball.ControlsView()); break;
    }
  }
});
var app = new pinball.App();

$('body').prepend(app.render().$el);})();