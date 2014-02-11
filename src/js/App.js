pinball.App = Backbone.View.extend({
  tagName: "div",
  className: "container",
  id: "app",
  events: {
    'click [data-action="retry"]': 'retryClickedHandler',
    'click [data-action="play"]': 'playClickedHandler',
    'click [data-action="controls"]': 'LedClickedHandler'
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
  },
  LedClickedHandler: function(e) {
    e.preventDefault();
    this.socket.emit('arduino.controls');
  }
});