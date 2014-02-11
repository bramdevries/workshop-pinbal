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
    _.bindAll(this, 'connectedHandler', 'timeoutHandler');

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