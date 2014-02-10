pinball.App = Backbone.View.extend({
  tagName: "div",
  className: "container",
  id: "app",
  events: {
    'click [data-action="retry"]': 'retryClickedHandler'
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
    this.timeout = null;
    // Show initial view.
    this.changeView(new pinball.ServoTestView());
  },
  timeoutHandler: function(e) {
    this.changeView(new pinball.FailedConnectionView());
  },
  retryClickedHandler: function(e) {
    e.preventDefault();

    this.connect();
  }
});